import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ToolGrid from "@/components/ToolGrid";
import AdUnit from "@/components/AdUnit";
import { categories, tools, getPopularTools } from "@/data/tools";

export default function Home() {
  const popularTools = getPopularTools();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Image Tools
              </span>
              <br />
              Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Convert, compress, edit, and generate images with our free online tools. 
              Fast, secure, and works directly in your browser.
            </p>

            {/* Search Bar */}
            <div className="mb-12">
              <SearchBar />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 text-gray-700 dark:text-gray-300">
                <Zap className="w-6 h-6 text-blue-600" />
                <span className="font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-700 dark:text-gray-300">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-700 dark:text-gray-300">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <span className="font-medium">No Sign-up Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find the perfect tool for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdUnit format="auto" responsive={true} />
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Tools
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Most used tools by our community
              </p>
            </div>
          </div>

          <ToolGrid tools={popularTools} />
        </div>
      </section>

      {/* All Tools Section */}
      <section id="tools" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore our complete collection of image tools
            </p>
          </div>

          <ToolGrid tools={tools} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose a tool and start working on your images right away
          </p>
          <Link
            href="#tools"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
          >
            Browse Tools <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
