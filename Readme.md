# 🎨 AI Image Generator API

> **Production-ready AI image generation API built with n8n, featuring advanced rate limiting, content filtering, and multiple AI providers**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-workflow-FF6B6B.svg)](https://n8n.io/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![API](https://img.shields.io/badge/API-REST-green.svg)](https://restfulapi.net/)
[![AI](https://img.shields.io/badge/AI-Flux%20%7C%20Turbo-purple.svg)](https://pollinations.ai/)

## 🚀 Features

- **🤖 Multiple AI Models**: Flux, Turbo, and fallback providers for maximum reliability
- **🛡️ Advanced Security**: Content filtering, rate limiting, and input validation
- **⚡ High Performance**: 45-second timeout with intelligent fallback system
- **🎯 Customizable Styles**: 7+ built-in styles (photorealistic, artistic, cartoon, cyberpunk, etc.)
- **📱 React Frontend**: Beautiful, responsive web interface included
- **🔧 Production Ready**: Enterprise-grade error handling and monitoring
- **🎛️ Flexible API**: Support for custom dimensions, seeds, quality levels
- **🚦 Rate Limiting**: 10 requests per minute per IP with automatic cleanup

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Quick Start

### 1. Import n8n Workflow
```bash
# Import the workflow JSON into your n8n instance
# File: image_generate_3.json
```

### 2. Set Up Frontend
```bash
# Navigate to the React app directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 3. Test the API
```bash
curl -X POST "https://your-n8n-instance.com/webhook/generate-image" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "A beautiful sunset over mountains",
    "style": "photorealistic",
    "size": "1024x1024",
    "quality": "high"
  }'
```

## 🔧 Installation

### Prerequisites
- n8n instance (cloud or self-hosted)
- Node.js 16+ (for React frontend)
- Domain with SSL certificate (recommended)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-image-generator.git
   cd ai-image-generator
   ```

2. **Import n8n Workflow**
   - Open your n8n instance
   - Go to Workflows → Import from File
   - Select `image_generate_3.json`
   - Activate the workflow

3. **Configure Webhook**
   - Copy the webhook URL from n8n
   - Update the endpoint in your frontend configuration

4. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

5. **Configure Environment Variables**
   ```bash
   # Create .env file in frontend directory
   REACT_APP_API_URL=https://your-n8n-webhook-url.com
   REACT_APP_API_KEY=your-api-key-if-needed
   ```

## 📖 API Documentation

### Endpoint
```
POST /webhook/generate-image
```

### Request Body
```json
{
  "message": "Your image description",
  "style": "photorealistic",
  "size": "1024x1024",
  "quality": "high",
  "seed": 123456,
  "model": "flux"
}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | string | **required** | Image description (3-500 characters) |
| `style` | string | `photorealistic` | Style preset (see styles below) |
| `size` | string | `1024x1024` | Image dimensions (256x256 to 2048x2048) |
| `quality` | string | `high` | Quality level: `low`, `medium`, `high` |
| `seed` | number | random | Seed for reproducible results |
| `model` | string | `flux` | AI model: `flux`, `turbo` by pollinations.ai |

### Available Styles

| Style | Description |
|-------|-------------|
| `photorealistic` | High-quality, photo-like images |
| `artistic` | Oil painting, masterpiece style |
| `cartoon` | Animated, Disney-like illustrations |
| `cyberpunk` | Futuristic, neon-lit sci-fi |
| `fantasy` | Magical, mystical artwork |
| `minimalist` | Clean, simple, modern design |
| `vintage` | Retro, classic, aged aesthetic |

### Response

**Success (200)**
```
Content-Type: image/png
[Binary image data]
```

**Error (400/429)**
```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "code": "ERROR_CODE"
}
```

### Rate Limiting
- **Limit**: 10 requests per minute per IP
- **Window**: 60 seconds
- **Response**: 429 Too Many Requests

## 🎨 Frontend Setup

The included React frontend provides a beautiful, user-friendly interface for your image generation API.

### Features
- **Responsive Design**: Works on all devices
- **Real-time Preview**: See parameters as you adjust them
- **Gallery View**: Browse generated images
- **Download Support**: Save images locally
- **Style Presets**: Quick style selection
- **Advanced Options**: Seed, model, quality controls

### Customization
```javascript
// src/config.js
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 45000,
  retries: 3
};

