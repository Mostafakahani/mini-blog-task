// === BlogPage.tsx ===
import { Post } from "@/lib/types";
import { getAllPosts, getAllUsers } from "@/lib/api";
import { User } from "@/lib/types";
import PostList from "@/components/blog/PostList";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { data: posts } = await getAllPosts();
  const postTitles = posts.map((post: Post) => post.title).join(", ");

  return {
    title: "پست های وبلاگ | وبلاگ مینی",
    description: `مشاهده پست های وبلاگ مینی: ${postTitles}`,
    keywords: `وبلاگ, مینی, پست, دمو, ${postTitles}`,
    authors: [{ name: "تیم مینی وبلاگ" }],
    robots: "index, follow",
    openGraph: {
      title: "پست های وبلاگ | وبلاگ مینی",
      description: `مشاهده پست های وبلاگ مینی: ${postTitles}`,
      type: "website",
    },
  };
}

export default async function BlogPage() {
  const [
    { data: posts, error: postsError },
    { data: users, error: usersError },
  ] = await Promise.all([getAllPosts(), getAllUsers()]);

  // Combine posts with author data
  const postsWithAuthors = posts.map((post: Post) => {
    const author = users.find((user: User) => user.id === post.userId);
    return {
      ...post,
      author: author ? author.name : "Unknown Author",
    };
  });

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="mb-8 text-center md:text-right">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          همه پست ها
        </h1>
        <p className="text-gray-600 mt-2">
          در این قسمت پست های وبلاگ مینی را میتوانید مشاهده کنید
        </p>
      </div>

      {postsError || usersError ? (
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 font-medium">
              {postsError || usersError}
            </p>
          </div>
        </div>
      ) : (
        <PostList posts={postsWithAuthors} />
      )}
    </div>
  );
}
