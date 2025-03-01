import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/lib/types";
import PostCard from "@/components/blog/PostCart";
import Button from "@/components/ui/ButtonLink";

export default async function HomePage() {
  const { data: posts, error } = await getAllPosts();

  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-right py-16 md:py-24 px-4">
        <div className="w-full mx-auto flex flex-col lg:flex-row justify-between items-start">
          <div className="max-w-2xl flex flex-col gap-y-5 md:gap-y-2">
            <div className="py-2 px-4 font-bold text-sm md:text-sm bg-blue-200 rounded-full w-fit text-blue-500">
              وبلاگ
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              مینی وبلاگ
            </h1>

            <p className="text-md md:text-xl text-gray-600 mb-10 leading-relaxed">
              لورم اپیسوم ستونی است که برای اینکه صفحه وب را زیباتر کند استفاده
              میشود. لورم اپیسوم ستونی است که برای اینکه صفحه وب را زیباتر کند
              استفاده میشود.
            </p>
          </div>
          <Button href="/blog" text="مشاهده همه پست ها" />
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h2 className="text-md md:text-xl font-bold text-gray-900 mb-4 md:mb-0">
            پست های امروز
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-all"
          >
            <span>مشاهده همه پست ها</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform rotate-180"
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

        {error ? (
          <div className="bg-red-50 p-6 rounded-lg shadow-sm w-full flex justify-center items-center">
            <div className="flex items-center">
              <p className="text-red-600 font-medium text-center w-full">
                Failed to load posts: {error}
              </p>
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
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
            آیا می‌خواهید داستان خود را به اشتراک بگذارید؟
          </h2>
          <p className="text-sm md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            ایجاد یک پست وبلاگ خود را با دنیا به اشتراک بگذارید. دیدگاه منحصر به
            فرد شما مهم است.
          </p>
          <Button href="/create" text="ایجاد پست" />
        </div>
      </section>
    </div>
  );
}