export const STYLES = {
  photorealistic: 'Photorealistic',
  artistic: 'Artistic',
  cartoon: 'Cartoon',
  // Add custom styles
};
```

## ⚙️ Configuration

### n8n Workflow Settings

1. **Rate Limiting**
   ```javascript
   const maxRequestsPerWindow = 10; // Adjust as needed
   const rateLimitWindow = 60000; // 1 minute
   ```

2. **Content Filtering**
   ```javascript
   const inappropriateTerms = ['nude', 'naked', 'nsfw', 'explicit'];
   // Add custom terms to filter
   ```

3. **API Providers**
   ```javascript
   const apiConfigs = [
     {
       name: 'Pollinations AI - Flux',
       url: `https://image.pollinations.ai/prompt/${prompt}?model=flux`,
       priority: 1
     }
     // Add custom providers
   ];
   ```

### Environment Variables

Create a `.env` file in your project root:
```env
# n8n Configuration
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/generate-image
```

## 🚀 Deployment

### n8n Workflow
1. **Cloud Deployment**
   - Use n8n Cloud for easiest setup
   - Configure webhook URL in your domain

### React Frontend

1. **Netlify/Vercel**
   ```bash
   # Build for production
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod --dir=build
   ```

2. **Traditional Hosting**
   ```bash
   npm run build
   # Upload build/ folder to your web server
   ```

## 🔍 Monitoring & Analytics

### Built-in Monitoring
- Request counting and rate limiting
- Error tracking and logging
- Performance metrics
- Content filter statistics

## 🛠️ Advanced Features

### Custom AI Providers
Add your own AI image generation APIs:
```javascript
const customProvider = {
  name: 'Custom AI Provider',
  url: 'https://your-api.com/generate',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  },
  transform: (prompt, options) => ({
    prompt: prompt,
    style: options.style,
    dimensions: options.size
  })
};
```

### Webhooks Integration
Set up webhooks for various events:
```javascript
const webhookEvents = {
  'image.generated': 'https://your-app.com/webhook/image-generated',
  'rate.limit.exceeded': 'https://your-app.com/webhook/rate-limit',
  'content.filtered': 'https://your-app.com/webhook/content-filtered'
};
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Fork the repository
git clone https://github.com/yourusername/ai-image-generator.git
cd ai-image-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

### Contribution Areas
- 🐛 Bug fixes and improvements
- 🚀 New AI provider integrations
- 🎨 Frontend enhancements
- 📚 Documentation improvements
- 🧪 Test coverage expansion

## 📈 Roadmap

- [ ] **v2.0**: Multi-model support (DALL-E, Midjourney)
- [ ] **v2.1**: Batch processing capabilities
- [ ] **v2.2**: Advanced content filtering with AI
- [ ] **v2.3**: User authentication and quotas
- [ ] **v2.4**: Image editing and variations
- [ ] **v2.5**: Mobile app (React Native)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **n8n Team**: For the amazing automation platform
- **Pollinations AI**: For providing free AI image generation
- **React Community**: For the excellent frontend framework
- **Contributors**: Everyone who has contributed to this project

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/ai-image-generator/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-image-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-image-generator/discussions)
- **Email**: support@your-domain.com

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yatharthsanghvi/n8n-image-generator&type=Date)](https://star-history.com/#yatharthsanghvi/n8n-image-generator&Date)

---

<div align="center">
  <strong>Made with ❤️ by Yatharth</strong>
  <br>
  <br>
  <a href="https://github.com/yatharthsanghvi/n8n-image-generator/stargazers">⭐ Star this repo if you found it helpful!</a>
</div>
