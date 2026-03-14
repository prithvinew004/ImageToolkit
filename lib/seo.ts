import { Metadata } from "next";

export function generateToolMetadata(toolName: string, description: string): Metadata {
  return {
    title: `${toolName} - Free Online Tool | ImageToolkit`,
    description: description,
    keywords: [toolName, "image tool", "online", "free", "converter", "editor"],
    openGraph: {
      title: `${toolName} - ImageToolkit`,
      description: description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${toolName} - ImageToolkit`,
      description: description,
    },
  };
}

export function generateCategoryMetadata(categoryName: string, description: string): Metadata {
  return {
    title: `${categoryName} Tools - ImageToolkit`,
    description: description,
    openGraph: {
      title: `${categoryName} - ImageToolkit`,
      description: description,
      type: "website",
    },
  };
}
