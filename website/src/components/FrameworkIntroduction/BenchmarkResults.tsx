/**
 * 评测结果展示组件
 * 使用图表展示框架的评测能力和结果
 */
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Award, Target, Zap, ChevronDown, ChevronUp, Info, Medal, Trophy } from 'lucide-react';

export const BenchmarkResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'embedding' | 'llm'>('embedding');
  const [showNdcgTooltip, setShowNdcgTooltip] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(true);

  // 更新更完整的embedding数据
  const embeddingData = [
  // mteb_classification数据
  { 
    name: 'IFlyTek', 
    metric: 'accuracy',
    'ritrieve_zh_v1': 52.01,
    'xiaobu-embedding-v2': 51.21,
    'Conan-embedding-v1': 51.52,
    'stella-mrl-large-zh-v3.5-1792d': 50.83,
    'zpoint_large_embedding_zh': 50.37,
    'stella-large-zh-v3-1792d': 50.37,
    'stella-base-zh-v3-1792d': 49.21,
    'gte-large-zh': 49.83,
    'xiaobu-embedding': 49.29,
    'bge-large-zh-v1.5': 48.21
  },
  { 
    name: 'JDReview', 
    metric: 'accuracy',
    'ritrieve_zh_v1': 90.2,
    'Conan-embedding-v1': 90.07,
    'zpoint_large_embedding_zh': 89.68,
    'xiaobu-embedding-v2': 88.47,
    'gte-large-zh': 88,
    'stella-mrl-large-zh-v3.5-1792d': 87.52,
    'stella-base-zh-v3-1792d': 86.96,
    'stella-large-zh-v3-1792d': 86.12,
    'xiaobu-embedding': 85.56,
    'bge-large-zh-v1.5': 85.02
  },
  { 
    name: 'MultilingualSenti', 
    metric: 'accuracy',
    'ritrieve_zh_v1': 80,
    'xiaobu-embedding-v2': 79.38,
    'Conan-embedding-v1': 78.6,
    'zpoint_large_embedding_zh': 78.73,
    'stella-mrl-large-zh-v3.5-1792d': 76.83,
    'stella-large-zh-v3-1792d': 76.77,
    'stella-base-zh-v3-1792d': 76.83,
    'xiaobu-embedding': 76.83,
    'gte-large-zh': 76.33,
    'bge-large-zh-v1.5': 74.15
  },
  { 
    name: 'OnlineShopping', 
    metric: 'accuracy',
    'zpoint_large_embedding_zh': 95.05,
    'Conan-embedding-v1': 95,
    'ritrieve_zh_v1': 94.62,
    'xiaobu-embedding-v2': 94.5,
    'stella-mrl-large-zh-v3.5-1792d': 93.95,
    'stella-base-zh-v3-1792d': 93.3,
    'stella-large-zh-v3-1792d': 93.2,
    'xiaobu-embedding': 92.75,
    'bge-large-zh-v1.5': 92.74,
    'gte-large-zh': 91.75
  },
  { 
    name: 'TNews', 
    metric: 'accuracy',
    'ritrieve_zh_v1': 27.51,
    'Conan-embedding-v1': 27.5,
    'xiaobu-embedding-v2': 27.3,
    'zpoint_large_embedding_zh': 27,
    'stella-base-zh-v3-1792d': 26.59,
    'stella-large-zh-v3-1792d': 26.41,
    'stella-mrl-large-zh-v3.5-1792d': 26.27,
    'bge-large-zh-v1.5': 26.08,
    'xiaobu-embedding': 26.01,
    'gte-large-zh': 25.8
  },
  { 
    name: 'Waimai', 
    metric: 'accuracy',
    'zpoint_large_embedding_zh': 89.8,
    'ritrieve_zh_v1': 89.74,
    'Conan-embedding-v1': 89.7,
    'xiaobu-embedding-v2': 88.85,
    'stella-large-zh-v3-1792d': 88.4,
    'stella-mrl-large-zh-v3.5-1792d': 88.4,
    'xiaobu-embedding': 88.1,
    'gte-large-zh': 88.05,
    'stella-base-zh-v3-1792d': 87.4,
    'bge-large-zh-v1.5': 86.7
  },
  // Similarity Classification数据
  {
    name: 'CMNLI',
    metric: 'accuracy', 
    'gte-large-zh': 76.2,
    'bge-large-zh-v1.5': 67.66,
    'stella-mrl-large-zh-v3.5-1792d': 57.16,
    'xiaobu-embedding': 55.3,
    'stella-large-zh-v3-1792d': 54.91,
    'stella-base-zh-v3-1792d': 54.69,
    'Conan-embedding-v1': 54.46,
    'ritrieve_zh_v1': 51.45,
    'zpoint_large_embedding_zh': 51.44,
    'xiaobu-embedding-v2': 51.44
  },
  {
    name: 'Ocnli',
    metric: 'accuracy',
    'gte-large-zh': 73.03,
    'bge-large-zh-v1.5': 62.59,
    'stella-mrl-large-zh-v3.5-1792d': 61.4,
    'stella-large-zh-v3-1792d': 58.47,
    'stella-base-zh-v3-1792d': 58.26,
    'xiaobu-embedding': 55.93,
    'ritrieve_zh_v1': 51.38,
    'Conan-embedding-v1': 51.38,
    'zpoint_large_embedding_zh': 51.27,
    'xiaobu-embedding-v2': 51.27
  },
  // Retrieval任务数据
  {
    name: 'CmedqaRetrieval',
    metric: 'NDCG@10',
    'ritrieve_zh_v1': 47.9,
    'Conan-embedding-v1': 47.78,
    'zpoint_large_embedding_zh': 47.41,
    'xiaobu-embedding-v2': 47.38,
    'stella-large-zh-v3-1792d': 47.05,
    'stella-mrl-large-zh-v3.5-1792d': 46.78,
    'stella-base-zh-v3-1792d': 45.54,
    'xiaobu-embedding': 44.47,
    'gte-large-zh': 43.42,
    'bge-large-zh-v1.5': 41.81
  },
  {
    name: 'CovidRetrieval',
    metric: 'NDCG@10',
    'ritrieve_zh_v1': 92.07,
    'Conan-embedding-v1': 91.23,
    'xiaobu-embedding-v2': 89.5,
    'zpoint_large_embedding_zh': 89.2,
    'gte-large-zh': 88.44,
    'xiaobu-embedding': 87.75,
    'stella-large-zh-v3-1792d': 82.47,
    'stella-mrl-large-zh-v3.5-1792d': 81.9,
    'stella-base-zh-v3-1792d': 80.61,
    'bge-large-zh-v1.5': 73.03
  },
  {
    name: 'DuRetrieval',
    metric: 'NDCG@10',
    'ritrieve_zh_v1': 89.26,
    'xiaobu-embedding-v2': 89.68,
    'zpoint_large_embedding_zh': 89.45,
    'Conan-embedding-v1': 88.79,
    'bge-large-zh-v1.5': 88.76,
    'stella-large-zh-v3-1792d': 87.44,
    'stella-mrl-large-zh-v3.5-1792d': 87.11,
    'xiaobu-embedding': 86.81,
    'gte-large-zh': 85.65,
    'stella-base-zh-v3-1792d': 85.91
  },
  {
    name: 'MedicalRetrieval',
    metric: 'NDCG@10',
    'ritrieve_zh_v1': 68.02,
    'xiaobu-embedding-v2': 67.98,
    'zpoint_large_embedding_zh': 67.71,
    'Conan-embedding-v1': 67.13,
    'stella-large-zh-v3-1792d': 65.2,
    'stella-base-zh-v3-1792d': 64.41,
    'stella-mrl-large-zh-v3.5-1792d': 64.75,
    'xiaobu-embedding': 63.19,
    'gte-large-zh': 62.81,
    'bge-large-zh-v1.5': 57.35
  },
  {
    name: 'MMarcoRetrieval',
    metric: 'NDCG@10',
    'ritrieve_zh_v1': 82.54,
    'zpoint_large_embedding_zh': 82.37,
    'Conan-embedding-v1': 82.27,
    'xiaobu-embedding-v2': 82.26,
    'stella-mrl-large-zh-v3.5-1792d': 79.16,
    'stella-large-zh-v3-1792d': 79.1,
    'bge-large-zh-v1.5': 78.77,
    'xiaobu-embedding': 78.39,
    'gte-large-zh': 77.52,
    'stella-base-zh-v3-1792d': 77.36
  },
  {
    name: 'T2Retrieval',
    metric: 'NDCG@10',
    'stella-mrl-large-zh-v3.5-1792d': 86.5,
    'xiaobu-embedding': 86.22,
    'stella-large-zh-v3-1792d': 86.19,
    'xiaobu-embedding-v2': 85.59,
    'stella-base-zh-v3-1792d': 85.16,
    'ritrieve_zh_v1': 84.82,
    'zpoint_large_embedding_zh': 84.39,
    'bge-large-zh-v1.5': 84.29,
    'Conan-embedding-v1': 83.79,
    'gte-large-zh': 82.95
  },
  {
    name: 'VideoRetrieval',
    metric: 'NDCG@10',
    'zpoint_large_embedding_zh': 80.18,
    'Conan-embedding-v1': 80.29,
    'ritrieve_zh_v1': 80.42,
    'xiaobu-embedding-v2': 80.08,
    'stella-mrl-large-zh-v3.5-1792d': 74.52,
    'gte-large-zh': 73.01,
    'stella-large-zh-v3-1792d': 73.15,
    'xiaobu-embedding': 73.17,
    'stella-base-zh-v3-1792d': 72.19,
    'bge-large-zh-v1.5': 70.89
  }
  ];

  // 更新更完整的LLM数据
  const llmData = [
    { 
      name: 'AIME24', 
      'qwen3-235b-a22b': 50,
      'DeepSeek-V3-671B': 33.3,
      'Qwen3_32B': 33.33,
      'qwen3-14b': 26.67,
      'Qwen3_8B': 23.3,
      'qwen1.7B-instruct': 16.67,
      'Qwen2.5_7B': 13.3,
      'Qwen2.5_1.5B': 3.33
    },
    { 
      name: 'AIME25',
      'qwen3-235b-a22b': 27.5,
      'DeepSeek-V3-671B': 25.83,
      'qwen3-14b': 23.33,
      'Qwen3_32B': 20,
      'Qwen2.5_7B': 15.42,
      'Qwen3_8B': 8.33,
      'qwen1.7B-instruct': 7.5
    },
    { 
      name: 'C-SimpleQA', 
      'Qwen3_32B': 40.12,
      'qwen3-14b': 37.21,
      'DeepSeek-V3-671B': 58.79,
      'qwen3-235b-a22b': 54.39,
      'Qwen3_8B': 31.85,
      'Qwen2.5_7B': 23.43,
      'qwen1.7B-instruct': 13.67,
      'Qwen2.5_1.5B': 12.56
    },
    { 
      name: 'MATH-500', 
      'qwen3-235b-a22b': 87.8,
      'qwen3-14b': 75.4,
      'Qwen3_32B': 75.8,
      'Qwen3_8B': 83,
      'Qwen2.5_7B': 77.8,
      'DeepSeek-V3-671B': 71.6,
      'qwen1.7B-instruct': 71.2,
      'Qwen2.5_1.5B': 55.8
    },
    { 
      name: 'BBH', 
      'qwen3-235b-a22b': 88.81,
      'Qwen3_32B': 87.39,
      'DeepSeek-V3-671B': 87.01,
      'qwen3-14b': 84.59,
      'Qwen3_8B': 80.3,
      'Qwen2.5_7B': 64.3,
      'qwen1.7B-instruct': 55,
      'Qwen2.5_1.5B': 36.2
    },
    { 
      name: 'ceval-gen', 
      'DeepSeek-V3-671B': 90,
      'qwen3-235b-a22b': 85.78,
      'Qwen3_32B': 84.77,
      'qwen3-14b': 82.8,
      'Qwen3_8B': 76.3,
      'Qwen2.5_7B': 73.99,
      'Qwen2.5_1.5B': 54.23,
      'qwen1.7B-instruct': 53.8
    },
    { 
      name: 'cmmlu-gen', 
      'Qwen3_32B': 73.33,
      'qwen3-235b-a22b': 82.49,
      'DeepSeek-V3-671B': 79.2,
      'qwen3-14b': 77.9,
      'Qwen3_8B': 75.82,
      'Qwen2.5_7B': 73.73,
      'Qwen2.5_1.5B': 66.28,
      'qwen1.7B-instruct': 53.13
    },
    { 
      name: 'hellaswag-gen', 
      'qwen3-235b-a22b': 84.48,
      'Qwen3_32B': 81.1,
      'qwen3-14b': 54.55,
      'DeepSeek-V3-671B': 82.6,
      'Qwen3_8B': 70.3,
      'Qwen2.5_7B': 69.6,
      'qwen1.7B-instruct': 61,
      'Qwen2.5_1.5B': 56.25
    },
    { 
      name: 'GPQA-Diamond', 
      'qwen3-235b-a22b': 62.63,
      'qwen3-14b': 54.55,
      'Qwen3_32B': 54,
      'DeepSeek-V3-671B': 48.48,
      'Qwen3_8B': 40.4,
      'Qwen2.5_7B': 34.4,
      'Qwen2.5_1.5B': 30.3,
      'qwen1.7B-instruct': 26.77
    },
    { 
      name: 'MMLU-Pro', 
      'qwen3-235b-a22b': 78.58,
      'DeepSeek-V3-671B': 78.57,
      'Qwen3_8B': 74.3,
      'Qwen3_32B': 72.86,
      'qwen3-14b': 67.14,
      'Qwen2.5_7B': 62.85,
      'qwen1.7B-instruct': 41.43,
      'Qwen2.5_1.5B': 32.14
    }
  ];

  // 评测框架统计数据
  const stats = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "评测数据集",
      description: "覆盖多个领域和任务类型"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "模型支持",
      description: "支持各类主流模型评测"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: "评测指标",
      description: "全面的性能评估体系"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "评测效率",
      description: "更简洁的配置实现相同的评测效率"
    }
  ];

  // 更新完整排行榜数据，包含更多模型和更详细的数据
  const fullLeaderboardData = {
    embedding: [
      { rank: 1, model: 'gte-large-zh', avgScore: 74.8, tasks: {
        'mteb_classification': 76.3, 'similarity_classification': 74.6, 'retrieval': 73.4
      }},
      { rank: 2, model: 'stella-mrl-large-zh-v3.5-1792d', avgScore: 70.7, tasks: {
        'mteb_classification': 78.3, 'similarity_classification': 59.3, 'retrieval': 74.4
      }},
      { rank: 3, model: 'bge-large-zh-v1.5', avgScore: 70.2, tasks: {
        'mteb_classification': 74.8, 'similarity_classification': 65.1, 'retrieval': 70.7
      }},
      { rank: 4, model: 'Conan-embedding-v1', avgScore: 69.6, tasks: {
        'mteb_classification': 78.5, 'similarity_classification': 52.9, 'retrieval': 77.3
      }},
      { rank: 5, model: 'stella-large-zh-v3-1792d', avgScore: 69.5, tasks: {
        'mteb_classification': 77.4, 'similarity_classification': 56.7, 'retrieval': 74.4
      }},
      { rank: 6, model: 'ritrieve_zh_v1', avgScore: 69.4, tasks: {
        'mteb_classification': 79.1, 'similarity_classification': 51.4, 'retrieval': 77.7
      }},
      { rank: 7, model: 'xiaobu-embedding-v2', avgScore: 69.2, tasks: {
        'mteb_classification': 78.8, 'similarity_classification': 51.4, 'retrieval': 77.5
      }},
      { rank: 8, model: 'zpoint_large_embedding_zh', avgScore: 69.1, tasks: {
        'mteb_classification': 78.6, 'similarity_classification': 51.4, 'retrieval': 77.2
      }},
      { rank: 9, model: 'xiaobu-embedding', avgScore: 68.7, tasks: {
        'mteb_classification': 76.1, 'similarity_classification': 55.6, 'retrieval': 74.3
      }},
      { rank: 10, model: 'stella-base-zh-v3-1792d', avgScore: 68.3, tasks: {
        'mteb_classification': 75.3, 'similarity_classification': 56.5, 'retrieval': 73.0
      }}
    ],
    llm: [
    { 
      rank: 1, 
      model: 'qwen3-235b-a22b', 
      avgScore: 70.25, 
      tasks: {
        'AIME24': 50, 
        'AIME25': 27.5, 
        'C-SimpleQA': 54.39, 
        'MATH-500': 87.8, 
        'BBH': 88.81, 
        'ceval-gen': 85.78, 
        'cmmlu-gen': 82.49, 
        'hellaswag-gen': 84.48, 
        'GPQA-Diamond': 62.63, 
        'MMLU-Pro': 78.58
      }
    },
    { 
      rank: 2, 
      model: 'DeepSeek-V3-671B', 
      avgScore: 65.54, 
      tasks: {
        'AIME24': 33.3, 
        'AIME25': 25.83, 
        'C-SimpleQA': 58.79, 
        'MATH-500': 71.6, 
        'BBH': 87.01, 
        'ceval-gen': 90, 
        'cmmlu-gen': 79.2, 
        'hellaswag-gen': 82.6, 
        'GPQA-Diamond': 48.48, 
        'MMLU-Pro': 78.57
      }
    },
    { 
      rank: 3, 
      model: 'Qwen3_32B', 
      avgScore: 62.27, 
      tasks: {
        'AIME24': 33.33, 
        'AIME25': 20, 
        'C-SimpleQA': 40.12, 
        'MATH-500': 75.8, 
        'BBH': 87.39, 
        'ceval-gen': 84.77, 
        'cmmlu-gen': 73.33, 
        'hellaswag-gen': 81.1, 
        'GPQA-Diamond': 54, 
        'MMLU-Pro': 72.86
      }
    },
    { 
      rank: 4, 
      model: 'qwen3-14b', 
      avgScore: 58.41, 
      tasks: {
        'AIME24': 26.67, 
        'AIME25': 23.33, 
        'C-SimpleQA': 37.21, 
        'MATH-500': 75.4, 
        'BBH': 84.59, 
        'ceval-gen': 82.8, 
        'cmmlu-gen': 77.9, 
        'hellaswag-gen': 54.55, 
        'GPQA-Diamond': 54.55, 
        'MMLU-Pro': 67.14
      }
    },
    { 
      rank: 5, 
      model: 'Qwen3_8B', 
      avgScore: 56.39, 
      tasks: {
        'AIME24': 23.3, 
        'AIME25': 8.33, 
        'C-SimpleQA': 31.85, 
        'MATH-500': 83, 
        'BBH': 80.3, 
        'ceval-gen': 76.3, 
        'cmmlu-gen': 75.82, 
        'hellaswag-gen': 70.3, 
        'GPQA-Diamond': 40.4, 
        'MMLU-Pro': 74.3
      }
    },
    { 
      rank: 6, 
      model: 'Qwen2.5_7B', 
      avgScore: 50.88, 
      tasks: {
        'AIME24': 13.3, 
        'AIME25': 15.42, 
        'C-SimpleQA': 23.43, 
        'MATH-500': 77.8, 
        'BBH': 64.3, 
        'ceval-gen': 73.99, 
        'cmmlu-gen': 73.73, 
        'hellaswag-gen': 69.6, 
        'GPQA-Diamond': 34.4, 
        'MMLU-Pro': 62.85
      }
    },
    { 
      rank: 7, 
      model: 'qwen1.7B-instruct', 
      avgScore: 40.02, 
      tasks: {
        'AIME24': 16.67, 
        'AIME25': 7.5, 
        'C-SimpleQA': 13.67, 
        'MATH-500': 71.2, 
        'BBH': 55, 
        'ceval-gen': 53.8, 
        'cmmlu-gen': 53.13, 
        'hellaswag-gen': 61, 
        'GPQA-Diamond': 26.77, 
        'MMLU-Pro': 41.43
      }
    },
    { 
      rank: 8, 
      model: 'Qwen2.5_1.5B', 
      avgScore: 38.57, 
      tasks: {
        'AIME24': 3.33, 
        'AIME25': 0.0, 
        'C-SimpleQA': 12.56, 
        'MATH-500': 55.8, 
        'BBH': 36.2, 
        'ceval-gen': 54.23, 
        'cmmlu-gen': 66.28, 
        'hellaswag-gen': 56.25, 
        'GPQA-Diamond': 30.3, 
        'MMLU-Pro': 32.14
      }
    }
  ]
  };

  // 自定义Tooltip组件
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = embeddingData.find(item => item.name === label);
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600">评测指标: </span>
            <span className="font-medium text-blue-600 ml-1">{data?.metric}</span>
            {data?.metric === 'NDCG@10' && (
              <div className="relative ml-2">
                <Info 
                  className="w-4 h-4 text-gray-400 cursor-help" 
                  onMouseEnter={() => setShowNdcgTooltip(true)}
                  onMouseLeave={() => setShowNdcgTooltip(false)}
                />
                {showNdcgTooltip && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
                    <div className="font-semibold mb-1">NDCG@10</div>
                    <div>Normalized Discounted Cumulative Gain at 10，是信息检索中的重要评估指标。它衡量检索结果前10个文档的相关性，考虑了结果的排序位置，位置越靠前权重越高。值越接近1表示检索效果越好。</div>
                  </div>
                )}
              </div>
            )}
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.dataKey}: </span>
              <span className="font-semibold ml-1">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleLeaderboardClick = () => {
    setShowFullLeaderboard(!showFullLeaderboard);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            📊 评测能力展示
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            BytevalKit在多个标准数据集上的评测结果，展示了框架的可靠性和兼容性
          </p>
          
          {/* Leaderboard按钮 */}
          <div className="flex justify-center">
            <button
              onClick={handleLeaderboardClick}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Award className="w-5 h-5 mr-2" />
              {showFullLeaderboard ? '收起完整排行榜' : '查看完整排行榜'}
              {showFullLeaderboard ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>

        {/* 完整排行榜展示 */}
        {showFullLeaderboard && (
          <div className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🏆 完整模型排行榜</h3>
            
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-1 shadow-md">
                <button
                  onClick={() => setActiveTab('embedding')}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'embedding'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  表征模型
                </button>
                <button
                  onClick={() => setActiveTab('llm')}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'llm'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  大语言模型
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">排名</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">模型名称</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">平均分数</th>
                    {activeTab === 'embedding' ? (
                      <>
                        <th className="px-3 py-4 text-center text-xs font-semibold text-gray-600">MTEB分类</th>
                        <th className="px-3 py-4 text-center text-xs font-semibold text-gray-600">相似度分类</th>
                        <th className="px-3 py-4 text-center text-xs font-semibold text-gray-600">检索任务</th> 
                      </>
                    ) : (
                      <>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">AIME24</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">AIME25</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">C-SimpleQA</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">MATH-500</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">BBH</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">ceval-gen</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">cmmlu-gen</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">hellaswag-gen</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">GPQA-Diamond</th>
                        <th className="px-2 py-4 text-center text-xs font-semibold text-gray-600">MMLU-Pro</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {fullLeaderboardData[activeTab].map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getRankIcon(item.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800 text-sm">{item.model}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          item.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          item.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          item.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.avgScore.toFixed(1)}%
                        </span>
                      </td>
                      {Object.values(item.tasks).map((score, taskIndex) => (
                        <td key={taskIndex} className="px-2 py-4 text-center">
                          <span className="text-xs text-gray-600">{typeof score === 'number' ? score.toFixed(1) : score}%</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                {activeTab === 'embedding' 
                  ? '* 表征模型排行榜基于MTEB/MMEB评测框架，包含分类、相似度和检索任务，检索任务使用NDCG@10指标，其他任务使用accuracy指标'
                  : '* 大语言模型排行榜基于多个标准评测数据集，包含数学推理、常识推理、中英文理解等任务，所有任务均使用accuracy指标'
                }
              </p>
            </div>
          </div>
        )}

        {/* 统计数据展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setActiveTab('embedding')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'embedding'
                      ? 'bg-white text-blue-600 shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🔍 表征模型评测
                </button>
                <button
                  onClick={() => setActiveTab('llm')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'llm'
                      ? 'bg-white text-purple-600 shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🤖 大语言模型评测
                </button>
              </div>
            </div>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'embedding' ? (
                  <BarChart data={embeddingData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="gte-large-zh" fill="#3B82F6" name="gte-large-zh" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="stella-mrl-large-zh-v3.5-1792d" fill="#10B981" name="stella-mrl-large-zh-v3.5-1792d" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bge-large-zh-v1.5" fill="#8B5CF6" name="bge-large-zh-v1.5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Conan-embedding-v1" fill="#F59E0B" name="Conan-embedding-v1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="stella-large-zh-v3-1792d" fill="#EF4444" name="stella-large-zh-v3-1792d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={llmData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="qwen3-235b-a22b" stroke="#FF6B6B" strokeWidth={3} name="qwen3-235b-a22b" />
                    <Line type="monotone" dataKey="Qwen3_32B" stroke="#4ECDC4" strokeWidth={3} name="Qwen3_32B" />
                    <Line type="monotone" dataKey="DeepSeek-V3-671B" stroke="#45B7D1" strokeWidth={3} name="DeepSeek-V3-671B" />
                    <Line type="monotone" dataKey="qwen3-14b" stroke="#F39C12" strokeWidth={3} name="qwen3-14b" />
                    <Line type="monotone" dataKey="Qwen3_8B" stroke="#8B5CF6" strokeWidth={3} name="Qwen3_8B" />
                    <Line type="monotone" dataKey="Qwen2.5_7B" stroke="#10B981" strokeWidth={3} name="Qwen2.5_7B" />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {activeTab === 'embedding' 
                  ? '表征模型在MTEB/MMEB任务上的性能对比 (accuracy: 准确率%, NDCG@10: 归一化折损累积增益@10)'
                  : '大语言模型在各评测数据集上的性能对比（准确率%）'
                }
              </p>
              
              {/* 指标说明 */}
              {activeTab === 'embedding' && (
                <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
                    <span>Classification任务: accuracy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-100 rounded-full mr-2"></div>
                    <span>Retrieval任务: NDCG@10</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};