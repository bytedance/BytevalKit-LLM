/**
 * 表征模型框架详细介绍组件
 */
import React, { useState } from 'react';
import { Database, Cpu, BarChart3, Code, CheckCircle, Info } from 'lucide-react';

interface ModelInfo {
  name: string;
  description: string;
}

type ModelArchitecture = Record<string, ModelInfo>;

interface EmbeddingFrameworkProps {
  modelArchitecture: ModelArchitecture;
}

export const EmbeddingFramework: React.FC<EmbeddingFrameworkProps> = ({ 
  modelArchitecture 
}) => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      icon: Database,
      title: '多种模型支持',
      description: '支持GritLM、SentenceTransformers、GME等主流表征模型，兼容单模态和多模态架构'
    },
    {
      icon: Cpu,
      title: '自动化评估',
      description: '完整的"数据集读取-模型调用-评测指标计算"自动化流程，无需人工干预'
    },
    {
      icon: BarChart3,
      title: '扩展评测任务',
      description: '除MTEB、MMEB标准外，支持自定义Retrieval、Classification等评测任务'
    },
    {
      icon: Code,
      title: '可复现设计',
      description: '完整记录评测过程和结果，支持实验复现和调试分析'
    }
  ];

  const configExample = `# BytevalKit-Emb 配置示例
DEFAULT:
  task_name: eval_task_1
  work_dir: ./outputs

DATASET:
  dataset_classification:
    type: mteb_classification
    name: IFlyTek
    data_dir: ./datasets/IFlyTek
    data_type: parquet

MODEL:
  sentence_transformer_model:
    type: sentence_transformer
    name: paraphrase-multilingual-MiniLM-L12-v2
    path_or_dir: sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
    worker_num: 20`;

  const supportedModels = [
    'GritLM', 'SentenceTransformers', 'GME', 'BGE', 'GTE', 'Conan-embedding', 
    'xiaobu-embedding', 'OpenAI-embedding', '自定义模型'
  ];

  const handleMouseEnter = (model: string, event: React.MouseEvent) => {
    setHoveredModel(model);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredModel(null);
  };

  const getModelDescription = (model: string): string => {
    const description = modelArchitecture[model]?.description;
    console.log(`获取模型 ${model} 的描述:`, description); // 调试信息
    
    if (!description) {
      return `${model} 模型介绍加载中...请确保 model-architecture.json 文件在 public 目录下`;
    }
    
    return description;
  };

  const hasModelInfo = (model: string): boolean => {
    return !!modelArchitecture[model]?.description;
  };

  return (
    <section id="embedding-framework" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            🧠 BytevalKit-Emb
          </h2>
          <p className="text-xl text-gray-600 mb-4">表征模型评测框架</p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            专为表征学习模型设计的综合评测平台，提供标准化的性能评估流程，
            支持文本嵌入、多模态表征等多种模型类型的全面测试
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">核心特性</h3>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">配置示例</h3>
            <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm leading-relaxed">
                <code>{configExample}</code>
              </pre>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">一键启动</span>
              </div>
              <p className="text-green-700 text-sm">
                python3 run.py --yaml-path=config.yaml
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">支持的模型类型</h3>
          
          {/* 文件状态提示 */}
          {Object.keys(modelArchitecture).length === 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-800">
                <Info className="w-5 h-5 mr-2" />
                <span className="font-medium">提示：模型介绍文件加载中...</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                请确保 model-architecture.json 文件已放置在 public 目录下
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {supportedModels.map((model, index) => (
              <div
                key={index}
                className={`relative text-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  hasModelInfo(model)
                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 hover:shadow-md hover:border-blue-200'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300'
                }`}
                onMouseEnter={(e) => handleMouseEnter(model, e)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-center">
                  <span className={`font-medium ${hasModelInfo(model) ? 'text-gray-700' : 'text-gray-500'}`}>
                    {model}
                  </span>
                  <Info className={`w-4 h-4 ml-2 ${hasModelInfo(model) ? 'text-blue-500' : 'text-gray-400'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* 悬浮提示框 */}
          {hoveredModel && (
            <div
              className="fixed z-50 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
              }}
            >
              <div className="font-semibold text-gray-800 mb-2 flex items-center">
                <span>{hoveredModel}</span>
                <Info className={`w-4 h-4 ml-2 ${hasModelInfo(hoveredModel) ? 'text-blue-500' : 'text-gray-400'}`} />
              </div>
              <p className={`text-sm leading-relaxed ${hasModelInfo(hoveredModel) ? 'text-gray-600' : 'text-orange-600'}`}>
                {getModelDescription(hoveredModel)}
              </p>
              {/* 箭头指示器 */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
                <div className="absolute -top-[7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-gray-200"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};