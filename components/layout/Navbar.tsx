"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [mounted, setMounted] = useState(false);

  // // Use useEffect to handle client-side only code
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const isActive = (path: string) => {
    return pathname === path
      ? "text-blue-600 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:rounded-full"
      : "text-gray-700 hover:text-blue-500 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full before:rounded-full";
  };

  // Basic className for server-side rendering
  // const headerClass = "bg-white shadow-sm sticky top-0 z-30";

  // Enhanced className that will only be applied client-side after hydration
  const headerClassFull =
    // mounted
    // ?
    "bg-white/70 backdrop-blur-md sticky top-0 z-30 transition-all duration-300";
  // : headerClass;
  const menuItems = [
    { title: "خانه", href: "/" },
    { title: "وبلاگ", href: "/blog" },
    { title: "ایجاد پست", href: "/create" },
    { title: "درباره ما", href: "/about" },
  ];

  return (
    <header className={headerClassFull}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className={
                "text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
              }
            >
              مینی وبلاگ
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className={`${isActive(
                  href
                )} ${"transition-all duration-300"} py-2`}
              >
                {title}
              </Link>
            ))}
          </div>

          {/* Sign In Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/signin"
              className={
                "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300"
              }
            >
              ورود
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={
                "text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-0 rounded-full p-2 transition-all duration-300 md:hidden"
              }
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden "transition-all duration-300 ease-in-out" ${
            isMenuOpen ? " h-dvh opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-3 border-t pt-4 border-gray-100">
            {menuItems.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className={`${isActive(href)} 
                 "transition-all duration-300" 
                 px-2 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/signin"
                className={
                  "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium inline-block shadow-sm hover:shadow-md transition-all duration-300 w-full text-center"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
