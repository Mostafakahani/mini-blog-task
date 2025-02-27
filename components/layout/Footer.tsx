export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Personal Blog. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
