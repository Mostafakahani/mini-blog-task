import { PostWithAuthor } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
interface PostCardProps {
  post: PostWithAuthor;
}

export default function PostCard({ post }: PostCardProps) {
  // Truncate the post body for display
  const truncatedBody =
    post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col min-h-[350px] sm:min-h-[400px]">
      <div className="flex-1 flex flex-col">
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={"https://picsum.photos/id/237/536/354"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2 font-lobester">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
            {truncatedBody}
          </p>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-sm sm:text-sm text-gray-900/50 line-clamp-2 font-lobester">
              {post.user?.name || post.author}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className="mt-auto inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base font-medium px-2 py-1 group"
            >
              بیشتر بخوانید
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
