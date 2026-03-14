"use client";

import { useState, useCallback } from "react";
import { Download, X } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function ImageToPdf() {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = useCallback((file: File, preview: string) => {
    setImages((prev) => [...prev, { file, preview }]);
  }, []);

  const removeImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

  const generatePdf = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);

    const PW = 595.28, PH = 841.89;

    // Render each image to a JPEG on an A4 canvas
    const jpegPages: Uint8Array[] = [];
    for (const img of images) {
      const el = new Image();
      await new Promise<void>((r) => { el.onload = () => r(); el.src = img.preview; });
      const c = document.createElement("canvas");
      c.width = Math.round(PW * 2);
      c.height = Math.round(PH * 2);
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, c.width, c.height);
      const scale = Math.min(c.width / el.width, c.height / el.height) * 0.9;
      const w = el.width * scale, h = el.height * scale;
      ctx.drawImage(el, (c.width - w) / 2, (c.height - h) / 2, w, h);
      const dataUrl = c.toDataURL("image/jpeg", 0.85);
      const raw = atob(dataUrl.split(",")[1]);
      const arr = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
      jpegPages.push(arr);
    }

    // Build a minimal valid PDF with embedded JPEG images
    const enc = new TextEncoder();
    const parts: (Uint8Array | string)[] = [];
    const offsets: number[] = [];
    let pos = 0;

    const addStr = (s: string) => { parts.push(s); pos += enc.encode(s).length; };
    const addBin = (b: Uint8Array) => { parts.push(b); pos += b.length; };
    const markObj = () => { offsets.push(pos); };

    addStr("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");

    // Obj 1: Catalog
    markObj();
    addStr("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

    // Obj 2: Pages
    markObj();
    const kids = jpegPages.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
    addStr(`2 0 obj\n<< /Type /Pages /Kids [${kids}] /Count ${jpegPages.length} >>\nendobj\n`);

    // For each page: Page obj, Image XObject, Content stream
    for (let i = 0; i < jpegPages.length; i++) {
      const pageObj = 3 + i * 3;
      const imgObj = 4 + i * 3;
      const contentObj = 5 + i * 3;
      const imgW = Math.round(PW * 2);
      const imgH = Math.round(PH * 2);

      // Page
      markObj();
      addStr(`${pageObj} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Contents ${contentObj} 0 R /Resources << /XObject << /Im0 ${imgObj} 0 R >> >> >>\nendobj\n`);

      // Image XObject
      markObj();
      addStr(`${imgObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegPages[i].length} >>\nstream\n`);
      addBin(jpegPages[i]);
      addStr("\nendstream\nendobj\n");

      // Content stream
      const contentStr = `q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`;
      markObj();
      addStr(`${contentObj} 0 obj\n<< /Length ${contentStr.length} >>\nstream\n${contentStr}\nendstream\nendobj\n`);
    }

    // Cross-reference table
    const xrefPos = pos;
    const totalObjs = offsets.length + 1;
    addStr(`xref\n0 ${totalObjs}\n0000000000 65535 f \n`);
    for (const off of offsets) {
      addStr(`${off.toString().padStart(10, "0")} 00000 n \n`);
    }

    addStr(`trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);

    // Combine all parts into a single Uint8Array
    const totalLen = parts.reduce((sum, p) => sum + (typeof p === "string" ? enc.encode(p).length : p.length), 0);
    const pdf = new Uint8Array(totalLen);
    let offset = 0;
    for (const p of parts) {
      const bytes = typeof p === "string" ? enc.encode(p) : p;
      pdf.set(bytes, offset);
      offset += bytes.length;
    }

    const blob = new Blob([pdf], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "images.pdf";
    a.click();
    URL.revokeObjectURL(a.href);
    setProcessing(false);
  }, [images]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image to PDF</h2>
        <p className="text-gray-600 dark:text-gray-400">Upload images to combine into a PDF document</p>
      </div>

      <ImageUploader onFileSelect={handleFileSelect} />

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Selected Images ({images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
                <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10"><X className="w-4 h-4" /></button>
                <img src={img.preview} alt={`Image ${i + 1}`} className="w-full h-32 object-cover rounded" />
                <p className="text-xs text-center text-gray-500 mt-1">Page {i + 1}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={generatePdf} disabled={processing} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center">
              <Download className="w-5 h-5 mr-2" />{processing ? "Generating PDF..." : "Generate PDF"}
            </button>
            <button onClick={() => setImages([])} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Clear All</button>
          </div>
        </div>
      )}
    </div>
  );
}
