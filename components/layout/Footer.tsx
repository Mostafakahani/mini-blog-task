import Link from "next/link";

export default function Footer() {
  const socials = [
    { id: 1, text: "توییتر", link: "#" },
    { id: 2, text: "فیسبوک", link: "#" },
    { id: 3, text: "اینستاگرام", link: "#" },
  ];
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} مینی وبلاگ. همه حقوق محفوظ است.
            </p>
          </div>
          <div className="flex space-x-6">
            {socials.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
