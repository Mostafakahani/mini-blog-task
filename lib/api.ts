import React from "react";
import { usePostStore } from "./store";
import { Post } from "./types";

const BASE_URL_POSTS = process.env.NEXT_PUBLIC_BASE_URL_POSTS || "";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function getAllPosts() {
  try {
    // During build time, we should only fetch from external API
    // For server-side rendering that runs at request time, we can use both
    const isServerSideRendering =
      typeof window === "undefined" && process.env.NODE_ENV !== "production";

    if (isServerSideRendering) {
      // When in production build process, only fetch from external API
      const response = await fetch(`${BASE_URL_POSTS}/posts`);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts from ${BASE_URL_POSTS}/posts`);
      }

      const data = await response.json();

      return {
        data: data.slice(0, 10),
        error: null,
      };
    } else {
      // In development or client-side, fetch from both sources
      try {
        const [response, responseLocal] = await Promise.all([
          fetch(`${BASE_URL_POSTS}/posts`),
          fetch(`${BASE_URL}/api/posts`),
        ]);

        if (!response.ok) {
          throw new Error(`Failed to fetch posts from ${BASE_URL_POSTS}/posts`);
        }

        const data = await response.json();
        const localData = await responseLocal.json();
        console.log({ data, localData });

        return {
          data: [...data.slice(0, 10), ...localData],
          localData,
          error: null,
        };
      } catch {
        // Fallback to just the external API if local API fails
        const response = await fetch(`${BASE_URL_POSTS}/posts`);

        if (!response.ok) {
          throw new Error(`Failed to fetch posts from ${BASE_URL_POSTS}/posts`);
        }

        const data = await response.json();

        console.warn(
          "Could not fetch from local API, using only external data"
        );
        return {
          data: data.slice(0, 10),
          error: null,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
// Get post by ID
export async function getPostById(id: number) {
  try {
    const [response, responseLocal] = await Promise.all([
      fetch(`${BASE_URL_POSTS}/posts/${id}`),
      fetch(`${BASE_URL}/api/posts?id=${id}`),
    ]);

    if (!responseLocal.ok && !response.ok) {
      throw new Error("Failed to fetch post");
    }

    const data = responseLocal.ok
      ? await responseLocal.json()
      : await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: {},
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL_POSTS}/users`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Get user by ID
export async function getUserById(id: number) {
  try {
    const response = await fetch(`${BASE_URL_POSTS}/users/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: {},
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Create new post
export async function createPost(post: {
  title: string;
  body: string;
  user: object;
}): Promise<{ data?: Post; error?: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("خطا در ایجاد پست");
    }

    const data = await response.json();
    return { data, error: undefined };
  } catch (error) {
    return {
      // data: {},
      error:
        error instanceof Error ? error.message : "خطای ناشناخته رخ داده است",
    };
  }
}

// Update post
export async function updatePost(
  id: number,
  post: {
    title: string;
    body: string;
    user?: object;
  }
): Promise<{ data?: Post; error?: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/posts?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("خطا در بروزرسانی پست");
    }

    const data = await response.json();
    return { data, error: undefined };
  } catch (error) {
    return {
      // data: {},
      error:
        error instanceof Error ? error.message : "خطای ناشناخته رخ داده است",
    };
  }
}

// Get all posts with Zustand
export function usePosts() {
  const { posts, isLoading, error, fetchPosts } = usePostStore();

  React.useEffect(() => {
    if (posts.length === 0 && !isLoading && !error) {
      fetchPosts();
    }
  }, [posts.length, isLoading, error, fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
}

// Get post by ID with Zustand
export function usePost(id: number) {
  const { posts, getPostById, isLoading, error, fetchPosts } = usePostStore();

  React.useEffect(() => {
    if (posts.length === 0 && !isLoading && !error) {
      fetchPosts();
    }
  }, [posts.length, isLoading, error, fetchPosts]);

  const post = getPostById(id);
  return { post, isLoading, error };
}
