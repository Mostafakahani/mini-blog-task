import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getAllUsers, getAllPosts, createPost, updatePost } from "@/lib/api";
import { useRouter } from "next/navigation";
import CreatePostPage from "@/app/(main)/create/page";

jest.mock("@/lib/api");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

const mockUsers = [
  {
    id: 1,
    name: "Alice",
    username: "alice",
    email: "alice@example.com",
    website: "example.com",
  },
];
const mockPostsResponse = { error: null, localData: [] };

describe("CreatePostPage", () => {
  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValue({
      data: mockUsers,
      error: null,
    });
    (getAllPosts as jest.Mock).mockResolvedValue(mockPostsResponse);
    (createPost as jest.Mock).mockResolvedValue({
      data: { id: 100, title: "Test", body: "Test", user: mockUsers[0] },
      error: null,
    });
    (updatePost as jest.Mock).mockResolvedValue({
      data: { id: 1, title: "Updated", body: "Updated", user: mockUsers[0] },
      error: null,
    });
  });
  window.scrollTo = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    render(<CreatePostPage />);
    expect(screen.getByText("در حال بارگذاری...")).toBeInTheDocument();
    await waitFor(() => expect(getAllUsers).toHaveBeenCalled());
  });

  it("renders form fields after loading", async () => {
    render(<CreatePostPage />);
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("عنوان پست را وارد کنید")
      ).toBeInTheDocument()
    );
    expect(
      screen.getByPlaceholderText("محتوای پست خود را اینجا بنویسید...")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("نویسنده")).toBeInTheDocument();
  });

  it("shows error if title is empty on form submission", async () => {
    const { container } = render(<CreatePostPage />);
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("عنوان پست را وارد کنید")
      ).toBeInTheDocument()
    );
    const titleInput = screen.getByPlaceholderText("عنوان پست را وارد کنید");
    const bodyInput = screen.getByPlaceholderText(
      "محتوای پست خود را اینجا بنویسید..."
    );
    fireEvent.change(titleInput, { target: { value: "   " } });
    fireEvent.change(bodyInput, { target: { value: "Some content" } });
    const form = container.querySelector("form");
    fireEvent.submit(form!);
    await waitFor(() =>
      expect(screen.getByText("عنوان پست الزامی است")).toBeInTheDocument()
    );
  });

  it("submits the form successfully and navigates to /blog", async () => {
    const { container } = render(<CreatePostPage />);
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("عنوان پست را وارد کنید")
      ).toBeInTheDocument()
    );
    const titleInput = screen.getByPlaceholderText("عنوان پست را وارد کنید");
    const bodyInput = screen.getByPlaceholderText(
      "محتوای پست خود را اینجا بنویسید..."
    );
    fireEvent.change(titleInput, { target: { value: "Valid Title" } });
    fireEvent.change(bodyInput, { target: { value: "Valid body content" } });
    const submitButton = screen.getByRole("button", { name: /انتشار پست/i });
    fireEvent.click(submitButton);
    await waitFor(() => expect(createPost).toHaveBeenCalled());
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/blog"));
  });
});
