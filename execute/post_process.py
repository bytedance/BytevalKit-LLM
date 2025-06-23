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

import re


def process_cot_content(prediction, re_string):
    re_string = re_string or r'<think>(?P<think>.*?)</think>(?P<answer>.*)'
    try:
        pattern = re.compile(re_string, re.DOTALL)
    except re.error as e:
        print(f"Invalid regular expression: {re_string}. Error: {e}")
        return '', prediction

    def extract_think_and_answer(text):
        try:
            match = pattern.search(text)
            if match:
                think_content = match.group('think')
                answer_content = match.group('answer')
                return think_content, answer_content
            else:
                print("No match found.")
                return '', text
        except (IndexError, AttributeError):
            print("Regular expression pattern does not contain named groups 'think' and 'answer'.")
            return '', text

    think_content, answer_content = extract_think_and_answer(prediction)
    return think_content, answer_content


if __name__ == '__main__':
    model_prediction = "<think>\n好的，用户问的是香奈儿5号香水的调香师是谁。首先，我需要确认香奈儿5号的调香师。记得香奈儿系列的香水都有不同的调香师，比如香奈儿3号是Marie Kreutz，而5号可能是另外的调香师。不过，可能用户记错了，或者有其他可能性。需要查证一下。\n\n香奈儿5号的香水配方由法国香水师创作，但具体名字可能不是我所记得的。可能用户混淆了其他香水，比如香奈儿3号的调香师是Marie Kreutz，而5号可能是另一个调香师。或者可能用户有其他来源的信息，但需要确认正确的答案。\n\n另外，用户可能对香奈儿的香水系列不太熟悉，所以需要解释清楚香奈儿系列的特点，以及香奈儿5号的调香师。确保回答准确，同时避免混淆其他香水。可能需要提到香奈儿5号的调香师是Marie Kreutz，但需要确认这一点。或者，如果确实不是，可能需要指出可能的混淆，并说明正确的调香师是谁。\n</think>\n\n香奈儿5号香水是由法国香水师**Marie Kreutz**创作的。不过，需要注意的是，香奈儿系列中香水的调香师通常以不同的名字出现，例如：\n\n- 香奈儿3号（Marie Kreutz）  \n- 香奈儿4号（Marie Kreutz）  \n- 香奈儿5号（Marie Kreutz）  \n\n因此，**香奈儿5号的调香师是Marie Kreutz**，而香奈儿3号、4号和5号的调香师也都是Marie Kreutz。"
    think_content, answer_content = process_cot_content(model_prediction,
                                                        r'<think>(?P<think>.*?)</think>(?P<answer>.*)')
    print(think_content)
    print(answer_content)
