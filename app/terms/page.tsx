import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ImageToolkit",
  description: "ImageToolkit terms of service and usage guidelines.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using ImageToolkit, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Description of Service</h2>
            <p>ImageToolkit provides free, browser-based image processing tools including conversion, compression, editing, generation, and utility tools. All processing occurs client-side in your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. User Responsibilities</h2>
            <p>You are responsible for ensuring you have the right to process any images you upload. Do not use this service for illegal purposes or to process content that violates applicable laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Disclaimer of Warranties</h2>
            <p>ImageToolkit is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the tools will be error-free, uninterrupted, or produce specific results.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Limitation of Liability</h2>
            <p>ImageToolkit shall not be liable for any damages arising from the use or inability to use the service, including but not limited to data loss or image corruption.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Intellectual Property</h2>
            <p>The ImageToolkit brand, design, and code are protected by intellectual property laws. You retain full ownership of any images you process using our tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Contact</h2>
            <p>For questions about these terms, please visit our <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
