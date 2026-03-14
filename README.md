# ImageToolkit

A modern image utility toolkit website built with Next.js 14 (App Router) and Tailwind CSS.

## Features

- 🎨 Modern UI with glassmorphism design
- 🌓 Dark/Light mode support
- 📱 Fully responsive mobile layout
- 🔍 Tool search functionality
- ⚡ Fast and optimized
- 🔒 Privacy-focused (client-side processing)
- 🎯 SEO optimized

## Categories

- **Image Conversion** - Convert between JPG, PNG, WEBP, PDF formats
- **Image Compression** - Compress images efficiently
- **Image Editing** - Resize, crop, rotate, and flip images
- **Image Generators** - Generate QR codes, avatars, placeholders, gradients
- **Utilities** - Metadata viewer, color picker, Base64 converter

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
imagetoolkit/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── tools/
│   │   └── [slug]/         # Dynamic tool pages
│   └── category/
│       └── [slug]/         # Dynamic category pages
├── components/
│   ├── Navbar.tsx          # Navigation with dark mode toggle
│   ├── Footer.tsx          # Footer component
│   ├── ToolCard.tsx        # Tool card with glassmorphism
│   ├── CategoryCard.tsx    # Category card
│   ├── ToolGrid.tsx        # Grid layout for tools
│   ├── ToolLayout.tsx      # Layout for tool pages
│   ├── SearchBar.tsx       # Search functionality
│   └── ThemeProvider.tsx   # Dark/light mode provider
├── data/
│   └── tools.ts            # Tools and categories data
└── lib/
    └── seo.ts              # SEO utilities
```

## Tools Included

### Image Conversion (7 tools)
- JPG to PNG, PNG to JPG
- WEBP conversions
- Image to PDF, PDF to Image

### Image Compression (4 tools)
- Universal Image Compressor
- Format-specific compressors

### Image Editing (4 tools)
- Resizer, Cropper, Rotator, Flipper

### Image Generators (4 tools)
- QR Code, Avatar, Placeholder, Gradient

### Utilities (3 tools)
- Metadata Viewer, Color Picker, Base64 Converter

## Customization

### Adding New Tools

Edit `data/tools.ts`:

```typescript
{
  id: "23",
  name: "New Tool",
  description: "Tool description",
  category: "conversion",
  icon: "Image",
  slug: "new-tool",
  popular: false
}
```

### Adding New Categories

Edit `data/tools.ts`:

```typescript
{
  id: "new-category",
  name: "New Category",
  description: "Category description",
  icon: "Folder",
  slug: "new-category"
}
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## SEO

Each tool and category page includes:
- Dynamic metadata
- Open Graph tags
- Twitter Card tags
- Optimized descriptions and keywords

## Ad Integration

Ad placeholders are included on:
- Homepage (between sections)
- Tool pages (below tool interface)
- Category pages (below header)

Replace placeholders with actual ad code (Google AdSense, etc.)

## License

MIT
