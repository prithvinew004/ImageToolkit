import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ImageToolkit",
  description: "ImageToolkit privacy policy. Your images never leave your device.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Overview</h2>
            <p>ImageToolkit is committed to protecting your privacy. All image processing is performed entirely in your browser — your files are never uploaded to our servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Data Collection</h2>
            <p>We do not collect, store, or transmit any images or personal data. The only data stored locally is your theme preference (light/dark mode) via localStorage.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Cookies</h2>
            <p>We do not use tracking cookies. If third-party advertisements are displayed, they may use their own cookies subject to their respective privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Third-Party Services</h2>
            <p>The QR Code Generator may use an external API (api.qrserver.com) to generate QR codes. The text you enter is sent to this service. No other tools transmit data externally.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Analytics</h2>
            <p>We may use privacy-respecting analytics to understand general usage patterns. No personally identifiable information is collected.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Changes</h2>
            <p>We may update this policy from time to time. Changes will be reflected on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Contact</h2>
            <p>If you have questions about this privacy policy, please visit our <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
