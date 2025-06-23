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
from utils.file_util import load_config
import argparse
from execute.run import execute, assign_tasks


def complete_config(config):
    use_vllm = config['DEFAULT'].get('use_vllm', False)
    if use_vllm:
        vllm_cfg = config['DEFAULT'].get('vllm_cfg', {})
        vllm_model_kwargs = vllm_cfg.get('model_kwargs', {})
        vllm_generation_kwargs = vllm_cfg.get('generation_kwargs', {})
        batch_size = vllm_cfg.get('batch_size', 10)

        assert isinstance(vllm_cfg, dict), 'vllm_cfg must be a dict'
        assert isinstance(vllm_model_kwargs, dict), 'vllm_model_kwargs must be a dict'
        assert isinstance(vllm_generation_kwargs, dict), 'vllm_generation_kwargs must be a dict'
        assert isinstance(batch_size, int), 'batch_size must be an int'

        max_seq_len = vllm_cfg.get('max_seq_len', 8192)
        for model_key in config['MODEL'].keys():
            model = config['MODEL'][model_key]
            if "type" in model:
                continue
            model["type"] = "vllm"

            raw_model_kwargs = model.get('model_kwargs')
            if raw_model_kwargs:
                raw_model_kwargs.update(vllm_model_kwargs)
                model['model_kwargs'] = raw_model_kwargs
            raw_generation_kwargs = model.get('generation_kwargs')
            if raw_generation_kwargs:
                raw_generation_kwargs.update(vllm_generation_kwargs)
                model['generation_kwargs'] = raw_generation_kwargs
            model['batch_size'] = batch_size
            model['max_seq_len'] = max_seq_len

            config['MODEL'][model_key] = model


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--yaml_path',
        type=str,
        required=True,
        help='Path to the YAML configuration file'
    )
    path = "demo.yaml"
    config = load_config(path)
    complete_config(config)
    tasks = assign_tasks(config)
    execute(tasks)
