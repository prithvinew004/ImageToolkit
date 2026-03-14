"use client";

import { Tool } from "@/data/tools";
import ImageConverter from "@/components/tools/ImageConverter";
import ImageToPdf from "@/components/tools/ImageToPdf";
import PdfToImage from "@/components/tools/PdfToImage";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageResizer from "@/components/tools/ImageResizer";
import ImageCropper from "@/components/tools/ImageCropper";
import ImageRotator from "@/components/tools/ImageRotator";
import ImageFlipper from "@/components/tools/ImageFlipper";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import AvatarGenerator from "@/components/tools/AvatarGenerator";
import PlaceholderGenerator from "@/components/tools/PlaceholderGenerator";
import GradientGenerator from "@/components/tools/GradientGenerator";
import MetadataViewer from "@/components/tools/MetadataViewer";
import ColorPicker from "@/components/tools/ColorPicker";
import Base64Converter from "@/components/tools/Base64Converter";

export default function ToolInterface({ tool }: { tool: Tool }) {
  switch (tool.slug) {
    // Image Conversion
    case "jpg-to-png":
      return <ImageConverter fromFormat="JPG" toFormat="PNG" mimeType="image/png" extension="png" />;
    case "png-to-jpg":
      return <ImageConverter fromFormat="PNG" toFormat="JPG" mimeType="image/jpeg" extension="jpg" />;
    case "webp-to-png":
      return <ImageConverter fromFormat="WEBP" toFormat="PNG" mimeType="image/png" extension="png" />;
    case "png-to-webp":
      return <ImageConverter fromFormat="PNG" toFormat="WEBP" mimeType="image/webp" extension="webp" />;
    case "jpg-to-webp":
      return <ImageConverter fromFormat="JPG" toFormat="WEBP" mimeType="image/webp" extension="webp" />;
    case "image-to-pdf":
      return <ImageToPdf />;
    case "pdf-to-image":
      return <PdfToImage />;

    // Image Compression
    case "image-compressor":
      return <ImageCompressor targetFormat="Image" />;
    case "jpeg-compressor":
      return <ImageCompressor targetFormat="JPEG" mimeType="image/jpeg" extension="jpg" />;
    case "png-compressor":
      return <ImageCompressor targetFormat="PNG" mimeType="image/png" extension="png" />;
    case "webp-compressor":
      return <ImageCompressor targetFormat="WEBP" mimeType="image/webp" extension="webp" />;

    // Image Editing
    case "image-resizer":
      return <ImageResizer />;
    case "image-cropper":
      return <ImageCropper />;
    case "image-rotator":
      return <ImageRotator />;
    case "image-flipper":
      return <ImageFlipper />;

    // Image Generators
    case "qr-code-generator":
      return <QrCodeGenerator />;
    case "avatar-generator":
      return <AvatarGenerator />;
    case "placeholder-generator":
      return <PlaceholderGenerator />;
    case "gradient-generator":
      return <GradientGenerator />;

    // Utilities
    case "metadata-viewer":
      return <MetadataViewer />;
    case "color-picker":
      return <ColorPicker />;
    case "base64-converter":
      return <Base64Converter />;

    default:
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Tool implementation coming soon.</p>
        </div>
      );
  }
}
