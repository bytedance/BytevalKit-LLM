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

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os  # 导入 os 模块用于路径检查
from models.model import Model


class HuggingFaceModel(Model):
    def __init__(self, config):
        super().__init__()
        model, tokenizer, device = load_huggingface_model(config)
        self.model = model
        self.tokenizer = tokenizer
        self.device = device
        self.max_length = 2048

    def generate(self, prompt_list):
        inputs = self.tokenizer(prompt_list, return_tensors="pt", padding=True, truncation=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}

        outputs = self.model.generate(
            **inputs,
            max_length=self.max_length,
            num_return_sequences=1,
            pad_token_id=self.tokenizer.pad_token_id,
            early_stopping=True
        )

        result_list = []
        prompt_tokens_count = inputs['input_ids'].shape[1]

        for i in range(outputs.shape[0]):
            output_sequence = outputs[i]
            generated_token_ids = output_sequence[prompt_tokens_count:]
            text = self.tokenizer.decode(generated_token_ids, skip_special_tokens=True)
            result_list.append({
                'text': text,
                'output': output_sequence
            })

        return result_list


def load_huggingface_model(config):
    path = config.get("path")
    if not os.path.isdir(path):
        print(f"错误: 提供的路径 '{path}' 不是一个有效的目录。")
        return None, None, None

    try:
        tokenizer = AutoTokenizer.from_pretrained(path)
        model = AutoModelForCausalLM.from_pretrained(path)

        device = torch.device("cuda")
        model.to(device)

        return model, tokenizer, device
    except Exception as e:
        print(f"从本地加载模型时出错: {e}")
        return None, None, None
