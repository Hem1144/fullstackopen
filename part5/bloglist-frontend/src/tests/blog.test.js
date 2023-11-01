import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

test("renders blog title and blog author but not likes and url", () => {
  const blog = {
    title: "A test-case",
    author: "Jest Library",
    url: "https://localhost:3000/",
    likes: 99,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog-div");
  const element = screen.queryByText("likes");
  expect(div).toHaveTextContent("A test-case");
  expect(div).toHaveTextContent("Jest Library");
  expect(element).toBeNull();
  expect(screen.queryByText("url")).toBeNull();
});
