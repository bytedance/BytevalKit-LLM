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

import csv
import json
import os
import yaml


def read_file(file_path):
    if os.path.isdir(file_path):
        aggregated_results = []

        for item_name in sorted(os.listdir(file_path)):
            item_path = os.path.join(file_path, item_name)
            content = read_file(item_path)
            aggregated_results.extend(content)
        return aggregated_results
    else:
        single_file_result = []
        ext = os.path.splitext(file_path)[1].lower()

        try:
            if ext == '.csv':
                with open(file_path, mode='r', encoding='utf-8') as file:
                    reader = csv.DictReader(file)
                    for i, row in enumerate(reader, start=1):
                        single_file_result.append(row)

            elif ext == '.json':
                with open(file_path, mode='r', encoding='utf-8') as file:
                    data = json.load(file)
                    if isinstance(data, list):
                        return data
                    else:
                        print(f"警告：{file_path}为非列表JSON文件 ，将返回整个内容。")
                        single_file_result.append(data)

            else:
                with open(file_path, 'r', encoding='utf-8') as file:
                    for i, line in enumerate(file, start=1):
                        single_file_result.append(line.strip())

        except FileNotFoundError:
            print(f"错误：文件 {file_path} 未找到。")
        except Exception as e:
            print(f"错误：读取文件 {file_path} 时发生未知错误 {e}。")

    return single_file_result


def load_config(yaml_path):
    config = "".join([line for line in open(yaml_path)])
    loader = yaml.SafeLoader
    return yaml.load(config, Loader=loader)


def write_json_file(data, file_path):
    try:
        directory = os.path.dirname(file_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"成功写入文件: {file_path}")
    except Exception as e:
        print(f"写入文件时出错: {e}")
