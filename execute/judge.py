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

import json
import re
from tqdm import tqdm
from openai import OpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed


def get_json_result(judge_result):
    pattern = r"\{.*\}"
    json_result = {}
    match = re.search(pattern, judge_result, re.DOTALL)
    if match:
        json_str = match.group()
        try:
            json_result = json.loads(json_str)
            return json_result
        except json.JSONDecodeError:
            pass
    return json_result


def cot_judge(results, data_set_config):
    cot_judge_prompt = """
    # 角色
    你是一名大模型CoT（Chain of Thought，思维链）内容分析专家，擅长对其他大模型输出的CoT推理内容进行多个维度的分析并打分。
    我会给你分析维度及其对应的打分标准、问题内容、模型cot内容、模型答案
    你需要对大模型输出的CoT推理内容进行多个维度的分析并打分。

    # 分析维度及其对应的打分标准
    ## 推理一致性（cot内容和模型给出答案的一致性）
    - 5分：CoT 内容完全支持最终的答案，答案是 CoT 内容推理过程的合理总结
    - 4分：CoT与答案高度一致，核心推理链条完整映射至答案，仅存在非关键细节的简化
    - 3分：CoT与答案基本一致，但部分细节未对应（如遗漏次要论据），或答案对CoT的引用存在轻微偏差
    - 2分：CoT部分内容支持答案，但关键推理步骤与答案脱节，存在1处明显矛盾或逻辑跳跃
    - 1分：COT 内容与最终答案完全无关或存在直接矛盾

    ## 推理逻辑性
    - 5分：推理逻辑严密，符合形式逻辑规则，步骤间无缝衔接，无任何冗余或缺失， 全面排除其他可能因素，论证过程无懈可击
    - 4分：推理步骤清晰，逻辑链条完整，假设合理且论据与结论关联性强
    - 3分：存在1-2处逻辑跳跃，或步骤间衔接不够紧密，需依赖常识补充部分推导
    - 2分：推理步骤存在明显断裂，需用户自行补充2个以上关键环节，或未排除其他可能因素
    - 1分：推理步骤混乱，无明确逻辑顺序，存在严重逻辑断层，循环论证或因果关系颠倒

    ## 推理正确性
    - 5分：事实性信息完全准确，均来自权威来源，无任何幻觉或虚构内容，严格遵循逻辑规则
    - 4分：事实准确无误，引用数据来源可靠，假设符合领域共识，无明显逻辑谬误
    - 3分：事实性信息基本正确，但存在非关键细节误差（如数据精度问题），假设合理性存疑
    - 2分：存在1处关键事实错误（如引用过时数据、曲解专业术语），或推理基于未经证实的假设
    - 1分：存在明确事实错误、虚构信息或严重逻辑谬误（如编造数据、因果关系颠倒）

    # 问题
    {}

    # 大模型输出的CoT推理内容
    {}

    # 大模型给出的答案
    {}

    # 输出格式
    给出各个维度的打分，必须以json格式输出，例如{{"推理一致性": 5, "推理逻辑性": 2, "推理正确性":4}}，不需要其他解释

    请回答：
    """
    cot_judge_result_list = []
    for result in results:
        if not result.think_content:
            cot_judge_result_list.append({})
            continue
        prompt = cot_judge_prompt.format(result.question, result.think_content, result.answer_content)
        judge_result = judge_from_api(prompt)
        judge_dict_result = get_json_result(judge_result)
        judge_dict_result["think_content长度"] = len(result.think_content)
        cot_judge_result_list.append(judge_dict_result)
    return cot_judge_result_list


def judge(results, data_set_config, max_workers):
    judge_type = data_set_config.get("judge_type")
    judge_code = data_set_config.get("judge_code")
    if judge_type == "rule_comparison":
        return exact_match(results, judge_code)
    else:
        judge_prompt = data_set_config.get("judge_prompt")
        return llm_judge(results, judge_prompt, max_workers)


# 规则对比
def exact_match(results, judge_code):
    judge_result_list = []
    for item in results:
        prediction = item.answer_content if item.answer_content else item.prediction
        judge_result = False
        if judge_code:
            loc = locals()
            exec(judge_code, globals(), loc)
            judge_result = loc.get('judge_result', False)
        else:
            judge_result = item.answer == prediction

        judge_result_list.append(judge_result)
    return judge_result_list


def llm_judge(results, judge_prompt, max_workers):
    prompt_template = '''
    请你以公正的评判者的身份，评估一个AI助手对于用户提问的回答的质量。你需要从下面的几个维度对回答进行评估:
  "事实正确性": "回答中提供的信息是否准确无误，是否基于可信的事实和数据。",
  "满足用户需求": "回答是否满足了用户提出问题的目的和需求，是否对问题进行了全面而恰当的回应。",
  "清晰度": "回答是否表达清晰易懂，是否使用了简洁的语言和结构，以便用户可以轻松理解。",
  "完备性": "回答是否提供了足够的信息和细节，以满足用户的需求，是否遗漏了重要的方面",
  "严格正确性": "回答完全与答案语义相同，或者回答中包含答案则认为正确，正确则得10分，否则得0分"

请记住，你需要且仅需要按照以下字典格式（包括括号）返回你所有的打分结果，对齐上面描述的几个维度信息,每个维度必须要有分数并确保你的打分结果是整数： {{"维度一": 打分, "维度二": 打分, ...}}，例如：{{"事实正确性": 9, "满足用户需求": 6, ...}}，不要返回其他无关的信息。

用户的提问: {prompt}
高质量的参考答案: {gold_answer}
需要你评估的AI助手的答案: {pred}
'''
    if judge_prompt:
        prompt_template = judge_prompt

    def process_item(result):
        prompt = prompt_template.format(
            prompt=result.question,
            gold_answer=result.answer,
            pred=result.answer_content if result.answer_content else result.prediction
        )
        judge_result = judge_from_api(prompt)
        return llm_evaluator_handle(judge_result)

    judge_result_list = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results_iterator = executor.map(process_item, results)

        for judge_result in tqdm(results_iterator, total=len(results), desc="LLM Judging Progress"):
            try:
                judge_result_list.append(judge_result)
            except Exception as e:
                print(f"An error occurred: {e}")
                judge_result_list.append(None)

    return judge_result_list


def llm_evaluator_handle(judge_result):
    pattern = r'\{.*?\}'
    match = re.search(pattern, judge_result)

    if match:
        json_str = match.group(0)
        try:
            data = json.loads(json_str)
            return data
        except json.JSONDecodeError as e:
            print("JSONDecodeError: ", judge_result, e)
        return {}
    else:
        print("match judge_result error, judge_result: ", judge_result)
    return {}


def judge_from_api(judge_prompt):
    client = OpenAI(
        api_key="api_key",
        base_url="target_url",
        timeout=60,
        max_retries=2
    )

    processed_messages = [{"role": "user", "content": judge_prompt}]

    try:
        api_params = {
            "model": "judge_model_name",
            "messages": processed_messages,  # 使用处理后的 messages
        }

        completion = client.chat.completions.create(**api_params)
        if completion.choices and len(completion.choices) > 0:
            return completion.choices[0].message.content
    except Exception as e:
        raise e
