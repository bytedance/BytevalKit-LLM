/**
 * 框架介绍主组件
 * 展示BytevalKit评测框架的核心功能和特性
 */
import React from 'react';
import { HeroSection } from './HeroSection';
import { FrameworkOverview } from './FrameworkOverview';
import { EmbeddingFramework } from './EmbeddingFramework';
import { LLMFramework } from './LLMFramework';
import { BenchmarkResults } from './BenchmarkResults';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Footer } from './Footer';

interface ModelInfo {
  name: string;
  description: string;
}

type ModelArchitecture = Record<string, ModelInfo>;

interface FrameworkIntroductionProps {
  modelArchitecture: ModelArchitecture;
}

export const FrameworkIntroduction: React.FC<FrameworkIntroductionProps> = ({ 
  modelArchitecture 
}) => {
  return (
    <div className="w-full">
      <HeroSection />
      <FrameworkOverview />
      <EmbeddingFramework modelArchitecture={modelArchitecture} />
      <LLMFramework />
      <BenchmarkResults />
      <ArchitectureDiagram />
      <Footer />
    </div>
  );
};