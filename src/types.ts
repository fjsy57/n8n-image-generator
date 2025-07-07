export interface GenerationParams {
  message: string;
  style: string;
  size: string;
  quality: string;
  model: string;
  seed: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  size: string;
  quality: string;
  model: string;
  seed: number;
  timestamp: string;
}

export interface StyleOption {
  value: string;
  label: string;
  description: string;
}

export interface QualityOption {
  value: string;
  label: string;
  description: string;
}

export interface ModelOption {
  value: string;
  label: string;
  description: string;
}