import React, { useState } from 'react';
import { Download, Calendar, Settings, Palette, Monitor, Eye, Heart, Share2 } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onImageSelect: (image: GeneratedImage) => void;
  onDownload: (image: GeneratedImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageSelect, onDownload }) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image);
    onImageSelect(image);
  };

  const toggleLike = (imageId: string) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const truncatePrompt = (prompt: string, maxLength: number = 60) => {
    if (prompt.length <= maxLength) return prompt;
    return prompt.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-blue-50/50 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your Gallery</h3>
            <p className="text-sm text-gray-500">Collection of AI masterpieces</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full">
              <span className="text-sm font-semibold text-violet-700">
                {images.length} {images.length === 1 ? 'Image' : 'Images'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className={`group relative bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedImage?.id === image.id ? 'ring-2 ring-violet-500 shadow-xl scale-105' : ''
              }`}
              onClick={() => handleImageClick(image)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                      className={`p-3 backdrop-blur-sm rounded-2xl transition-all duration-300 ${
                        likedImages.has(image.id)
                          ? 'bg-pink-500/80 text-white'
                          : 'bg-white/20 text-white hover:bg-pink-500/80'
                      }`}
                      title="Like image"
                    >
                      <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageSelect(image);
                      }}
                      className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-violet-500/80 transition-all duration-300"
                      title="View image"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-blue-500/80 transition-all duration-300"
                      title="Share image"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload(image);
                      }}
                      className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-green-500/80 transition-all duration-300"
                      title="Download image"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {likedImages.has(image.id) && (
                  <div className="absolute top-3 right-3">
                    <div className="p-2 bg-pink-500 rounded-full shadow-lg">
                      <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-900 font-semibold mb-3 line-clamp-2 leading-relaxed">
                  {truncatePrompt(image.prompt)}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">{formatTimestamp(image.timestamp)}</span>
                  </div>
                  <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold capitalize">
                    {image.style}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-xl">
                    <Settings className="w-3 h-3 text-violet-500" />
                    <span className="text-xs text-gray-600 font-medium">{image.model}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-xl">
                    <Monitor className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-gray-600 font-medium">{image.size}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-xl">
                    <Palette className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-600 font-medium capitalize">{image.quality}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Palette className="w-12 h-12 text-violet-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">0</span>
              </div>
            </div>
            <p className="text-gray-700 font-bold text-xl mb-2">No Masterpieces Yet</p>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Start creating amazing AI-generated images and they'll appear here in your personal gallery
            </p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-violet-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;