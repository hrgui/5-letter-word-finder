import { render, waitFor, userEvent, screen } from "./utils/test-utils";

import App from "./App";
import { vi, it, expect } from "vitest";

vi.mock("react-virtualized-auto-sizer", () => {
  return {
    default: ({ children }) => {
      return children({ width: 600, height: 600 });
    },
  };
});

it("should render the default state - nothing filtered", async () => {
  const { getByText } = render(<App />);

  await waitFor(() => {
    return expect(getByText("aahed")).toBeInTheDocument();
  });
});

it("should filter according to BasicInput if it is set (x,x,x,x,r (lock)) => find all 5 letter words that end with r", async () => {
  render(<App />);
  expect(await screen.findByText("aahed")).toBeInTheDocument();

  await userEvent.type(screen.getByTestId("basic-letter-input-4"), `r`);
  await userEvent.click(screen.getByTestId("basic-letter-input-4-lock"));
  expect(await screen.findByText("abear")).toBeInTheDocument();
});

it("should filter according to BasicInput and MustHaveInput if it is set to (b (lock),x,o (lock),x,e (lock)), must have s", async () => {
  render(<App />);
  expect(await screen.findByText("aahed")).toBeInTheDocument();
  // screen.debug();
  await userEvent.type(screen.getByTestId("basic-letter-input-0"), `b`);
  await userEvent.click(screen.getByTestId("basic-letter-input-0-lock"));
  await userEvent.type(screen.getByTestId("basic-letter-input-2"), `o`);
  await userEvent.click(screen.getByTestId("basic-letter-input-2-lock"));
  await userEvent.type(screen.getByTestId("basic-letter-input-4"), `e`);
  await userEvent.click(screen.getByTestId("basic-letter-input-4-lock"));
  expect(await screen.findByText("biome")).toBeInTheDocument();
  await userEvent.type(screen.getByTestId("MustHaveInput"), `s`);
  expect(await screen.findByText("boose")).toBeInTheDocument();
});
