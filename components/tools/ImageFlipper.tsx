"use client";

import { useState, useCallback } from "react";
import { Download, FlipHorizontal, FlipVertical } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function ImageFlipper() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setResult("");
  }, []);

  const flip = useCallback((dir: "horizontal" | "vertical") => {
    if (!preview) return;
    setDirection(dir);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (dir === "horizontal") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img, 0, 0);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = preview;
  }, [preview]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `flipped-${direction}.png`;
    a.click();
  }, [result, direction]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Flipper</h2>
        <p className="text-gray-600 dark:text-gray-400">Flip images horizontally or vertically</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <label className="block font-semibold text-gray-900 dark:text-white mb-3">Flip Direction</label>
            <div className="flex gap-4">
              <button onClick={() => flip("horizontal")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 transition font-semibold ${direction === "horizontal" && result ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "border-gray-300 dark:border-gray-600 hover:border-blue-500"}`}>
                <FlipHorizontal className="w-5 h-5" /> Horizontal
              </button>
              <button onClick={() => flip("vertical")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 transition font-semibold ${direction === "vertical" && result ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "border-gray-300 dark:border-gray-600 hover:border-blue-500"}`}>
                <FlipVertical className="w-5 h-5" /> Vertical
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original</h3>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <img src={preview} alt="Original" className="max-w-full max-h-64 mx-auto" />
              </div>
            </div>
            {result && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flipped ({direction})</h3>
                <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                  <img src={result} alt="Flipped" className="max-w-full max-h-64 mx-auto" />
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
            <button onClick={() => { setPreview(""); setResult(""); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
