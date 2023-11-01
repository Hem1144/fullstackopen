import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("Likes and Url will be shown when toggled", async () => {
  const blog = {
    title: "A test-case",
    author: "Jest Library",
    url: "https://localhost:3000/",
    likes: 99,
  };
  const container = render(<Blog blog={blog} />).container;

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);
  screen.debug();

  const div = container.querySelector(".blog-div");
  expect(div).toHaveTextContent("https://localhost:3000/");
  expect(div).toHaveTextContent("99");
  expect(screen.queryByText("Likes")).toBeDefined();
  expect(screen.queryByText("url")).toBeDefined();
});

test("Like button is clickable", async () => {
  const blog = {
    title: "A test-case",
    author: "Jest Library",
    url: "https://localhost:3000/",
    likes: 99,
  };
  const mockHandler = jest.fn();

  const container = render(
    <Blog blog={blog} updateLikes={mockHandler} />
  ).container;

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);
  expect(screen.queryByText("Like")).toBeDefined();
  const like_button = screen.getByText("Like");
  await user.click(like_button);
  await user.click(like_button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
