import Link from "next/link";

interface ButtonProps {
  href: string;
  text: string;
}

export default function Button({ href, text }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm md:text-lg px-5 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 duration-200"
    >
      <span>{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2 rotate-180"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </Link>
  );
}
