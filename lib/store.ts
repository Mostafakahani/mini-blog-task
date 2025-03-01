import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  getPostById: (id: number) => Post | undefined;
  addPost: (post: Omit<Post, "id">) => Promise<Post>;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      isLoading: false,
      error: null,

      fetchPosts: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || ""}/posts`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }

          const data = await response.json();
          set({ posts: data, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Unknown error occurred",
            isLoading: false,
          });
        }
      },

      getPostById: (id) => {
        return get().posts.find((post) => post.id === id);
      },

      addPost: async (newPost) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || ""}/posts`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newPost),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to create post");
          }

          const createdPost = await response.json();
          set((state) => ({
            posts: [...state.posts, createdPost],
            isLoading: false,
          }));

          return createdPost;
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Unknown error occurred",
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "posts-storage", // نام برای ذخیره در localStorage
    }
  )
);
