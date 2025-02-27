"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost, getAllUsers } from "@/lib/api";
import { User } from "@/lib/types";

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1);

  // دریافت کاربران برای منوی کشویی
  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await getAllUsers();

      if (error) {
        setError(
          "دریافت کاربران با مشکل مواجه شد. لطفاً بعداً دوباره تلاش کنید."
        );
      } else {
        setUsers(data);
        if (data.length > 0) {
          setUserId(data[0].id);
        }
      }

      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // اعتبارسنجی فرم
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
      const postData = { title, body, userId };
      const { error } = await createPost(postData);

      if (error) {
        throw new Error(error);
      }

      // هدایت به لیست بلاگ
      // در یک برنامه واقعی، به پست جدید هدایت می‌شود
      // اما چون از یک API آزمایشی استفاده می‌کنیم، به لیست بلاگ می‌رویم
      router.push("/blog");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ایجاد پست با مشکل مواجه شد"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 md:py-12 text-right">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-right-4 border-blue-500 md:pr-4">
        ایجاد پست جدید
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

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:from-blue-400 disabled:to-blue-500 disabled:shadow-none"
          >
            {isSubmitting ? "در حال انتشار..." : "انتشار پست"}
          </button>
        </div>
      </form>
    </div>
  );
}
