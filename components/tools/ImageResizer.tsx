"use client";

import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function ImageResizer() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setResult("");
    const img = new Image();
    img.onload = () => {
      setOrigW(img.width);
      setOrigH(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = dataUrl;
  }, []);

  const updateWidth = (w: number) => {
    setWidth(w);
    if (lockAspect && origW > 0) setHeight(Math.round((w / origW) * origH));
    setResult("");
  };

  const updateHeight = (h: number) => {
    setHeight(h);
    if (lockAspect && origH > 0) setWidth(Math.round((h / origH) * origW));
    setResult("");
  };

  const resize = useCallback(() => {
    if (!preview || width <= 0 || height <= 0) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      setResult(canvas.toDataURL("image/png"));
      setProcessing(false);
    };
    img.src = preview;
  }, [preview, width, height]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `resized-${width}x${height}.png`;
    a.click();
  }, [result, width, height]);

  const presets = [
    { label: "HD", w: 1280, h: 720 },
    { label: "Full HD", w: 1920, h: 1080 },
    { label: "4K", w: 3840, h: 2160 },
    { label: "Instagram", w: 1080, h: 1080 },
    { label: "Twitter", w: 1200, h: 675 },
    { label: "Thumbnail", w: 150, h: 150 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Resizer</h2>
        <p className="text-gray-600 dark:text-gray-400">Resize images to any dimension</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
            <div className="text-sm text-gray-500 mb-2">Original: {origW} × {origH}px</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width (px)</label>
                <input type="number" value={width} onChange={(e) => updateWidth(parseInt(e.target.value) || 0)} min={1}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (px)</label>
                <input type="number" value={height} onChange={(e) => updateHeight(parseInt(e.target.value) || 0)} min={1}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Lock aspect ratio</span>
              </label>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button key={p.label} onClick={() => { setWidth(p.w); setHeight(p.h); setLockAspect(false); setResult(""); }}
                    className="px-3 py-1 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition">
                    {p.label} ({p.w}×{p.h})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original</h3>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <img src={preview} alt="Original" className="max-w-full max-h-64 mx-auto" />
              </div>
            </div>
            {result && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resized ({width}×{height})</h3>
                <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                  <img src={result} alt="Resized" className="max-w-full max-h-64 mx-auto" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            {!result && (
              <button onClick={resize} disabled={processing} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50">
                {processing ? "Resizing..." : "Resize Image"}
              </button>
            )}
            {result && (
              <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
                <Download className="w-5 h-5 mr-2" /> Download
              </button>
            )}
            <button onClick={() => { setPreview(""); setResult(""); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
