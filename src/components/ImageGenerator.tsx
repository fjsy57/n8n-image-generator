import React, { useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import GenerationForm from './GenerationForm';
import ImageDisplay from './ImageDisplay';
import ImageGallery from './ImageGallery';
import { GenerationParams, GeneratedImage } from '../types';

const ImageGenerator = () => {
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async (params: GenerationParams) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, replace this URL with your n8n workflow webhook URL
      const webhookUrl = 'https://tasteless-ola-yatharthsanghvi-87194279.koyeb.app/webhook-test/generate-image';
      
      const queryParams = new URLSearchParams({
        message: params.message,
        style: params.style,
        size: params.size,
        quality: params.quality,
        model: params.model,
        seed: params.seed.toString(),
      });

      const response = await fetch(`${webhookUrl}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
        }
        throw new Error(`Failed to generate image: ${response.statusText}`);
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      const generatedImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: params.message,
        style: params.style,
        size: params.size,
        quality: params.quality,
        model: params.model,
        seed: params.seed,
        timestamp: new Date().toISOString(),
      };

      setCurrentImage(generatedImage);
      setImageHistory(prev => [generatedImage, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleImageSelect = useCallback((image: GeneratedImage) => {
    setCurrentImage(image);
  }, []);

  const handleDownload = useCallback(async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-image-${image.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-violet-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Create
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"> Amazing </span>
              AI Images
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Transform your wildest imagination into stunning visuals with our cutting-edge AI technology. 
              From photorealistic portraits to abstract art, bring any vision to life.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI Online</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium text-gray-700">⚡ Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium text-gray-700">🎨 Unlimited Creativity</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-16">
            <div className="xl:col-span-2">
              <GenerationForm
                onGenerate={generateImage}
                isLoading={isLoading}
                error={error}
              />
            </div>
            
            <div className="xl:col-span-3">
              <ImageDisplay
                image={currentImage}
                isLoading={isLoading}
                error={error}
                onDownload={handleDownload}
              />
            </div>
          </div>

          {imageHistory.length > 0 && (
            <div className="mt-16">
              <ImageGallery
                images={imageHistory}
                onImageSelect={handleImageSelect}
                onDownload={handleDownload}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ImageGenerator;