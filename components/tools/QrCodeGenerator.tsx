"use client";

import { useState, useCallback } from "react";
import { Download } from "lucide-react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const generate = useCallback(() => {
    if (!text.trim()) return;

    // Simple QR code generation using a public API rendered to canvas
    // For a fully offline solution, integrate a QR library like 'qrcode'
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Use Google Charts API for QR generation
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      // If custom foreground color, apply color overlay
      if (fgColor !== "#000000") {
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        const fr = parseInt(fgColor.slice(1, 3), 16);
        const fg = parseInt(fgColor.slice(3, 5), 16);
        const fb = parseInt(fgColor.slice(5, 7), 16);
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] < 128) {
            data[i] = fr;
            data[i + 1] = fg;
            data[i + 2] = fb;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      setResult(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      // Fallback: render text-based placeholder
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = fgColor;
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("QR: " + text.substring(0, 20), size / 2, size / 2);
      ctx.font = "10px monospace";
      ctx.fillText("(Install qrcode lib for offline)", size / 2, size / 2 + 20);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  }, [text, size, fgColor, bgColor]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "qrcode.png";
    a.click();
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">QR Code Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Generate QR codes from text or URLs</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text or URL</label>
          <textarea value={text} onChange={(e) => { setText(e.target.value); setResult(""); }} rows={3} placeholder="Enter text or URL..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size (px)</label>
            <select value={size} onChange={(e) => { setSize(parseInt(e.target.value)); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
              <option value={128}>128×128</option>
              <option value={256}>256×256</option>
              <option value={512}>512×512</option>
              <option value={1024}>1024×1024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foreground</label>
            <input type="color" value={fgColor} onChange={(e) => { setFgColor(e.target.value); setResult(""); }}
              className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
            <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setResult(""); }}
              className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={generate} disabled={!text.trim()} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50">
          Generate QR Code
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-700 p-8 flex justify-center">
            <img src={result} alt="QR Code" className="max-w-full" style={{ width: size > 512 ? 512 : size }} />
          </div>
          <div className="flex justify-center">
            <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
