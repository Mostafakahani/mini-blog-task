const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// Get all posts
export async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
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

// Get post by ID
export async function getPostById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch post");
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

// Get all users
export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);

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
    const response = await fetch(`${BASE_URL}/users/${id}`);

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
  userId: number;
}) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
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
