import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Transform Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Excel/CSV
          </span>{" "}
          Workflow
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Upload, filter, and export your data in seconds—no coding required.
        </p>
        <Link
          href="/upload"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: "📊",
            title: "Upload Any Format",
            desc: "Supports .xlsx, .csv, and more",
          },
          {
            icon: "🔍",
            title: "Smart Filtering",
            desc: "Filter by columns with live preview",
          },
          {
            icon: "💾",
            title: "Export Options",
            desc: "Download as Excel or CSV",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Data?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of users who save hours every week with DataSift.
        </p>
        <Link
          href="/upload"
          className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
        >
          Try It Free
        </Link>
      </section>
    </div>
  );
}
