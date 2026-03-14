"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { tools } from "@/data/tools";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filteredTools = query
    ? tools.filter((tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {focused && query && filteredTools.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50">
          {filteredTools.slice(0, 5).map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {tool.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {tool.description}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
