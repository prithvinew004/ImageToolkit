"use client";

import { useState, useCallback } from "react";
import { Copy, Download, ArrowRightLeft } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function Base64Converter() {
  const [mode, setMode] = useState<"toBase64" | "toImage">("toBase64");
  const [preview, setPreview] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [imageFromBase64, setImageFromBase64] = useState("");
  const [base64Input, setBase64Input] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileInfo, setFileInfo] = useState("");

  const handleFileSelect = useCallback((_file: File, dataUrl: string) => {
    setPreview(dataUrl);
    setBase64Output(dataUrl);
    setFileInfo(`${_file.name} (${formatBytes(_file.size)})`);
  }, []);

  const convertToImage = useCallback(() => {
    let input = base64Input.trim();
    if (!input) return;
    // Add data URI prefix if missing
    if (!input.startsWith("data:")) {
      input = `data:image/png;base64,${input}`;
    }
    setImageFromBase64(input);
  }, [base64Input]);

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64Output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    if (!imageFromBase64) return;
    const a = document.createElement("a");
    a.href = imageFromBase64;
    a.download = "decoded-image.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Base64 Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Convert between images and Base64 encoding</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1">
          <button onClick={() => setMode("toBase64")}
            className={`px-6 py-2 rounded-lg font-medium transition ${mode === "toBase64" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}>
            Image → Base64
          </button>
          <button onClick={() => setMode("toImage")}
            className={`px-6 py-2 rounded-lg font-medium transition ${mode === "toImage" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}>
            Base64 → Image
          </button>
        </div>
      </div>

      {mode === "toBase64" && (
        <div className="space-y-6">
          {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

          {preview && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Image</h3>
                  <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                    <img src={preview} alt="Original" className="max-w-full max-h-48 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{fileInfo}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Base64 Output</h3>
                    <button onClick={copyBase64} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition">
                      <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <textarea readOnly value={base64Output} rows={8}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-xs outline-none resize-none" />
                  <p className="text-sm text-gray-500 mt-1">Length: {base64Output.length.toLocaleString()} characters</p>
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={() => { setPreview(""); setBase64Output(""); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Reset</button>
              </div>
            </>
          )}
        </div>
      )}

      {mode === "toImage" && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paste Base64 String</label>
            <textarea value={base64Input} onChange={(e) => { setBase64Input(e.target.value); setImageFromBase64(""); }} rows={6}
              placeholder="Paste base64 encoded image string here (with or without data URI prefix)..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-xs outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div className="flex justify-center">
            <button onClick={convertToImage} disabled={!base64Input.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center">
              <ArrowRightLeft className="w-5 h-5 mr-2" /> Convert to Image
            </button>
          </div>

          {imageFromBase64 && (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-4">
                <img src={imageFromBase64} alt="Decoded" className="max-w-full max-h-96 mx-auto" />
              </div>
              <div className="flex justify-center">
                <button onClick={downloadImage} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center">
                  <Download className="w-5 h-5 mr-2" /> Download Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
