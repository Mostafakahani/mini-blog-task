import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "مینی وبلاگ",
  description: "یک وبلاگ تستی برای تسک",
  authors: [{ name: "Mostafa Kahani Blog" }],
  keywords: ["وبلاگ", "مینی وبلاگ", "نکست جی اس", "ری‌اکت"],
  openGraph: {
    title: "مینی وبلاگ",
    description: "یک وبلاگ تستی برای تسک",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={` antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
