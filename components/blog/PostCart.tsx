import { Post } from "@/lib/types";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Truncate the post body for display
  const truncatedBody =
    post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
          {truncatedBody}
        </p>
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors mt-auto group"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
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
  );
}
