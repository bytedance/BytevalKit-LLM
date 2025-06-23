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

import copy
from models.model import Model

try:
    from vllm import LLM, SamplingParams
except ImportError:
    LLM, SamplingParams = None, None


class VLLM_Model(Model):
    def __init__(self, config):
        super().__init__()
        self.model = load_vllm_model(config)
        self.kwargs = build_sampling(config)

    def generate(self, prompt_list):
        outputs = []
        for result in self.model.generate(prompt_list, self.kwargs):
            output = format_output(result)
            outputs.append(output)
        return outputs


def format_output(output):
    return {
        'text': output.outputs[0].text,
        'output': output
    }


def load_vllm_model(config):
    path = config.get("path")
    args = parse_vllm_args(config)
    return LLM(path, **args)


def parse_vllm_args(model_config):
    model_kwargs = copy.deepcopy(model_config.get("model_kwargs", {}))
    raw_max_seq_len = model_config.get("max_seq_len", 8192)
    raw_num_gpus = model_config["run_cfg"].get("num_gpus", 1)
    model_kwargs.update({
        "max_model_len": raw_max_seq_len,
        "tensor_parallel_size": raw_num_gpus,
    })

    raw_torch_dtype = model_kwargs.pop("torch_dtype", None)
    if raw_torch_dtype is not None and isinstance(raw_torch_dtype, str):
        model_kwargs["dtype"] = raw_torch_dtype.removeprefix("torch.")

    return model_kwargs


def build_sampling(model_config):
    max_out_len = model_config.get("max_out_len", 2048)
    generation_kwargs = model_config.get("generation_kwargs", {})

    raw_generation_kwargs = {
        'temperature': 0,
        'max_tokens': max_out_len,
        'stop': []
    }
    raw_generation_kwargs.update(generation_kwargs)

    return SamplingParams(**raw_generation_kwargs)
