"use client";

import { useState, useCallback } from "react";
import { Download } from "lucide-react";

export default function PlaceholderGenerator() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [bgColor, setBgColor] = useState("#cccccc");
  const [textColor, setTextColor] = useState("#666666");
  const [customText, setCustomText] = useState("");
  const [result, setResult] = useState("");

  const generate = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw cross lines
    ctx.strokeStyle = textColor + "33";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();

    // Draw border
    ctx.strokeStyle = textColor + "44";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    // Draw text
    const displayText = customText || `${width} × ${height}`;
    ctx.fillStyle = textColor;
    const fontSize = Math.max(16, Math.min(width, height) * 0.08);
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayText, width / 2, height / 2);

    setResult(canvas.toDataURL("image/png"));
  }, [width, height, bgColor, textColor, customText]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `placeholder-${width}x${height}.png`;
    a.click();
  }, [result, width, height]);

  const presets = [
    { l: "Banner", w: 1200, h: 628 },
    { l: "Square", w: 500, h: 500 },
    { l: "Thumbnail", w: 150, h: 150 },
    { l: "HD", w: 1920, h: 1080 },
    { l: "Mobile", w: 375, h: 812 },
    { l: "OG Image", w: 1200, h: 630 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Placeholder Image Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Generate placeholder images for your designs</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width (px)</label>
            <input type="number" value={width} min={1} max={4096} onChange={(e) => { setWidth(parseInt(e.target.value) || 1); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (px)</label>
            <input type="number" value={height} min={1} max={4096} onChange={(e) => { setHeight(parseInt(e.target.value) || 1); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
            <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setResult(""); }} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label>
            <input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setResult(""); }} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Text (optional)</label>
          <input type="text" value={customText} onChange={(e) => { setCustomText(e.target.value); setResult(""); }} placeholder="Leave empty for dimensions"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button key={p.l} onClick={() => { setWidth(p.w); setHeight(p.h); setResult(""); }}
                className="px-3 py-1 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition">
                {p.l} ({p.w}×{p.h})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={generate} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
          Generate Placeholder
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl bg-gray-100 dark:bg-gray-700 p-4 flex justify-center">
            <img src={result} alt="Placeholder" className="max-w-full max-h-96" />
          </div>
          <div className="flex justify-center">
            <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
