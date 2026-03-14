export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  slug: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

export const categories: Category[] = [
  {
    id: "conversion",
    name: "Image Conversion",
    description: "Convert images between different formats",
    icon: "RefreshCw",
    slug: "image-conversion",
  },
  {
    id: "compression",
    name: "Image Compression",
    description: "Compress images to reduce file size",
    icon: "Minimize2",
    slug: "image-compression",
  },
  {
    id: "editing",
    name: "Image Editing",
    description: "Edit and transform your images",
    icon: "Edit3",
    slug: "image-editing",
  },
  {
    id: "generators",
    name: "Image Generators",
    description: "Generate images and graphics",
    icon: "Sparkles",
    slug: "image-generators",
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Useful image utility tools",
    icon: "Wrench",
    slug: "utilities",
  },
];

export const tools: Tool[] = [
  // Image Conversion
  { id: "1", name: "JPG to PNG", description: "Convert JPG images to PNG format", category: "conversion", icon: "Image", slug: "jpg-to-png", popular: true },
  { id: "2", name: "PNG to JPG", description: "Convert PNG images to JPG format", category: "conversion", icon: "Image", slug: "png-to-jpg", popular: true },
  { id: "3", name: "WEBP to PNG", description: "Convert WEBP images to PNG format", category: "conversion", icon: "Image", slug: "webp-to-png" },
  { id: "4", name: "PNG to WEBP", description: "Convert PNG images to WEBP format", category: "conversion", icon: "Image", slug: "png-to-webp" },
  { id: "5", name: "JPG to WEBP", description: "Convert JPG images to WEBP format", category: "conversion", icon: "Image", slug: "jpg-to-webp" },
  { id: "6", name: "Image to PDF", description: "Convert images to PDF documents", category: "conversion", icon: "FileText", slug: "image-to-pdf" },
  { id: "7", name: "PDF to Image", description: "Convert PDF pages to images", category: "conversion", icon: "FileImage", slug: "pdf-to-image" },
  
  // Image Compression
  { id: "8", name: "Image Compressor", description: "Compress images without losing quality", category: "compression", icon: "Minimize2", slug: "image-compressor", popular: true },
  { id: "9", name: "JPEG Compressor", description: "Compress JPEG images efficiently", category: "compression", icon: "Minimize2", slug: "jpeg-compressor" },
  { id: "10", name: "PNG Compressor", description: "Compress PNG images efficiently", category: "compression", icon: "Minimize2", slug: "png-compressor" },
  { id: "11", name: "WEBP Compressor", description: "Compress WEBP images efficiently", category: "compression", icon: "Minimize2", slug: "webp-compressor" },
  
  // Image Editing
  { id: "12", name: "Image Resizer", description: "Resize images to any dimension", category: "editing", icon: "Maximize2", slug: "image-resizer", popular: true },
  { id: "13", name: "Image Cropper", description: "Crop images to desired size", category: "editing", icon: "Crop", slug: "image-cropper" },
  { id: "14", name: "Image Rotator", description: "Rotate images by any angle", category: "editing", icon: "RotateCw", slug: "image-rotator" },
  { id: "15", name: "Image Flipper", description: "Flip images horizontally or vertically", category: "editing", icon: "FlipHorizontal", slug: "image-flipper" },
  
  // Image Generators
  { id: "16", name: "QR Code Generator", description: "Generate QR codes instantly", category: "generators", icon: "QrCode", slug: "qr-code-generator", popular: true },
  { id: "17", name: "Avatar Generator", description: "Generate custom avatars", category: "generators", icon: "User", slug: "avatar-generator" },
  { id: "18", name: "Placeholder Image Generator", description: "Generate placeholder images", category: "generators", icon: "ImagePlus", slug: "placeholder-generator" },
  { id: "19", name: "Gradient Generator", description: "Create beautiful gradients", category: "generators", icon: "Palette", slug: "gradient-generator" },
  
  // Utilities
  { id: "20", name: "Image Metadata Viewer", description: "View image metadata and EXIF data", category: "utilities", icon: "Info", slug: "metadata-viewer" },
  { id: "21", name: "Image Color Picker", description: "Pick colors from images", category: "utilities", icon: "Pipette", slug: "color-picker", popular: true },
  { id: "22", name: "Image Base64 Converter", description: "Convert images to Base64 encoding", category: "utilities", icon: "Code", slug: "base64-converter" },
];

export const getToolBySlug = (slug: string) => tools.find(tool => tool.slug === slug);
export const getToolsByCategory = (categorySlug: string) => {
  const category = categories.find(cat => cat.slug === categorySlug);
  return category ? tools.filter(tool => tool.category === category.id) : [];
};
export const getPopularTools = () => tools.filter(tool => tool.popular);
export const getCategoryById = (id: string) => categories.find(cat => cat.id === id);
