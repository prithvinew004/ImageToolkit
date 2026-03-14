"use client";

import { useCallback, useRef } from "react";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  accept?: string;
  label?: string;
  onFileSelect: (file: File, preview: string) => void;
}

export default function ImageUploader({ accept = "image/*", label = "PNG, JPG, WEBP up to 10MB", onFileSelect }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => onFileSelect(file, reader.result as string);
    reader.readAsDataURL(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" className="hidden" accept={accept} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      <Upload className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
      <span className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">Click to upload or drag and drop</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
