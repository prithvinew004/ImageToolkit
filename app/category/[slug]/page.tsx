import { notFound } from "next/navigation";
import { categories, getToolsByCategory } from "@/data/tools";
import { generateCategoryMetadata } from "@/lib/seo";
import ToolGrid from "@/components/ToolGrid";
import * as Icons from "lucide-react";

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categories.find((cat) => cat.slug === params.slug);
  if (!category) return {};
  return generateCategoryMetadata(category.name, category.description);
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(params.slug);
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="mb-12">
          <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Advertisement</p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            All {category.name} Tools
          </h2>
          <ToolGrid tools={tools} />
        </div>

        {/* Category Info */}
        <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About {category.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {category.description}. All tools are free to use and work directly in your browser. 
            No uploads to servers, ensuring your privacy and security. Fast, efficient, and easy to use.
          </p>
        </div>
      </div>
    </div>
  );
}
