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

it("should filter according to RegExInput if it is set", async () => {
  render(<App />);
  expect(await screen.findByText("aahed")).toBeInTheDocument();

  userEvent.type(screen.getByTestId("RegExInput"), `\\w\\w\\w\\wr`);
  expect(await screen.findByText("abear")).toBeInTheDocument();
});

it("should filter according to RegExInput and NegativeInput if it is set", async () => {
  render(<App />);
  expect(await screen.findByText("aahed")).toBeInTheDocument();

  userEvent.type(screen.getByTestId("RegExInput"), `b\\wo\\we`);
  expect(await screen.findByText("biome")).toBeInTheDocument();
  userEvent.type(screen.getByTestId("NegativeInput"), `cranig`);
  expect(await screen.findByText("bloke")).toBeInTheDocument();
});

it("should filter according to RegExInput, NegativeInput, MustHaveInput if it is set", async () => {
  render(<App />);
  expect(await screen.findByText("aahed")).toBeInTheDocument();

  userEvent.type(screen.getByTestId("RegExInput"), `b\\wo\\we`);
  expect(await screen.findByText("biome")).toBeInTheDocument();
  userEvent.type(screen.getByTestId("NegativeInput"), `cranig`);
  userEvent.type(screen.getByTestId("MustHaveInput"), `s`);
  expect(await screen.findByText("boose")).toBeInTheDocument();
});
