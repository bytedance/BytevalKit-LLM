/**
 * 大语言模型框架详细介绍组件
 */
import React from 'react';
import { MessageSquare, Zap, Brain, Settings, Gauge, Users, Play, Code } from 'lucide-react';

export const LLMFramework: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: '多种推理方式',
      description: '支持API、Transformer、vLLM等部署方式'
    },
    {
      icon: Brain,
      title: 'LLM-as-Judge',
      description: '智能评判机制，支持复杂任务自动评估'
    },
    {
      icon: Zap,
      title: 'CoT推理评测',
      description: '思维链推理过程深度分析'
    },
    {
      icon: Gauge,
      title: '高效并发',
      description: '批量处理和多任务并发优化'
    }
  ];

  const inferenceTypes = [
    {
      name: 'API模式',
      description: 'OpenAI兼容接口',
      color: 'from-green-500 to-emerald-500',
      examples: ['Doubao', 'GPT', '其他API模型服务']
    },
    {
      name: '本地推理',
      description: 'Transformer架构',
      color: 'from-blue-500 to-indigo-500',
      examples: ['Qwen2.5', 'LLaMA', 'glm']
    },
    {
      name: 'vLLM加速',
      description: '高性能推理引擎',
      color: 'from-purple-500 to-pink-500',
      examples: ['批量推理', 'GPU优化', '内存高效']
    }
  ];

  const quickStart = [
    {
      title: '基础评测',
      command: 'python3 main.py --yaml_path demo/demo.yaml'
    },
    {
      title: 'CMMLU评测',
      command: 'python3 main.py --yaml_path demo/cmmlu.yaml'
    }
  ];

  return (
    <section id="llm-framework" className="py-16 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            💬 BytevalKit-LLM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            专业的大语言模型评测平台，提供完整的推理到评判工作流
          </p>
        </div>

        {/* 推理方式展示 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {inferenceTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-4`}>
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{type.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{type.description}</p>
              <div className="flex flex-wrap gap-1">
                {type.examples.map((example, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 核心特性与快速开始 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 核心特性 */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">核心特性</h3>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 快速开始 */}
          <div>
            <h3 id="llm-quick-start" className="text-2xl font-bold text-gray-800 mb-6">快速开始</h3>
            
            {/* 启动命令 */}
            <div className="space-y-3 mb-6">
              {quickStart.map((item, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Play className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-green-400 font-medium text-sm">{item.title}</span>
                  </div>
                  <code className="text-cyan-400 text-sm break-all">{item.command}</code>
                </div>
              ))}
            </div>

            {/* 配置示例 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <Code className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-800">配置示例</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-700">
                <div className="text-green-600"># YAML配置驱动</div>
                <div>DEFAULT:</div>
                <div className="ml-2">task_name: llm_eval_task</div>
                <div className="ml-2">use_vllm: true</div>
                <div className="mt-2">MODEL:</div>
                <div className="ml-2">qwen_model:</div>
                <div className="ml-4">type: vllm</div>
                <div className="ml-4">name: Qwen2.5-7B-Instruct</div>
              </div>
            </div>

            {/* 特性标签 */}
            <div className="flex gap-3 mt-6">
              <div className="flex items-center px-3 py-2 bg-purple-100 rounded-lg">
                <Users className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800 text-sm font-medium">多任务并行</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-blue-100 rounded-lg">
                <Gauge className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-blue-800 text-sm font-medium">vLLM加速</span>
              </div>
            </div>
          </div>
        </div>

        

        
      </div>
    </section>
  );
};

export default LLMFramework;