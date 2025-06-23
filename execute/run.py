# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import json
import sys
import subprocess
import threading
import time
import queue

from execute.gpu import get_gpus
from utils.md5 import calculate_md5_string
from execute.task import Task


def assign_tasks(config):
    work_path = os.path.join(config["DEFAULT"].get("work_dir"), config["DEFAULT"].get("task_name"))
    if not os.path.exists(work_path):
        os.makedirs(work_path)

    models, data_sets = config["MODEL"], config["DATASET"]
    need_judge = config["DEFAULT"].get("need_judge", False)
    need_calculate = config["DEFAULT"].get("need_calculate", False)
    need_cot_judge = config["DEFAULT"].get("need_cot_judge", False)
    batch_size = config["DEFAULT"].get("batch_size", 1)
    judge_workers = config["DEFAULT"].get("judge_workers", 1)

    gpus = get_gpus()
    tasks = []

    for model in models.values():
        need_gpu_num = model.get("need_gpu_num", 1)
        if need_gpu_num > len(gpus):
            print(f"{model.get('name')} 模型过大无法部署！")
            continue

        for data_set in data_sets.values():
            unique_id = calculate_md5_string(str(model) + str(data_set))
            name = model.get("name") + "_" + data_set.get("name")
            _task = Task(work_path, unique_id, name, need_judge, need_cot_judge, need_calculate, model, data_set,
                         need_gpu_num, [], batch_size, judge_workers)
            tasks.append(_task)

    return assign_gpus(tasks, gpus)


def assign_gpus(tasks, gpus):
    all_need_gpu_num = 0
    for task in tasks:
        all_need_gpu_num += task.need_gpu_num

    while all_need_gpu_num > len(gpus):
        gpus += gpus

    start = 0
    for task in tasks:
        end = start + task.need_gpu_num
        task.gpus = gpus[start: end]
        start = end

    return tasks


def task_execution_worker(task_obj, active_gpus_list, gpu_lock):
    with gpu_lock:
        active_gpus_list.extend(task_obj.gpus)

    task_json_string = json.dumps(task_obj.to_dict())

    env = os.environ.copy()
    env["CUDA_VISIBLE_DEVICES"] = ",".join(map(str, task_obj.gpus))

    command = [sys.executable, "-m", "execute.task", task_json_string]
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        working_dir = os.path.dirname(script_dir)

        subprocess.run(command, text=True, check=True, encoding='utf-8',
                       cwd=working_dir, env=env)

    except subprocess.CalledProcessError as e:
        print(
            f"线程 {threading.get_ident()}: 命令 '{' '.join(e.cmd)}' 执行失败。返回码: {e.returncode}"
        )
    except FileNotFoundError:
        print(f"线程 {threading.get_ident()}: 执行失败，Python解释器或目标脚本未找到: {' '.join(command)}")
    except Exception as e:
        print(f"线程 {threading.get_ident()}: 执行失败: {e}")
    finally:
        with gpu_lock:
            for gpu_id_to_remove in task_obj.gpus:
                if gpu_id_to_remove in active_gpus_list:
                    active_gpus_list.remove(gpu_id_to_remove)


def execute(tasks):
    tasks_queue = queue.Queue()
    active_threads = []
    active_gpus_list = []
    gpu_lock = threading.Lock()

    for item in tasks:
        tasks_queue.put(item)

    while not tasks_queue.empty():
        num_to_check_this_pass = tasks_queue.qsize()
        for _ in range(num_to_check_this_pass):
            task_item = tasks_queue.get()

            gpus_are_available = True
            with gpu_lock:
                for gpu_id in task_item.gpus:
                    if gpu_id in active_gpus_list:
                        gpus_are_available = False
                        break

            if gpus_are_available:
                thread = threading.Thread(target=task_execution_worker, args=(task_item, active_gpus_list, gpu_lock))
                active_threads.append(thread)
                thread.start()
                print(f"任务【 {task_item.name} 】: 开始运行")
            else:
                time.sleep(20)
                print(
                    f"任务【 {task_item.name} 使用 GPU {task_item.gpus} 】: 等待GPU空闲。当前活跃 GPU: {active_gpus_list}")
                tasks_queue.put(task_item)
    for thread_instance in active_threads:
        thread_instance.join()
