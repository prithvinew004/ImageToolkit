"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Download } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function ImageCropper() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);
  const [displayScale, setDisplayScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setResult("");
    const img = new Image();
    img.onload = () => {
      setImgEl(img);
      setCropX(0);
      setCropY(0);
      setCropW(Math.round(img.width / 2));
      setCropH(Math.round(img.height / 2));
    };
    img.src = dataUrl;
  }, []);

  useEffect(() => {
    if (imgRef.current && imgEl) {
      setDisplayScale(imgRef.current.clientWidth / imgEl.width);
    }
  }, [preview, imgEl]);

  const crop = useCallback(() => {
    if (!preview || !imgEl) return;
    const canvas = document.createElement("canvas");
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgEl, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    setResult(canvas.toDataURL("image/png"));
  }, [preview, imgEl, cropX, cropY, cropW, cropH]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `cropped-${cropW}x${cropH}.png`;
    a.click();
  }, [result, cropW, cropH]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Cropper</h2>
        <p className="text-gray-600 dark:text-gray-400">Crop images to your desired dimensions</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && imgEl && (
        <div className="space-y-6">
          {/* Crop Controls */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="text-sm text-gray-500 mb-3">Original: {imgEl.width} × {imgEl.height}px</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">X</label>
                <input type="number" value={cropX} min={0} max={imgEl.width - cropW}
                  onChange={(e) => { setCropX(Math.max(0, parseInt(e.target.value) || 0)); setResult(""); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Y</label>
                <input type="number" value={cropY} min={0} max={imgEl.height - cropH}
                  onChange={(e) => { setCropY(Math.max(0, parseInt(e.target.value) || 0)); setResult(""); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
                <input type="number" value={cropW} min={1} max={imgEl.width - cropX}
                  onChange={(e) => { setCropW(Math.max(1, parseInt(e.target.value) || 1)); setResult(""); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
                <input type="number" value={cropH} min={1} max={imgEl.height - cropY}
                  onChange={(e) => { setCropH(Math.max(1, parseInt(e.target.value) || 1)); setResult(""); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            {/* Aspect ratio presets */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[{ l: "1:1", r: 1 }, { l: "4:3", r: 4/3 }, { l: "16:9", r: 16/9 }, { l: "3:2", r: 3/2 }].map(({ l, r }) => (
                <button key={l} onClick={() => {
                  const w = Math.min(imgEl.width - cropX, imgEl.width);
                  const h = Math.round(w / r);
                  setCropW(w); setCropH(Math.min(h, imgEl.height - cropY)); setResult("");
                }} className="px-3 py-1 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition">{l}</button>
              ))}
            </div>
          </div>

          {/* Preview with crop overlay */}
          <div className="relative inline-block w-full">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preview</h3>
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
              <img ref={imgRef} src={preview} alt="Original" className="max-w-full max-h-96 mx-auto block" />
              {displayScale > 0 && (
                <div className="absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none" style={{
                  left: `${cropX * displayScale + 8}px`,
                  top: `${cropY * displayScale + 8}px`,
                  width: `${cropW * displayScale}px`,
                  height: `${cropH * displayScale}px`,
                }} />
              )}
            </div>
          </div>

          {result && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cropped Result</h3>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <img src={result} alt="Cropped" className="max-w-full max-h-64 mx-auto" />
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {!result && (
              <button onClick={crop} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">Crop Image</button>
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
