import { render, screen } from "@testing-library/react";
import { Post, PostWithAuthor } from "@/lib/types";
import PostCard from "@/components/blog/PostCart";

const longPost: PostWithAuthor = {
  id: 1,
  author: "John Doe",
  userId: 101,
  title: "Test Post Title",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec sollicitudin, magna ut pretium.",
};

const shortPost: PostWithAuthor = {
  id: 2,
  userId: 102,
  title: "Short Post",
  body: "Short body text.",
  author: "Jane Smith",
};

describe("PostCard", () => {
  it("renders the post title and truncated body when body is longer than 100 characters", () => {
    render(<PostCard post={longPost} />);
    expect(screen.getByText(longPost.title)).toBeInTheDocument();
    const truncatedBody =
      longPost.body.length > 100
        ? longPost.body.substring(0, 100) + "..."
        : longPost.body;
    expect(screen.getByText(truncatedBody)).toBeInTheDocument();
  });

  it("renders the full body when body is short", () => {
    render(<PostCard post={shortPost} />);
    expect(screen.getByText(shortPost.title)).toBeInTheDocument();
    expect(screen.getByText(shortPost.body)).toBeInTheDocument();
  });

  it("renders a link with the correct href to the blog post", () => {
    render(<PostCard post={longPost} />);
    const linkElement = screen.getByRole("link", { name: /بیشتر بخوانید/i });
    expect(linkElement).toHaveAttribute("href", `/blog/${longPost.id}`);
  });

  it("renders the author name if post has an author", () => {
    render(<PostCard post={longPost} />);
    expect(screen.getByText(longPost.author)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<PostCard post={longPost} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
