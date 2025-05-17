export default function Footer() {
  return (
    <footer className="bg-white mt-12 py-6">
      <div className="max-w-6xl mx-auto text-center text-gray-500">
        © {new Date().getFullYear()} DataSift. All rights reserved.
      </div>
    </footer>
  );
}
