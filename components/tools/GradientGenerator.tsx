"use client";

import { useState, useCallback } from "react";
import { Download, RefreshCw, Copy } from "lucide-react";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [direction, setDirection] = useState(135);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

  const cssCode = `background: linear-gradient(${direction}deg, ${color1}, ${color2});`;

  const generate = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    const rad = (direction * Math.PI) / 180;
    const x1 = width / 2 - Math.cos(rad) * width;
    const y1 = height / 2 - Math.sin(rad) * height;
    const x2 = width / 2 + Math.cos(rad) * width;
    const y2 = height / 2 + Math.sin(rad) * height;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    setResult(canvas.toDataURL("image/png"));
  }, [color1, color2, direction, width, height]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `gradient-${width}x${height}.png`;
    a.click();
  }, [result, width, height]);

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetGradients = [
    { c1: "#667eea", c2: "#764ba2" },
    { c1: "#f093fb", c2: "#f5576c" },
    { c1: "#4facfe", c2: "#00f2fe" },
    { c1: "#43e97b", c2: "#38f9d7" },
    { c1: "#fa709a", c2: "#fee140" },
    { c1: "#a18cd1", c2: "#fbc2eb" },
    { c1: "#fccb90", c2: "#d57eeb" },
    { c1: "#e0c3fc", c2: "#8ec5fc" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gradient Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Create beautiful gradient images</p>
      </div>

      {/* Live Preview */}
      <div className="rounded-xl overflow-hidden h-48" style={{ background: `linear-gradient(${direction}deg, ${color1}, ${color2})` }}></div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color 1</label>
            <input type="color" value={color1} onChange={(e) => { setColor1(e.target.value); setResult(""); }} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color 2</label>
            <input type="color" value={color2} onChange={(e) => { setColor2(e.target.value); setResult(""); }} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
            <input type="number" value={width} min={1} max={4096} onChange={(e) => { setWidth(parseInt(e.target.value) || 1); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
            <input type="number" value={height} min={1} max={4096} onChange={(e) => { setHeight(parseInt(e.target.value) || 1); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Direction: {direction}°</label>
          <input type="range" min="0" max="360" value={direction} onChange={(e) => { setDirection(parseInt(e.target.value)); setResult(""); }}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>

        {/* Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Presets</label>
          <div className="flex flex-wrap gap-2">
            {presetGradients.map((g, i) => (
              <button key={i} onClick={() => { setColor1(g.c1); setColor2(g.c2); setResult(""); }}
                className="w-12 h-8 rounded-lg border-2 border-white dark:border-gray-600 shadow hover:scale-110 transition"
                style={{ background: `linear-gradient(135deg, ${g.c1}, ${g.c2})` }} />
            ))}
            <button onClick={() => { setColor1(randomColor()); setColor2(randomColor()); setResult(""); }}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition flex items-center gap-1 text-sm">
              <RefreshCw className="w-3 h-3" /> Random
            </button>
          </div>
        </div>

        {/* CSS Code */}
        <div className="flex items-center gap-2 bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-sm">
          <code className="flex-1 overflow-x-auto">{cssCode}</code>
          <button onClick={copyCSS} className="p-1 hover:text-white transition" title="Copy CSS">
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-xs text-green-300">Copied!</span>}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button onClick={generate} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
          Generate Image
        </button>
        {result && (
          <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
            <Download className="w-5 h-5 mr-2" /> Download
          </button>
        )}
      </div>
    </div>
  );
}
