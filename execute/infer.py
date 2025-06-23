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

import torch
import math
from tqdm import tqdm

from execute.load_model import load_model
from execute.prompt_format import get_infer_list


def prompt_format(model_config, question):
    prompt = ''
    if model_config.get("meta_template"):
        for key in model_config.get("meta_template").keys():
            if key == 'HUMAN_end':
                prompt = prompt + question + model_config.get("meta_template").get(key)
            elif key == 'BOT_end':
                return prompt
            else:
                prompt = prompt + model_config.get("meta_template").get(key)

        return prompt

    return question


def chunk_list(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def infer(task):
    prompt_list = get_infer_list(task.data_set_config)
    model = load_model(task.model_config)

    results = []
    batche_infos = chunk_list(prompt_list, task.batch_size)
    total_num_batches = math.ceil(len(prompt_list) / task.batch_size)

    for batch_info in tqdm(batche_infos, desc="Processing infer", total=total_num_batches):
        with torch.no_grad():
            batch_prompts = [prompt_format(task.model_config, info.question) for info in batch_info]
            batch_outputs = model.generate(batch_prompts)
            for i, info in enumerate(batch_info):
                output = batch_outputs[i]
                info.extra = output.get("output")
                info.prediction = output.get("text")
                results.append(info)

    return results
