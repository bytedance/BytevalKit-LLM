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
from utils.file_util import read_file


class InferDetail:
    def __init__(self, question, answer, prediction='', extra=None, judge_result='', think_content='',
                 answer_content='', think_judge_result=None):
        self.question = question
        self.answer = answer
        self.prediction = prediction
        self.extra = extra if extra is not None else {}
        self.judge_result = judge_result
        self.think_content = think_content
        self.answer_content = answer_content
        self.think_judge_result = think_judge_result if think_judge_result is not None else {}

    def to_dict(self):
        return {
            'question': self.question,
            'answer': self.answer,
            'prediction': self.prediction,
            'extra': str(self.extra),
            'judge_result': self.judge_result,
            'think_content': self.think_content,
            'answer_content': self.answer_content,
            'think_judge_result': self.think_judge_result,
        }


def get_infer_list(config):
    data = read_file(config.get("path", ""))
    question_key = config.get("question_key", "question")
    answer_key = config.get("answer_key", "answer")
    exec_code = config.get("exec_code")

    infer_list = []

    for i, _item in enumerate(data):
        item = _item
        if isinstance(_item, str):
            item = json.loads(_item)

        question = ""
        answer = ""

        if exec_code:
            loc = locals()
            exec(exec_code, globals(), loc)
            question = loc.get('question', '')
            answer = loc.get('answer', '')
        else:
            question = item.get(question_key)
            answer = item.get(answer_key)
        infer_list.append(InferDetail(question, answer))

    return infer_list
