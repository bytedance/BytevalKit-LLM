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
import sys
import json
from utils.file_util import write_json_file
from .infer import infer
from .judge import judge, cot_judge
from .calculate import indicator_calculate, cot_result_calculate
from .post_process import process_cot_content


class Task:
    def __init__(self, work_path, unique_id, name, need_judge, need_cot_judge, need_calculate, model, data_set, gpu_num,
                 gpus, batch_size, judge_workers):
        self.work_path = work_path
        self.unique_id = unique_id
        self.name = name
        self.model_config = model
        self.data_set_config = data_set
        self.need_judge = need_judge
        self.need_cot_judge = need_cot_judge
        self.need_calculate = need_calculate
        self.need_gpu_num = gpu_num
        self.gpus = gpus
        self.batch_size = batch_size
        self.judge_workers = judge_workers

    def to_dict(self):
        return self.__dict__

    @classmethod
    def from_dict(cls, data_dict):
        return cls(
            need_cot_judge=data_dict.get('need_cot_judge', False),
            work_path=data_dict.get('work_path', '.'),
            unique_id=data_dict.get('unique_id', 'default_uid'),
            name=data_dict.get('name', 'default_task_name'),
            need_judge=data_dict.get('need_judge', False),
            need_calculate=data_dict.get('need_calculate', False),
            model=data_dict.get('model_config', {}),
            data_set=data_dict.get('data_set_config', {}),
            gpu_num=data_dict.get('need_gpu_num', 0),
            gpus=data_dict.get('gpus', []),
            batch_size=data_dict.get('batch_size', 1),
            judge_workers=data_dict.get('judge_workers', 1)
        )

    def task_process(self):
        task_results = infer(self)

        output_data_list = []
        is_think_model = self.model_config.get('is_think_model', False)
        if is_think_model:
            cot_re_string = self.model_config.get('cot_process_string', None)
            for res in task_results:
                res.think_content, res.answer_content = process_cot_content(res.prediction, cot_re_string)

        if self.need_judge:
            judge_results = judge(task_results, self.data_set_config, self.judge_workers)
            for i, res in enumerate(task_results):
                res.judge_result = judge_results[i]

        if self.need_cot_judge and is_think_model:
            cot_judge_results = cot_judge(task_results, self.data_set_config)
            for i, res in enumerate(task_results):
                res.think_judge_result = cot_judge_results[i]
            cot_total_result = cot_result_calculate(task_results)
            output_data_list.append(cot_total_result)

        for res in task_results:
            output_data_list.append(res.to_dict())

        if self.need_calculate:
            score = indicator_calculate(task_results, self.data_set_config)
            output_data_list.append(score)

        write_json_file(output_data_list, self.work_path + "/" + self.name + ".jsonl")


if __name__ == "__main__":
    task_json_payload = sys.argv[1]
    task_data_dict = json.loads(task_json_payload)
    task_instance = Task.from_dict(task_data_dict)
    task_instance.task_process()
