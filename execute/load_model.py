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

from models.huggingface import HuggingFaceModel
from models.vllm import VLLM_Model
from models.api_model import API_Model


def load_model(model_config):
    infer_type = model_config.get("type")

    if infer_type == 'vllm':
        return VLLM_Model(model_config)
    elif infer_type == "api":
        return API_Model(model_config)
    else:
        return HuggingFaceModel(model_config)
