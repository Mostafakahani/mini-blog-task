import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";

const yekanBakhLight = localFont({
  src: "./fonts/YekanBakhFaNum-Light.woff2",
  variable: "--font-yekanBakh-light",
  weight: "100 300", // Light weights
});

const yekanBakhRegular = localFont({
  src: "./fonts/YekanBakhFaNum-Regular.woff2",
  variable: "--font-yekanBakh-regular",
  weight: "400 500", // Regular weights
});

const yekanBakhBold = localFont({
  src: "./fonts/YekanBakhFaNum-Bold.woff2",
  variable: "--font-yekanBakh-bold",
  weight: "600 700", // Bold weights
});

const yekanBakhBlack = localFont({
  src: "./fonts/YekanBakhFaNum-Black.woff2",
  variable: "--font-yekanBakh-black",
  weight: "800 900", // Black weights
});

const danaBlack = localFont({
  src: "./fonts/dana/DanaFaNum-Black.woff2",
  variable: "--font-dana-black",
  weight: "800 900", // Black weights
});

const danaBold = localFont({
  src: "./fonts/dana/DanaFaNum-bold.woff2",
  variable: "--font-dana-bold",
  weight: "600 700", // Bold weights
});

const danaDemiBold = localFont({
  src: "./fonts/dana/DanaFaNum-DemiBold.woff2",
  variable: "--font-dana-demibold",
  weight: "500 600", // DemiBold weights
});

const danaDemiMedium = localFont({
  src: "./fonts/dana/DanaFaNum-Medium.woff2",
  variable: "--font-dana-medium",
  weight: "400 500", // Medium weights
});

const danaDemiRegular = localFont({
  src: "./fonts/dana/DanaFaNum-Regular.woff2",
  variable: "--font-dana-regular",
  weight: "300 400", // Regular weights
});

const lobesterFont = localFont({
  src: "./fonts/Lobster-Regular.woff2",
  variable: "--font-lobester",
  weight: "400", // Lobster is typically a single-weight font
});
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
      <body
        suppressHydrationWarning
        className={`${danaBlack.variable} ${danaBold.variable} ${danaDemiBold.variable} ${danaDemiMedium.variable} ${danaDemiRegular.variable} ${yekanBakhLight.variable} ${yekanBakhRegular.variable} ${yekanBakhBold.variable} ${lobesterFont.variable} ${yekanBakhBlack.variable} antialiased`}
      >
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
