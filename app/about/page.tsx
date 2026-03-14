import { Metadata } from "next";
import { Zap, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About - ImageToolkit",
  description: "Learn about ImageToolkit, a free online image utility toolkit.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About ImageToolkit</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            ImageToolkit is a free, open-source collection of online image tools designed to make your workflow faster and easier. 
            Whether you need to convert, compress, edit, or generate images — we have you covered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "All processing happens instantly in your browser using modern web APIs." },
              { icon: Shield, title: "Privacy First", desc: "Your images never leave your device. Zero server uploads, zero data collection." },
              { icon: Globe, title: "Free Forever", desc: "Every tool is completely free with no sign-ups, watermarks, or hidden limits." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6">
                <Icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We believe image tools should be accessible to everyone — no expensive software, no complicated interfaces, 
            and no privacy concerns. ImageToolkit provides 22+ tools that run entirely client-side, 
            so your files stay on your machine at all times.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Built with Next.js 14, Tailwind CSS, and the HTML5 Canvas API. Every tool leverages modern browser 
            capabilities for fast, reliable image processing without any server dependency.
          </p>
        </div>
      </div>
    </div>
  );
}
