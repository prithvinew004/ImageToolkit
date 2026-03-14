"use client";

import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface Props {
  fromFormat: string;
  toFormat: string;
  mimeType: string;
  extension: string;
}

export default function ImageConverter({ fromFormat, toFormat, mimeType, extension }: Props) {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [processing, setProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [convertedSize, setConvertedSize] = useState(0);

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setOriginalSize(_file.size);
    setResult("");
  }, []);

  const convert = useCallback(() => {
    if (!preview) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const quality = mimeType === "image/png" ? undefined : 0.92;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setResult(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setConvertedSize(Math.round((base64.length * 3) / 4));
      setProcessing(false);
    };
    img.src = preview;
  }, [preview, mimeType]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `converted.${extension}`;
    a.click();
  }, [result, extension]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Convert {fromFormat} to {toFormat}</h2>
        <p className="text-gray-600 dark:text-gray-400">Upload a {fromFormat} image to convert it to {toFormat} format</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original ({fromFormat})</h3>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <img src={preview} alt="Original" className="max-w-full max-h-64 mx-auto" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Size: {formatBytes(originalSize)}</p>
            </div>
            {result && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Converted ({toFormat})</h3>
                <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                  <img src={result} alt="Converted" className="max-w-full max-h-64 mx-auto" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Size: {formatBytes(convertedSize)}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            {!result && (
              <button onClick={convert} disabled={processing} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50">
                {processing ? "Converting..." : `Convert to ${toFormat}`}
              </button>
            )}
            {result && (
              <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
                <Download className="w-5 h-5 mr-2" /> Download {toFormat}
              </button>
            )}
            <button onClick={() => { setPreview(""); setResult(""); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
