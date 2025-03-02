import { render, screen, fireEvent } from "@testing-library/react";
import { PostWithAuthor } from "@/lib/types";
import PostList from "@/components/blog/PostList";

const dummyPosts: PostWithAuthor[] = [
  {
    id: 1,
    userId: 101,
    title: "Hello World",
    body: "This is a sample post body for testing purposes.",
    author: "Alice",
  },
  {
    id: 2,
    userId: 102,
    title: "Test Post",
    body: "Another test post body that is somewhat longer than usual.",
    author: "Bob",
  },
];

describe("PostList", () => {
  it("renders the search input and all posts initially", () => {
    render(<PostList posts={dummyPosts} />);
    const input = screen.getByPlaceholderText(
      "جستجوی پست ها براساس عنوان، محتوا یا نویسنده..."
    );
    expect(input).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("filters posts based on search term", () => {
    render(<PostList posts={dummyPosts} />);
    const input = screen.getByPlaceholderText(
      "جستجوی پست ها براساس عنوان، محتوا یا نویسنده..."
    );
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText("Test Post")).not.toBeInTheDocument();
  });

  it("displays no posts found message when no posts match search term", () => {
    render(<PostList posts={dummyPosts} />);
    const input = screen.getByPlaceholderText(
      "جستجوی پست ها براساس عنوان، محتوا یا نویسنده..."
    );
    fireEvent.change(input, { target: { value: "Nonexistent" } });
    expect(
      screen.getByText("هیچ پستی یافت نشد که با جستجوی شما مطابقت داشته باشد.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /جستجوی را پاک کنید و همه پست ها را نمایش دهید/i,
      })
    ).toBeInTheDocument();
  });

  it("clears the search term when the clear button is clicked", () => {
    const { container } = render(<PostList posts={dummyPosts} />);
    const input = screen.getByPlaceholderText(
      "جستجوی پست ها براساس عنوان، محتوا یا نویسنده..."
    );
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(screen.getByText("Hello World")).toBeInTheDocument();
    // دکمه پاک کردن در محفظه ورودی نام قابل دسترسی ندارد،
    const clearButton = container.querySelector("div.relative button");
    if (clearButton) {
      fireEvent.click(clearButton);
    }
    expect((input as HTMLInputElement).value).toBe("");
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
