"use client";

import { useState, useCallback, useRef } from "react";
import { Copy } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface PickedColor {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPicker() {
  const [preview, setPreview] = useState("");
  const [colors, setColors] = useState<PickedColor[]>([]);
  const [currentColor, setCurrentColor] = useState<PickedColor | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copied, setCopied] = useState("");

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setColors([]);
    setCurrentColor(null);
    setImgLoaded(false);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const maxW = 800;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setImgLoaded(true);
    };
    img.src = dataUrl;
  }, []);

  const getColorAt = useCallback((e: React.MouseEvent<HTMLCanvasElement>): PickedColor | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d")!;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];
    return {
      hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: rgbToHsl(r, g, b),
    };
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorAt(e);
    if (!color) return;
    setCurrentColor(color);
    setColors((prev) => [color, ...prev.slice(0, 19)]);
  }, [getColorAt]);

  const handleCanvasMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorAt(e);
    if (color) setCurrentColor(color);
  }, [getColorAt]);

  const copyColor = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Color Picker</h2>
        <p className="text-gray-600 dark:text-gray-400">Click on the image to pick colors</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMove}
                  className="max-w-full mx-auto block cursor-crosshair"
                  style={{ display: imgLoaded ? "block" : "none" }}
                />
                {!imgLoaded && <p className="text-center text-gray-500 py-12">Loading image...</p>}
              </div>
            </div>

            <div className="space-y-4">
              {currentColor && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
                  <div className="w-full h-24 rounded-lg border-2 border-gray-200 dark:border-gray-600" style={{ backgroundColor: currentColor.hex }}></div>
                  {[
                    { label: "HEX", value: currentColor.hex },
                    { label: "RGB", value: currentColor.rgb },
                    { label: "HSL", value: currentColor.hsl },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-3 py-2">
                      <div>
                        <span className="text-xs text-gray-500">{label}</span>
                        <p className="text-sm font-mono text-gray-900 dark:text-white">{value}</p>
                      </div>
                      <button onClick={() => copyColor(value)} className="p-1 hover:text-blue-600 transition">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {copied && <p className="text-xs text-green-500 text-center">Copied: {copied}</p>}
                </div>
              )}

              {colors.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Picked Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c, i) => (
                      <button key={i} onClick={() => copyColor(c.hex)} title={c.hex}
                        className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-600 shadow hover:scale-110 transition"
                        style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={() => { setPreview(""); setColors([]); setCurrentColor(null); setImgLoaded(false); }}
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Upload Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
