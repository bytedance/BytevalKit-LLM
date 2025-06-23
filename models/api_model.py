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
from abc import abstractmethod
from openai import OpenAI
from models.model import Model
import concurrent.futures  # 新增导入


class API_Model(Model):
    def __init__(self, config):
        super().__init__()
        self.client = build_client(config)
        self.model = config.get('name')
        self.kwargs = config.get('model_kwargs', {})
        self.max_workers = config.get('max_workers', None)

    def _generate(self, prompt):
        processed_messages = [{"role": "user", "content": prompt}]

        try:
            api_params = {
                "model": self.model,
                "messages": processed_messages,
                **self.kwargs
            }

            completion = self.client.chat.completions.create(**api_params)

            if completion.choices and len(completion.choices) > 0:
                return {
                    "text": completion.choices[0].message.content,
                    "output": completion.choices
                }
            else:
                return "未能从 API 获取有效的响应。"
        except Exception as e:
            print(f"调用 OpenAI API 时发生错误: {e}")
            raise

    def generate(self, prompt_list):
        if not prompt_list:
            return []

        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            results_iterator = executor.map(self._generate, prompt_list)
            result_list = list(results_iterator)

        return result_list


def build_client(config) -> OpenAI:
    api_key = config.get("api_key")
    if api_key is None:
        api_key = os.environ.get("OPENAI_API_KEY")

    if api_key is None:
        raise ValueError("API 密钥未提供，请设置 OPENAI_API_KEY 环境变量或直接传入 api_key 参数。")

    base_url = config["base_url"]
    if base_url is None:
        raise ValueError("请指定 base_url")
    timeout = config.get("timeout", 60.0)
    max_retries = config.get("max_retries", 3)

    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
        timeout=timeout,
        max_retries=max_retries
    )
    return client
