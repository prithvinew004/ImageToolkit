import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ImageToolkit
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Free online image tools for conversion, compression, editing, and more. Fast, secure, and easy to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/tools/jpg-to-png" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">JPG to PNG</Link></li>
              <li><Link href="/tools/image-compressor" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Image Compressor</Link></li>
              <li><Link href="/tools/image-resizer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Image Resizer</Link></li>
              <li><Link href="/tools/qr-code-generator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">QR Code Generator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} ImageToolkit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
