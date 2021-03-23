import { render, screen } from "@testing-library/react";
import TourDeFoos from "./TourDeFoos";
import "@testing-library/jest-dom";

test("renders example text", () => {
  render(<TourDeFoos />);
  const linkElement = screen.getByText(/HelloWorld/i);
  expect(linkElement).toBeInTheDocument();
});
