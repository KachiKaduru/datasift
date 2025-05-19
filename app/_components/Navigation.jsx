import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  return (
    <nav className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200">
      {/* Decorative shape (imperfection) */}
      <div className="absolute -bottom-8 -left-12 w-32 h-32 rounded-full bg-teal-100 opacity-30 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with organic underline */}
        <Link href="/" className="group text-2xl font-bold text-gray-900">
          <span className="relative">
            DataSift
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 text-teal-400 opacity-80 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 100 10"
            >
              <path
                d="M0 5 Q 25 9, 50 5 T 100 5"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Link>

        {/* Navigation links with micro-interactions */}
        <div className="flex items-center space-x-8">
          <Link
            href="#features"
            className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/upload"
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group"
          >
            <span>Try Now</span>
            <SparklesIcon className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
