import "./_styles/globals.css";
import Footer from "./_components/Footer";
import Navigation from "./_components/Navigation";

export const metadata = {
  title: "DataSift | Filter & Export Excel/CSV Data",
  description: "Upload, filter, and export your Excel/CSV files with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
