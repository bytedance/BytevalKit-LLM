/**
 * 框架概览组件
 * 展示两个框架的核心特性对比
 */
import React from 'react';
import { Brain, MessageCircle, Settings, Zap, BarChart3 } from 'lucide-react';

export const FrameworkOverview: React.FC = () => {
  const frameworks = [
    {
      name: 'BytevalKit-Emb',
      description: '表征模型评测框架',
      color: 'from-blue-500 to-cyan-500',
      icon: Brain,
      features: [
        '支持多种表征模型（GritLM、SentenceTransformers、GME等）',
        '兼容MTEB、MMEB标准评测任务',
        '支持单模态和多模态模型评测',
        '自定义Retrieval、Classification任务'
      ],
      useCases: [
        '文本嵌入模型评测',
        '多模态表征学习',
        '信息检索性能评估',
        '分类任务基准测试'
      ]
    },
    {
      name: 'BytevalKit-LLM',
      description: '大语言模型评测框架',
      color: 'from-purple-500 to-pink-500',
      icon: MessageCircle,
      features: [
        '支持API、Transformer、vLLM多种推理方式',
        'LLM-as-Judge智能评判机制',
        '支持CoT思维链推理评测',
        '批量处理和并发评测'
      ],
      useCases: [
        '大语言模型性能评估',
        '生成质量自动评判',
        '推理能力基准测试',
        '多维度综合评测'
      ]
    }
  ];

  const coreFeatures = [
    {
      icon: Settings,
      title: '配置驱动',
      description: '通过YAML配置文件即可完成复杂评测任务的定制，无需编写代码',
      onClick: () => handleConfigClick()
    },
    {
      icon: Zap,
      title: '开箱即用',
      description: '提供丰富的预置模板和示例，快速上手，几分钟内开始评测',
      onClick: () => handleQuickStartClick()
    },
    {
      icon: BarChart3,
      title: '全面评测',
      description: '覆盖多个标准数据集和评测指标，提供全方位的模型性能评估',
      onClick: () => handleBenchmarkClick()
    }
  ];

  // 配置驱动点击 - 随机跳转到两个框架之一
  const handleConfigClick = () => {
    const sections = ['embedding-framework', 'llm-framework'];
    const randomSection = sections[Math.floor(Math.random() * sections.length)];
    const element = document.getElementById(randomSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 开箱即用点击 - 定位到LLM框架的第一个代码框
  const handleQuickStartClick = () => {
    const element = document.getElementById('llm-quick-start');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // 全面评测点击 - 跳转到评测能力展示
  const handleBenchmarkClick = () => {
    const element = document.getElementById('benchmark-results');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            两大评测框架，覆盖AI模型全场景
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BytevalKit提供专业的表征模型和大语言模型评测解决方案，
            助力研究人员和工程师快速、准确地评估模型性能
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {frameworks.map((framework, index) => {
            const IconComponent = framework.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${framework.color} flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {framework.name}
                </h3>
                <p className="text-gray-600 mb-6">{framework.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">核心特性</h4>
                  <ul className="space-y-2">
                    {framework.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">应用场景</h4>
                  <div className="flex flex-wrap gap-2">
                    {framework.useCases.map((useCase, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={index}
                onClick={feature.onClick}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};