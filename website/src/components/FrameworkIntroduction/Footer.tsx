/**
 * 页脚组件
 * 包含联系信息和快速链接
 */
import React from 'react';
import { Github, Mail, Book, Users, Heart, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'BytevalKit-Emb', url: 'https://github.com/bytedance/BytevalKit-Emb', icon: Github },
    { name: 'BytevalKit-LLM', url: 'https://github.com/bytedance/BytevalKit-LLM', icon: Github },
    { name: '文档中心', url: '#', icon: Book },
    { name: '社区讨论', url: '#', icon: Users }
  ];

  const team = [
    'BytevalKit团队', '抖音应用算法团队', 'IES评测QA团队'
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ⚡️ BytevalKit
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              一站式AI模型评测框架集，为研究人员和工程师提供专业、高效、易用的模型评估框架。
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:BytevalKit@bytedance.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>联系我们</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">快速链接</h4>
            <div className="space-y-4">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">开发团队</h4>
            <div className="space-y-3">
              {team.map((teamName, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{teamName}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">如果您觉得项目有帮助</p>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">请给我们点个Star ⭐</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 BytevalKit. Licensed under Apache License 2.0
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">感谢开源社区的支持</span>
              <div className="flex space-x-2">
                <span className="text-sm px-3 py-1 bg-green-600 rounded-full">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
