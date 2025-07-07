import React from 'react';
import { Sparkles, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Studio
              </h1>
              <p className="text-sm text-gray-500 font-medium">Powered by Advanced AI</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#generate" className="text-gray-600 hover:text-violet-600 transition-all duration-300 font-medium relative group">
              Generate
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#gallery" className="text-gray-600 hover:text-violet-600 transition-all duration-300 font-medium relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="text-gray-600 hover:text-violet-600 transition-all duration-300 font-medium relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <div className="w-px h-6 bg-gray-200"></div>
            <button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Pro
            </button>
          </nav>
          <button className="md:hidden p-2 text-gray-600 hover:text-violet-600 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;