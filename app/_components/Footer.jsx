import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-white to-gray-50 pt-16 pb-8 border-t border-gray-200">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-blue-100 opacity-20 -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/3 w-32 h-32 rounded-full bg-teal-100 opacity-30 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">DataSift</h3>
            <p className="text-gray-600">
              Making spreadsheets suck less since {new Date().getFullYear()}.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: [
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Testimonials", href: "#testimonials" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Docs", href: "#" },
                { name: "Tutorials", href: "#" },
                { name: "Blog", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About", href: "#" },
                { name: "Privacy", href: "#" },
                { name: "Terms", href: "#" },
              ],
            },
          ].map((column, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-start"
                    >
                      <span className="mr-2 text-blue-400">↗</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-gray-200 text-center text-gray-500 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <p>Built with</p>
            <HeartIcon className="mx-2 h-4 w-4 text-red-500" />
            <p>by Kachi Kaduru</p>
          </div>
          <p>© {new Date().getFullYear()} DataSift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
