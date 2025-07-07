import React, { useState, useCallback } from 'react';
import { Wand2, Shuffle, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { GenerationParams, StyleOption, QualityOption, ModelOption } from '../types';

const STYLE_OPTIONS: StyleOption[] = [
  { value: 'photorealistic', label: 'Photorealistic', description: 'Ultra-realistic photography' },
  { value: 'artistic', label: 'Artistic', description: 'Oil painting masterpiece' },
  { value: 'cartoon', label: 'Cartoon', description: 'Animated Disney-style' },
  { value: 'cyberpunk', label: 'Cyberpunk', description: 'Futuristic neon aesthetic' },
  { value: 'fantasy', label: 'Fantasy', description: 'Magical mystical artwork' },
  { value: 'minimalist', label: 'Minimalist', description: 'Clean modern design' },
  { value: 'vintage', label: 'Vintage', description: 'Retro nostalgic style' },
];

const QUALITY_OPTIONS: QualityOption[] = [
  { value: 'high', label: 'Ultra HD', description: 'Maximum quality & detail' },
  { value: 'medium', label: 'High Quality', description: 'Balanced performance' },
  { value: 'low', label: 'Standard', description: 'Fast generation' },
];

const MODEL_OPTIONS: ModelOption[] = [
  { value: 'flux', label: 'Flux Pro', description: 'Latest premium model' },
  { value: 'turbo', label: 'Turbo', description: 'Lightning fast results' },
  { value: 'default', label: 'Classic', description: 'Reliable & consistent' },
];

const SIZE_OPTIONS = [
  { value: '512x512', label: '512×512', description: 'Square' },
  { value: '768x768', label: '768×768', description: 'Square HD' },
  { value: '1024x1024', label: '1024×1024', description: 'Square Ultra' },
  { value: '1024x768', label: '1024×768', description: 'Landscape' },
  { value: '768x1024', label: '768×1024', description: 'Portrait' },
  { value: '1536x1024', label: '1536×1024', description: 'Cinematic' },
];

interface GenerationFormProps {
  onGenerate: (params: GenerationParams) => void;
  isLoading: boolean;
  error: string | null;
}

const GenerationForm: React.FC<GenerationFormProps> = ({ onGenerate, isLoading, error }) => {
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState<string>('photorealistic');
  const [size, setSize] = useState<string>('1024x1024');
  const [quality, setQuality] = useState<string>('high');
  const [model, setModel] = useState<string>('flux');
  const [seed, setSeed] = useState<number>(Math.floor(Math.random() * 1000000));
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onGenerate({
        message: message.trim(),
        style,
        size,
        quality,
        model,
        seed,
      });
    }
  }, [message, style, size, quality, model, seed, isLoading, onGenerate]);

  const generateRandomSeed = useCallback(() => {
    setSeed(Math.floor(Math.random() * 1000000));
  }, []);

  const isFormValid = message.trim().length >= 3 && message.trim().length <= 500;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-blue-50/50 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Create Magic</h3>
            <p className="text-sm text-gray-500">Describe your vision</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              Your Creative Vision
            </label>
            <div className="relative">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A majestic dragon soaring through a starlit sky with aurora borealis dancing in the background..."
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white/70 backdrop-blur-sm"
                rows={4}
                maxLength={500}
                required
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-gray-400 font-medium">{message.length}/500</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Minimum 3 characters</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Art Style</label>
            <div className="grid grid-cols-1 gap-3">
              {STYLE_OPTIONS.map((option) => (
                <label key={option.value} className={`group flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                  style === option.value 
                    ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg' 
                    : 'border-gray-200 hover:border-violet-300 bg-white/50'
                }`}>
                  <input
                    type="radio"
                    name="style"
                    value={option.value}
                    checked={style === option.value}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-5 h-5 text-violet-600 focus:ring-violet-500 focus:ring-2"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                  </div>
                  {style === option.value && (
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Dimensions</label>
            <div className="grid grid-cols-2 gap-3">
              {SIZE_OPTIONS.map((option) => (
                <label key={option.value} className={`group flex items-center space-x-3 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                  size === option.value 
                    ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg' 
                    : 'border-gray-200 hover:border-violet-300 bg-white/50'
                }`}>
                  <input
                    type="radio"
                    name="size"
                    value={option.value}
                    checked={size === option.value}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-violet-600 transition-colors font-medium group"
            >
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>Advanced Settings</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showAdvanced && (
            <div className="space-y-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">Quality Level</label>
                <div className="space-y-3">
                  {QUALITY_OPTIONS.map((option) => (
                    <label key={option.value} className={`group flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                      quality === option.value 
                        ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg' 
                        : 'border-gray-200 hover:border-violet-300 bg-white/50'
                    }`}>
                      <input
                        type="radio"
                        name="quality"
                        value={option.value}
                        checked={quality === option.value}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-5 h-5 text-violet-600 focus:ring-violet-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">AI Model</label>
                <div className="space-y-3">
                  {MODEL_OPTIONS.map((option) => (
                    <label key={option.value} className={`group flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                      model === option.value 
                        ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg' 
                        : 'border-gray-200 hover:border-violet-300 bg-white/50'
                    }`}>
                      <input
                        type="radio"
                        name="model"
                        value={option.value}
                        checked={model === option.value}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-5 h-5 text-violet-600 focus:ring-violet-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="seed" className="block text-sm font-semibold text-gray-700">
                  Seed Value
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    id="seed"
                    value={seed}
                    onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-white/70"
                    min={0}
                    max={999999}
                  />
                  <button
                    type="button"
                    onClick={generateRandomSeed}
                    className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl hover:from-violet-100 hover:to-purple-100 hover:text-violet-700 transition-all duration-300 group"
                  >
                    <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">Use the same seed to reproduce results</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl animate-in slide-in-from-top duration-300">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Magic...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Masterpiece</span>
                </div>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerationForm;