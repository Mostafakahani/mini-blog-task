import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("renders the label and input element", () => {
    render(
      <Input id="username" label="Username" value="" onChange={() => {}} />
    );
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("passes the type prop to the input element", () => {
    render(
      <Input
        id="email"
        label="Email"
        type="email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <Input id="password" label="Password" value="" onChange={handleChange} />
    );
    const inputElement = screen.getByLabelText("Password");
    fireEvent.change(inputElement, { target: { value: "new value" } }); // simulate input change
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies the required attribute when required prop is true", () => {
    render(
      <Input id="name" label="Name" value="" onChange={() => {}} required />
    );
    expect(screen.getByLabelText("Name")).toBeRequired();
  });

  it("includes additional className prop in the input element", () => {
    render(
      <Input
        id="custom"
        label="Custom Input"
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    );
    expect(screen.getByLabelText("Custom Input")).toHaveClass("custom-class");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Input
        id="snapshot"
        label="Snapshot Input"
        value="test"
        onChange={() => {}}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
