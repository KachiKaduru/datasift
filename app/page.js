import Link from "next/link";
import {
  ArrowRightIcon,
  CloudArrowUpIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Organic Hero Section */}
      <section className="relative pt-24 pb-20">
        {/* Decorative blob (imperfection) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tame your{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">spreadsheet chaos</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-4 text-teal-300"
                viewBox="0 0 200 20"
              >
                <path
                  d="M0 10 Q 50 18, 100 10 T 200 10"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            DataSift helps you filter
            <span className="font-medium text-blue-600"> messy Excel/CSV files</span>
            messy Excel/CSV files without losing your sanity. No PhD required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/upload"
              className="flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-medium text-lg"
            >
              Try it free <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-300 border border-gray-200 font-medium"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Hero screenshot placeholder (organic shape) */}
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="relative bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-50 to-teal-50">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-blue-500" />
                  <p className="mt-4 text-gray-500 font-medium">Your spreadsheet goes here</p>
                </div>
              </div>
            </div>
            {/* Imperfection: hand-drawn style corner */}
            <svg
              className="absolute -bottom-6 -right-6 w-32 h-32 text-teal-400 rotate-12 opacity-90"
              viewBox="0 0 100 100"
            >
              <path d="M0 0 L100 0 L100 50 Q80 70 50 50 Q20 30 0 50 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* How It Works (organic steps) */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 relative">
            <span className="relative z-10 px-4 bg-white">How DataSift works</span>
            <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></span>
          </h2>

          <div className="space-y-16">
            {[
              {
                icon: <CloudArrowUpIcon className="h-10 w-10 text-blue-600" />,
                title: "Upload your file",
                desc: "Drag & drop any .xlsx or .csv file. We don't store your data—this isn't a creepy surveillance app.",
                accent: "bg-blue-100",
              },
              {
                icon: <FunnelIcon className="h-10 w-10 text-teal-600" />,
                title: "Filter what matters",
                desc: "Hide irrelevant rows with natural-language filters. No SQL, no formulas, just human-friendly search.",
                accent: "bg-teal-100",
                offset: "md:translate-x-20",
              },
              {
                icon: <ArrowDownTrayIcon className="h-10 w-10 text-purple-600" />,
                title: "Export clean data",
                desc: "Get polished Excel/CSV files ready for reports. Your boss will think you're a spreadsheet wizard.",
                accent: "bg-purple-100",
                offset: "md:translate-x-40",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  step.offset || ""
                } transition-all hover:scale-[1.01]`}
              >
                <div
                  className={`flex-shrink-0 flex items-center justify-center rounded-2xl ${step.accent} h-16 w-16`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial with organic shape */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-teal-200 opacity-20"></div>
        <div className="absolute -bottom-16 -left-16 w-96 h-96 rounded-full bg-blue-200 opacity-10"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <SparklesIcon className="mx-auto h-12 w-12 text-yellow-400 mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
            “I used to waste hours filtering spreadsheets. Now DataSift does it in minutes.{" "}
            <span className="text-blue-600">It feels like cheating</span>.”
          </blockquote>
          <div className="text-lg text-gray-600">
            — Sarah K., <span className="text-gray-500">Marketing Analyst</span>
          </div>
        </div>
      </section>

      {/* Final CTA with imperfection */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to stop fighting your spreadsheets?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join <span className="font-semibold text-teal-600">4,327+</span> professionals who
            reclaimed their time.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 font-semibold text-lg"
          >
            Get Started for Free
            <ArrowRightIcon className="ml-3 h-5 w-5" />
          </Link>

          {/* Hand-drawn underline */}
          <svg className="mx-auto mt-12 w-64 h-6 text-blue-400" viewBox="0 0 200 20">
            <path
              d="M0 15 Q 50 -5, 100 15 T 200 15"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5,3"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
