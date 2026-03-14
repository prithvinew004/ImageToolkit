import Link from "next/link";
import * as Icons from "lucide-react";
import { Tool } from "@/data/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = (Icons as any)[tool.icon] || Icons.Image;

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {tool.name}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
