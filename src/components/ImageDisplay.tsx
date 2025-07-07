import React, { useState } from 'react';
import { Download, Maximize, Clock, Settings, Palette, Monitor, Share2, Heart } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  isLoading: boolean;
  error: string | null;
  onDownload: (image: GeneratedImage) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error, onDownload }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-blue-50/50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-blue-400/20 animate-pulse"></div>
            <div className="text-center relative z-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-gray-700 font-bold text-lg mb-2">Crafting Your Vision...</p>
              <p className="text-sm text-gray-500">AI is working its magic</p>
              <div className="mt-4 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-pink-50/30 to-orange-50/50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="aspect-square bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">!</span>
              </div>
              <p className="text-red-700 font-bold text-lg mb-3">Generation Failed</p>
              <p className="text-sm text-red-600 max-w-sm mx-auto leading-relaxed">{error}</p>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-blue-50/50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="aspect-square bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 via-purple-100/50 to-blue-100/50 animate-pulse"></div>
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-700 font-bold text-lg mb-2">Ready to Create</p>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                Describe your vision and watch AI bring it to life
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-violet-300 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-blue-50/50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Your Masterpiece</h3>
              <p className="text-sm text-gray-500">Generated with AI magic</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                }`}
                title="Like image"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleFullscreen}
                className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-violet-100 hover:text-violet-600 transition-all duration-300"
                title="View fullscreen"
              >
                <Maximize className="w-5 h-5" />
              </button>
              <button
                className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                title="Share image"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDownload(image)}
                className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                title="Download image"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-blue-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative">
              <img
                src={image.url}
                alt={image.prompt}
                className={`w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <Palette className="w-4 h-4 text-violet-500" />
              <span>Generation Details</span>
            </h4>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed font-medium">{image.prompt}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                <Settings className="w-4 h-4 text-violet-500" />
                <div>
                  <span className="text-xs text-gray-500 block">Style</span>
                  <span className="font-semibold text-gray-700 capitalize text-sm">{image.style}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                <Monitor className="w-4 h-4 text-purple-500" />
                <div>
                  <span className="text-xs text-gray-500 block">Dimensions</span>
                  <span className="font-semibold text-gray-700 text-sm">{image.size}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                <Palette className="w-4 h-4 text-blue-500" />
                <div>
                  <span className="text-xs text-gray-500 block">Quality</span>
                  <span className="font-semibold text-gray-700 capitalize text-sm">{image.quality}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                <Clock className="w-4 h-4 text-green-500" />
                <div>
                  <span className="text-xs text-gray-500 block">Created</span>
                  <span className="font-semibold text-gray-700 text-sm">{formatTimestamp(image.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all duration-300 z-10"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={image.url}
              alt={image.prompt}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDisplay;