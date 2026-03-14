import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/data/tools";
import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ToolInterface from "./ToolInterface";

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return generateToolMetadata(tool.name, tool.description);
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const faqs = [
    {
      question: `How do I use ${tool.name}?`,
      answer: `Simply upload your image, configure the settings if needed, and click the process button. Your result will be ready for download instantly.`,
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, all our tools are completely free to use with no limitations or hidden fees.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! All processing happens directly in your browser. Your files never leave your device, ensuring complete privacy and security.",
    },
    {
      question: "What file formats are supported?",
      answer: "We support all common image formats including JPG, PNG, WEBP, GIF, and more.",
    },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs}>
      <ToolInterface tool={tool} />
    </ToolLayout>
  );
}
