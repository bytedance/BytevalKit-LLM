import React, { useState, useEffect } from 'react';
import { FrameworkIntroduction } from './components/FrameworkIntroduction';
import './App.css';

interface ModelInfo {
  name: string;
  description: string;
}

type ModelArchitecture = Record<string, ModelInfo>;

const App: React.FC = () => {
  const [modelArchitecture, setModelArchitecture] = useState<ModelArchitecture>({});
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    console.log('开始读取模型架构文件...');
    setLoadingStatus('loading');
    
    // 读取模型架构JSON文件
    fetch('/model-architecture.json')
      .then(response => {
        console.log('文件请求响应状态:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('成功读取模型架构数据:', data);
        setModelArchitecture(data);
        setLoadingStatus('success');
      })
      .catch(error => {
        console.error('读取模型架构文件失败:', error);
        setLoadingStatus('error');
        // 如果文件读取失败，使用默认数据
        const defaultData = {
          'GritLM': {
            name: 'GritLM',
            description: '生成和表征统一的大语言模型，支持文本生成和向量表征双重能力，在多项MTEB任务中表现优异'
          },
          'SentenceTransformers': {
            name: 'SentenceTransformers',
            description: '专为语义相似度任务优化的句子表征模型框架，支持多语言文本嵌入和跨模态检索'
          },
          'GME': {
            name: 'GME',
            description: '通用多模态嵌入模型，能够同时处理文本、图像等多种模态数据，实现跨模态表征学习'
          },
          'BGE': {
            name: 'BGE',
            description: 'BAAI通用嵌入模型，在中英文文本检索和语义匹配任务中表现卓越，支持大规模文档检索'
          },
          'GTE': {
            name: 'GTE',
            description: '阿里达摩院开发的通用文本嵌入模型，针对中文场景优化，在分类和检索任务中性能突出'
          },
          'Conan-embedding': {
            name: 'Conan-embedding',
            description: '面向代码理解和生成的专用嵌入模型，在代码搜索、相似度检测等任务中表现优异'
          },
          'xiaobu-embedding': {
            name: 'xiaobu-embedding',
            description: '小布助手团队开发的中文优化嵌入模型，在对话理解和意图识别等任务中表现出色'
          },
          'OpenAI-embedding': {
            name: 'OpenAI-embedding',
            description: 'OpenAI官方提供的文本嵌入模型，支持多语言文本向量化，广泛应用于RAG和语义搜索'
          },
          '自定义模型': {
            name: '自定义模型',
            description: '支持用户自定义的表征模型，可通过配置文件灵活集成各种预训练模型和微调模型'
          }
        };
        setModelArchitecture(defaultData);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <FrameworkIntroduction modelArchitecture={modelArchitecture} />
    </div>
  );
};

export default App;