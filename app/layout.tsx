import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const modamLight = localFont({
  src: "./fonts/ModamFaNumWeb-Light.woff2",
  variable: "--font-modam-light",
  weight: "200", // Light weight
});

const modamRegular = localFont({
  src: "./fonts/ModamFaNumWeb-Regular.woff2",
  variable: "--font-modam-regular",
  weight: "400", // Regular. weight
});
const modamMedium = localFont({
  src: "./fonts/ModamFaNumWeb-Medium.woff2",
  variable: "--font-modam-medium",
  weight: "400", // Medium weight
});

const modamSemiBold = localFont({
  src: "./fonts/ModamFaNumWeb-SemiBold.woff2",
  variable: "--font-modam-semibold",
  weight: "600", // SemiBold weight
});

const modamBlack = localFont({
  src: "./fonts/ModamFaNumWeb-Black.woff2",
  variable: "--font-modam-black",
  weight: "800", // Black weight
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
        className={`${modamLight.variable} ${modamMedium.variable} ${modamSemiBold.variable} ${modamBlack.variable} ${modamRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
