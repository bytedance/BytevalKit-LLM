/**
 * 架构图展示组件
 * 展示框架的系统架构和工作流程
 */
import React, { useState } from 'react';
import { ArrowRight, Database, Cpu, Settings, BarChart3 } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState<'embedding' | 'llm'>('embedding');

  const embeddingFlow = [
    { id: 1, name: '配置解析', description: 'YAML配置文件解析', icon: Settings },
    { id: 2, name: '数据加载', description: '多格式数据集读取', icon: Database },
    { id: 3, name: '模型推理', description: '表征向量生成', icon: Cpu },
    { id: 4, name: '指标计算', description: '评测结果生成', icon: BarChart3 }
  ];

  const llmFlow = [
    { id: 1, name: '任务配置', description: 'YAML任务定义', icon: Settings },
    { id: 2, name: '模型推理', description: '多种推理方式', icon: Cpu },
    { id: 3, name: '智能评判', description: 'LLM-as-Judge', icon: BarChart3 },
    { id: 4, name: '结果输出', description: '多维度评分', icon: Database }
  ];

  const currentFlow = activeFramework === 'embedding' ? embeddingFlow : llmFlow;

  const architectureFeatures = [
    {
      title: '模块化设计',
      description: '各组件独立可扩展，支持自定义模型和评测指标'
    },
    {
      title: '配置驱动',
      description: '通过YAML配置实现复杂评测任务的定制化'
    },
    {
      title: '并行处理',
      description: '支持多任务并发和GPU资源智能分配'
    },
    {
      title: '结果可追溯',
      description: '完整记录评测过程，支持结果复现和调试'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            🏗️ 系统架构
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            模块化的系统设计，确保框架的可扩展性和易用性
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveFramework('embedding')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFramework === 'embedding'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              表征模型架构
            </button>
            <button
              onClick={() => setActiveFramework('llm')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFramework === 'llm'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              LLM模型架构
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {activeFramework === 'embedding' ? 'BytevalKit-Emb 工作流程' : 'BytevalKit-LLM 工作流程'}
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {currentFlow.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center text-center max-w-xs">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                      activeFramework === 'embedding' 
                        ? 'from-blue-500 to-cyan-500' 
                        : 'from-purple-500 to-pink-500'
                    } flex items-center justify-center mb-4 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{step.name}</h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  
                  {index < currentFlow.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {architectureFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium shadow-lg">
            <span>📈 支持无缝扩展和自定义开发</span>
          </div>
        </div>
      </div>
    </section>
  );
};
