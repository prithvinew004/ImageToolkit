import { ReactNode } from "react";
import { Tool, tools, categories } from "@/data/tools";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
  faqs: { question: string; answer: string }[];
}

export default function ToolLayout({ tool, children, faqs }: ToolLayoutProps) {
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tool Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {tool.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {tool.description}
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-12">
          <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
            {children}
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="mb-12">
          <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Advertisement</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-12">
          <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About {tool.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {tool.description}. This tool is completely free to use and works directly in your browser. 
              No uploads to servers, ensuring your privacy and security. Fast, efficient, and easy to use.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Related Tools
              </h2>
              <Link
                href={`/category/${categories.find(c => c.id === tool.category)?.slug || tool.category}`}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map((relatedTool) => (
                <Link key={relatedTool.id} href={`/tools/${relatedTool.slug}`}>
                  <div className="rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {relatedTool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {relatedTool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
