import Link from "next/link";
import * as Icons from "lucide-react";
import { Category } from "@/data/tools";

export default function CategoryCard({ category }: { category: Category }) {
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;

  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {category.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
