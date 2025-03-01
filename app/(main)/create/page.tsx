"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost, getAllUsers, getAllPosts, updatePost } from "@/lib/api";
import { User, Post } from "@/lib/types";
import Button from "@/components/ui/Button";

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [posts, setPosts] = useState<Post[]>([]);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [error]);
  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await getAllUsers();

      if (error) {
        setError(
          "دریافت کاربران با مشکل مواجه شد. لطفاً بعداً دوباره تلاش کنید."
        );
      } else {
        setUsers([
          ...data,
          {
            id: 500,
            email: "WebsiteAdmin@gmail.com",
            name: "WebsiteAdmin",
            username: "WebsiteAdmin",
            website: "/",
          },
        ]);
        if (data.length > 0) {
          setUserId(data[0].id);
        }
      }

      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  // دریافت پست‌ها
  async function fetchPosts() {
    const { error, localData } = await getAllPosts();

    if (error) {
      setError("دریافت پست‌ها با مشکل مواجه شد. لطفاً بعداً دوباره تلاش کنید.");
    } else {
      // setPosts(data);
      setLocalPosts(localData);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!title.trim()) {
      setError("عنوان پست الزامی است");
      setIsSubmitting(false);
      return;
    }

    if (!body.trim()) {
      setError("محتوای پست الزامی است");
      setIsSubmitting(false);
      return;
    }

    try {
      const userData = users.find((x) => x.id === userId);

      if (userId === 500 && !userData) {
        return setError("کاربر با شناسه 500 نمی‌تواند پست ایجاد کند.");
      }

      if (!userData) {
        return setError("اطلاعات کاربر وارد شده اشتباه است.");
      }

      let result: { data?: Post; error?: string };

      if (editingPost) {
        // ویرایش پست موجود
        result = await updatePost(editingPost.id, {
          title,
          body,
          user: userData,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        fetchPosts();
      } else {
        result = await createPost({
          title,
          body,
          user: userData,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        // setPosts([result.data, ...posts]);
      }

      // پاک کردن فرم
      setTitle("");
      setBody("");
      setEditingPost(null);

      if (!editingPost) {
        router.push("/blog");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "عملیات با مشکل مواجه شد");
    } finally {
      setIsSubmitting(false);
    }
  };
  // تابع حذف پست
  const handleDeletePost = async (postId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?id=${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("حذف پست با مشکل مواجه شد");
      }
      fetchPosts();

      // حذف پست از لیست
      // setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حذف پست با مشکل مواجه شد");
    }
  };

  // تابع ویرایش پست
  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setBody(post.body);
    setUserId(post.user?.id || 1);

    // اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 md:py-12 text-right">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-right-4 border-blue-500 md:pr-4">
        {editingPost ? "ویرایش پست" : "ایجاد پست جدید"}
      </h1>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg shadow-sm mb-6 border-r-4 border-red-500 transition-all">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 ml-3"
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
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white md:p-6 rounded-lg md:shadow-md"
      >
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            عنوان
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-all"
            placeholder="عنوان پست را وارد کنید"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            نویسنده
          </label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right appearance-none pr-4 transition-all"
            style={{ backgroundPosition: "left 0.75rem center" }}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            محتوا
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right resize-none transition-all"
            placeholder="محتوای پست خود را اینجا بنویسید..."
          />
        </div>

        <div className="pt-4 flex gap-4 justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setTitle("");
              setBody("");
              setEditingPost(null);
            }}
            disabled={isSubmitting}
          >
            حذف فیلد ها
          </Button>
          <Button variant="secondary" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "در حال انتشار..."
              : editingPost
              ? "بروزرسانی پست"
              : "انتشار پست"}
          </Button>
        </div>
      </form>

      {/* بخش لیست پست‌ها */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-right-4 border-blue-500 md:pr-4">
          لیست پست‌های شما
        </h2>

        {localPosts.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">هنوز پستی ایجاد نکرده‌اید.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {localPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.body}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    نویسنده: {post.user?.name || "ناشناس"}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
