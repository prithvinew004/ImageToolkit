"use client";

import { useState, useCallback } from "react";
import { Download, RefreshCw } from "lucide-react";

export default function AvatarGenerator() {
  const [name, setName] = useState("");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [shape, setShape] = useState<"circle" | "square" | "rounded">("circle");
  const [result, setResult] = useState("");

  const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

  const generate = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = bgColor;
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "rounded") {
      const r = size * 0.15;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(size - r, 0);
      ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size - r);
      ctx.quadraticCurveTo(size, size, size - r, size);
      ctx.lineTo(r, size);
      ctx.quadraticCurveTo(0, size, 0, size - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    // Initials
    const initials = name.trim()
      ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()
      : "?";
    ctx.fillStyle = textColor;
    ctx.font = `bold ${size * 0.4}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2);

    setResult(canvas.toDataURL("image/png"));
  }, [name, size, bgColor, textColor, shape]);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `avatar-${name || "custom"}.png`;
    a.click();
  }, [result, name]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Avatar Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Generate custom initial-based avatars</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value); setResult(""); }} placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
            <select value={size} onChange={(e) => { setSize(parseInt(e.target.value)); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
              <option value={64}>64px</option>
              <option value={128}>128px</option>
              <option value={256}>256px</option>
              <option value={512}>512px</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shape</label>
            <select value={shape} onChange={(e) => { setShape(e.target.value as any); setResult(""); }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
              <option value="circle">Circle</option>
              <option value="rounded">Rounded</option>
              <option value="square">Square</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
            <div className="flex gap-2">
              <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setResult(""); }} className="w-full h-10 rounded-lg cursor-pointer" />
              <button onClick={() => { setBgColor(randomColor()); setResult(""); }} className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition" title="Random">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label>
            <input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setResult(""); }} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={generate} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
          Generate Avatar
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl bg-gray-100 dark:bg-gray-700 p-8 flex justify-center">
            <img src={result} alt="Avatar" style={{ width: Math.min(size, 256) }} />
          </div>
          <div className="flex justify-center">
            <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download Avatar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
