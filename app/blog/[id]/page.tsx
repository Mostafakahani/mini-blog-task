import Link from "next/link";
import { getPostById, getUserById } from "@/lib/api";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) {
    notFound();
  }

  const { data: post, error: postError } = await getPostById(postId);

  // Handle non-existent post
  if (postError || !post?.id) {
    notFound();
  }

  const { data: author, error: authorError } = await getUserById(post.userId);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to all posts
      </Link>

      <article className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {!authorError && author?.id && (
          <div className="flex items-center mb-8 border-b border-gray-200 pb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-4">
              {author.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Written by {author.name}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600">
                <span>{author.email}</span>
                {author.website && (
                  <>
                    <span className="hidden sm:inline mx-2">•</span>
                    <a
                      href={
                        author.website.startsWith("http")
                          ? author.website
                          : `https://${author.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate max-w-xs"
                    >
                      {author.website}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {post.body.split("\n\n").map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <div className="mt-10 bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
        <div className="p-6 bg-gray-50 rounded-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-gray-600">Comments are currently disabled.</p>
        </div>
      </div>
    </div>
  );
}
