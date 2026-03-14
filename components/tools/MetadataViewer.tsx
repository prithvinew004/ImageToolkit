"use client";

import { useState, useCallback } from "react";
import ImageUploader from "./ImageUploader";

interface MetadataEntry {
  key: string;
  value: string;
}

export default function MetadataViewer() {
  const [preview, setPreview] = useState("");
  const [metadata, setMetadata] = useState<MetadataEntry[]>([]);

  const handleFileSelect = useCallback((file: File, dataUrl: string) => {
    setPreview(dataUrl);

    const entries: MetadataEntry[] = [
      { key: "File Name", value: file.name },
      { key: "File Size", value: formatBytes(file.size) },
      { key: "File Type", value: file.type || "Unknown" },
      { key: "Last Modified", value: new Date(file.lastModified).toLocaleString() },
    ];

    // Extract image dimensions
    const img = new Image();
    img.onload = () => {
      entries.push(
        { key: "Width", value: `${img.width}px` },
        { key: "Height", value: `${img.height}px` },
        { key: "Aspect Ratio", value: getAspectRatio(img.width, img.height) },
        { key: "Megapixels", value: ((img.width * img.height) / 1000000).toFixed(2) + " MP" },
        { key: "Color Depth", value: "24-bit (estimated)" },
        { key: "Orientation", value: img.width > img.height ? "Landscape" : img.width < img.height ? "Portrait" : "Square" },
      );

      // Try to extract EXIF from JPEG
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const view = new DataView(e.target!.result as ArrayBuffer);
          const exifData = extractBasicExif(view);
          entries.push(...exifData);
          setMetadata([...entries]);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setMetadata([...entries]);
      }
    };
    img.src = dataUrl;
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image Metadata Viewer</h2>
        <p className="text-gray-600 dark:text-gray-400">View detailed information about your images</p>
      </div>

      {!preview && <ImageUploader onFileSelect={handleFileSelect} />}

      {preview && (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-4">
            <img src={preview} alt="Preview" className="max-w-full max-h-64 mx-auto" />
          </div>

          {metadata.length > 0 && (
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">Property</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {metadata.map((entry, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-750"}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{entry.key}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 break-all">{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center">
            <button onClick={() => { setPreview(""); setMetadata([]); }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Upload Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getAspectRatio(w: number, h: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

function extractBasicExif(view: DataView): MetadataEntry[] {
  const entries: MetadataEntry[] = [];
  try {
    if (view.getUint16(0) !== 0xFFD8) return entries;
    let offset = 2;
    while (offset < view.byteLength - 2) {
      const marker = view.getUint16(offset);
      if (marker === 0xFFE1) {
        entries.push({ key: "EXIF Data", value: "Present" });
        break;
      }
      if ((marker & 0xFF00) !== 0xFF00) break;
      const segLen = view.getUint16(offset + 2);
      offset += 2 + segLen;
    }
  } catch {
    // Silently fail on EXIF parsing errors
  }
  return entries;
}
