/**
 * 首页英雄区域组件
 * 展示项目标题、描述和主要特性
 */
import React from 'react';
import { Github, Star, Download, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            ⚡️ BytevalKit
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            一站式AI模型评测框架集，支持表征模型和大语言模型的全方位高效评估
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              🔧 配置驱动
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              🚀 开箱即用
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              🔄 高度兼容
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
              📊 全面评测
            </span>
          </div>
        </div>

        {/* 调整为flex布局，让两个块在中间自适应展开 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
          <a 
            href="https://github.com/bytedance/BytevalKit-Emb"
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block w-full sm:w-80 flex-1"
          >
            <Github className="w-8 h-8 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">BytevalKit-Emb</h3>
          </a>
          <a 
            href="https://github.com/bytedance/BytevalKit-LLM"
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block w-full sm:w-80 flex-1"
          >
            <Github className="w-8 h-8 text-purple-600 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">BytevalKit-LLM</h3>
          </a>
        </div>
      </div>
    </section>
  );
};