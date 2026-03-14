"use client";

import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface Props {
  targetFormat?: string;
  mimeType?: string;
  extension?: string;
}

export default function ImageCompressor({ targetFormat = "Image", mimeType, extension }: Props) {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [quality, setQuality] = useState(0.7);
  const [scale, setScale] = useState(100);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState("");

  const isPng = mimeType === "image/png" || (!mimeType && false);

  const handleFileSelect = useCallback((file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setOriginalSize(file.size);
    setFileName(file.name);
    setResult("");
  }, []);

  const compress = useCallback(() => {
    if (!preview) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const scaleFactor = scale / 100;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scaleFactor);
      canvas.height = Math.round(img.height * scaleFactor);
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Determine output format
      let outMime = mimeType || "image/jpeg";
      let outExt = extension || "jpg";
      if (!mimeType) {
        const lower = fileName.toLowerCase();
        if (lower.endsWith(".png")) { outMime = "image/png"; outExt = "png"; }
        else if (lower.endsWith(".webp")) { outMime = "image/webp"; outExt = "webp"; }
      }

      let dataUrl: string;
      if (outMime === "image/png") {
        // PNG: reduce colors by quantizing pixel data for compression
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        // Quantize: reduce color precision based on quality (lower quality = fewer colors)
        const levels = Math.max(2, Math.round(quality * 256));
        const step = 256 / levels;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.round(Math.round(data[i] / step) * step);
          data[i + 1] = Math.round(Math.round(data[i + 1] / step) * step);
          data[i + 2] = Math.round(Math.round(data[i + 2] / step) * step);
        }
        ctx.putImageData(imageData, 0, 0);
        dataUrl = canvas.toDataURL("image/png");
      } else {
        dataUrl = canvas.toDataURL(outMime, quality);
      }

      setResult(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setCompressedSize(Math.round((base64.length * 3) / 4));
      setProcessing(false);
    };
    img.src = preview;
  }, [preview, quality, scale, mimeType, extension, fileName]);

  const download = useCallback(() => {
    if (!result) return;
    const ext = extension || (fileName.split(".").pop() || "jpg");
    const a = document.createElement("a");
    a.href = result;
    a.download = `compressed.${ext}`;
    a.click();
  }, [result, extension, fileName]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const savings = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{targetFormat} Compressor</h2>
        <p className="text-gray-600 dark:text-gray-400">Compress your images while maintaining quality</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range" min="0.1" max="1" step="0.05" value={quality}
                onChange={(e) => { setQuality(parseFloat(e.target.value)); setResult(""); }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Smaller file</span><span>Higher quality</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                Scale: {scale}%
              </label>
              <input
                type="range" min="10" max="100" step="5" value={scale}
                onChange={(e) => { setScale(parseInt(e.target.value)); setResult(""); }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Smaller dimensions</span><span>Original size</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original</h3>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <img src={preview} alt="Original" className="max-w-full max-h-64 mx-auto" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Size: {formatBytes(originalSize)}</p>
            </div>
            {result && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Compressed</h3>
                <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                  <img src={result} alt="Compressed" className="max-w-full max-h-64 mx-auto" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Size: {formatBytes(compressedSize)}
                  {savings > 0 && <span className="text-green-600 ml-2">(-{savings}%)</span>}
                  {savings < 0 && <span className="text-red-500 ml-2">(+{Math.abs(savings)}%)</span>}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            {!result && (
              <button onClick={compress} disabled={processing} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50">
                {processing ? "Compressing..." : "Compress Image"}
              </button>
            )}
            {result && (
              <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
                <Download className="w-5 h-5 mr-2" /> Download
              </button>
            )}
            <button onClick={() => { setPreview(""); setResult(""); setScale(100); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
