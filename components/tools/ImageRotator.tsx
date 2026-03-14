"use client";

import { useState, useCallback } from "react";
import { Download, RotateCw, RotateCcw } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function ImageRotator() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [angle, setAngle] = useState(0);

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setResult("");
    setAngle(0);
  }, []);

  const rotate = useCallback((newAngle: number) => {
    if (!preview) return;
    setAngle(newAngle);
    const img = new Image();
    img.onload = () => {
      const rad = (newAngle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * cos + img.height * sin);
      canvas.height = Math.round(img.width * sin + img.height * cos);
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = preview;
  }, [preview]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `rotated-${angle}deg.png`;
    a.click();
  }, [result, angle]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Rotator</h2>
        <p className="text-gray-600 dark:text-gray-400">Rotate images by any angle</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
            <div>
              <label className="block font-semibold text-gray-900 dark:text-white mb-2">Rotation: {angle}°</label>
              <input type="range" min="0" max="360" step="1" value={angle}
                onChange={(e) => rotate(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => rotate(90)} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition flex items-center">
                <RotateCw className="w-4 h-4 mr-1" /> 90°
              </button>
              <button onClick={() => rotate(180)} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition flex items-center">
                <RotateCw className="w-4 h-4 mr-1" /> 180°
              </button>
              <button onClick={() => rotate(270)} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition flex items-center">
                <RotateCcw className="w-4 h-4 mr-1" /> 270°
              </button>
              <input type="number" value={angle} min={0} max={360}
                onChange={(e) => rotate(parseInt(e.target.value) || 0)}
                className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
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
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rotated ({angle}°)</h3>
                <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                  <img src={result} alt="Rotated" className="max-w-full max-h-64 mx-auto" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            {result && (
              <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
                <Download className="w-5 h-5 mr-2" /> Download
              </button>
            )}
            <button onClick={() => { setPreview(""); setResult(""); setAngle(0); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
