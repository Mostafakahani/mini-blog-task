import Button from "@/components/ui/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

describe("Button", () => {
  it("renders with children and proper base, variant, and size classes", () => {
    render(
      <Button variant="primary" size="lg">
        Primary Button
      </Button>
    );
    const buttonElement = screen.getByText("Primary Button").closest("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement?.className).toMatch(
      /bg-gradient-to-r from-blue-500 to-blue-600/
    );
    expect(buttonElement?.className).toMatch(/px-6 py-3 text-lg/);
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me").closest("button");
    fireEvent.click(buttonElement!); // ! ensures non-null element
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a loading state correctly", () => {
    render(<Button isLoading={true}>Loading</Button>);
    const buttonElement = screen.getByText("Loading").closest("button");
    expect(buttonElement).toBeDisabled();
    expect(buttonElement?.className).toMatch(/cursor-not-allowed/);
    // Check for loading spinner presence (⏳)
    expect(screen.getByText("⏳")).toBeInTheDocument();
  });

  it("renders a disabled state correctly", () => {
    render(<Button disabled={true}>Disabled</Button>);
    const buttonElement = screen.getByText("Disabled").closest("button");
    expect(buttonElement).toBeDisabled();
    expect(buttonElement?.className).toMatch(/cursor-not-allowed/);
  });

  it("applies additional props correctly", () => {
    render(
      <Button type="submit" aria-label="submit-button">
        Submit
      </Button>
    );
    const buttonElement = screen.getByText("Submit").closest("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toHaveAttribute("aria-label", "submit-button");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Button variant="secondary" size="sm">
        Snapshot Test
      </Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
