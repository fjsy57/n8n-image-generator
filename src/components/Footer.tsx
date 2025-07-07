import React from 'react';
import { Heart, Github, Twitter, Sparkles, Zap, Palette } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-purple-900/20 to-blue-900/20 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">AI Studio</h3>
                <p className="text-gray-400 text-sm">Powered by Advanced AI</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Unleash your creativity with our state-of-the-art AI image generation platform. 
              Create stunning visuals from simple text descriptions in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gray-800 text-gray-400 rounded-xl hover:bg-violet-600 hover:text-white transition-all duration-300 group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="p-3 bg-gray-800 text-gray-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-violet-400" />
              <span>Features</span>
            </h4>
            <ul className="space-y-3">
              {[
                'Multiple AI Models',
                'Style Presets',
                'Custom Dimensions',
                'Seed Control',
                'Ultra HD Quality',
                'Instant Generation'
              ].map((feature) => (
                <li key={feature} className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <span>Resources</span>
            </h4>
            <ul className="space-y-3">
              {[
                'Documentation',
                'API Reference',
                'Community',
                'Tutorials',
                'Support',
                'Contact'
              ].map((resource) => (
                <li key={resource} className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="flex items-center text-gray-400">
              Made with <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" /> by AI Studio Team
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            © 2025 AI Studio. All rights reserved. Powered by cutting-edge artificial intelligence.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;