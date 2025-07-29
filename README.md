# Mazu Landing Page

This is the landing page for Mazu - an offline AI disaster response assistant powered by Google's Gemma 3n model.

## Overview

Mazu is your guardian AI that works completely offline. Named after the Chinese goddess who protects people in danger, Mazu provides life-saving guidance during emergencies when networks fail.

## Features

- 🛡️ 100% offline operation - no internet required
- 🤖 Powered by Google Gemma 3n (2.3GB on-device AI)
- 🌍 Supports 100+ languages
- ⚡ <2 second response time
- 🔋 Battery efficient
- 📱 Works in airplane mode

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. Clone the repository
```bash
cd /path/to/gemma-3n/shipany
```

2. Install dependencies
```bash
pnpm install
```

3. Copy environment variables
```bash
cp .env.development .env.local
```

4. Run development server
```bash
pnpm dev
```

5. Open http://localhost:3000

## Customization

### Content
- Landing page content: `src/i18n/pages/landing/en.json`
- Theme colors: `src/app/theme.css`
- Images: `public/imgs/`

### Adding Video Demo
When the video is ready, update the `introduce` section in the landing page JSON to include the video component.

### Interactive Demo
The interactive demo section is configured in the `introduce` section. Update the scenarios and responses as needed.

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Build for Production
```bash
pnpm build
pnpm start
```

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Shadcn/UI
- TypeScript

## Credits

- Built for Google Gemma Developer Contest 2024
- Based on ShipAny template
- Powered by Google Gemma 3n model

## License

See LICENSE file in the main project repository.