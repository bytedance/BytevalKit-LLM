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

def indicator_calculate(results, data_set_config):
    judge_type = data_set_config.get("judge_type")
    filter_key_list = data_set_config.get("filter_key_list", [])
    if judge_type == "rule_comparison":
        return acc_calculate(results)
    else:
        return multi_dimensional_calculate(results, filter_key_list)


def acc_calculate(results):
    count = 0
    for result in results:
        if result.judge_result:
            count += 1

    return {
        "score": count / len(results) * 100
    }


def multi_dimensional_calculate(results, filter_key_list):
    value_list = []
    for result in results:
        count = 0
        key_num = 0
        for key in result.judge_result.keys():
            if key not in filter_key_list:
                count += result.judge_result[key]
                key_num += 1
        if key_num == 0:
            value_list.append(0)
            continue
        value = count / key_num
        value_list.append(value)

    return {
        "score": sum(value_list) / len(value_list) * 10
    }


def cot_result_calculate(results):
    sum_dict = {}
    count_dict = {}

    for result in results:
        judge_dict = getattr(result, 'think_judge_result', {})
        if not isinstance(judge_dict, dict):
            continue

        for key, value in judge_dict.items():

            if not isinstance(value, (int, float)):
                continue
            sum_dict[key] = sum_dict.get(key, 0) + value
            count_dict[key] = count_dict.get(key, 0) + 1
    avg_dict = {}
    for key in sum_dict:
        if count_dict[key] > 0:
            avg_dict[key] = sum_dict[key] / count_dict[key]

    return avg_dict
