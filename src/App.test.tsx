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

it("should fill in the basic input once a word is clicked", async () => {
  render(<App />);
  const textItem = await screen.findByText("aahed");
  expect(textItem).toBeInTheDocument();

  await userEvent.click(textItem);

  const firstBasicInput = screen.getByTestId("basic-letter-input-0") as HTMLInputElement;
  const secondBasicInput = screen.getByTestId("basic-letter-input-1") as HTMLInputElement;
  const thirdBasicInput = screen.getByTestId("basic-letter-input-2") as HTMLInputElement;
  const fourthBasicInput = screen.getByTestId("basic-letter-input-3") as HTMLInputElement;
  const fifthBasicInput = screen.getByTestId("basic-letter-input-4") as HTMLInputElement;

  expect(firstBasicInput.value).toEqual("a");
  expect(secondBasicInput.value).toEqual("a");
  expect(thirdBasicInput.value).toEqual("h");
  expect(fourthBasicInput.value).toEqual("e");
  expect(fifthBasicInput.value).toEqual("d");

  expect(await screen.queryByText("aahed")).not.toBeInTheDocument();
  // beach should exist now in the list
  const nextTargetTextItem = await screen.queryByText("beach");
  expect(nextTargetTextItem).toBeInTheDocument();
  // on consecutive word clicks, we should see more being added

  await userEvent.click(nextTargetTextItem);
  expect(firstBasicInput.value).toEqual("ab");
  expect(secondBasicInput.value).toEqual("ae");
  expect(thirdBasicInput.value).toEqual("ha");
  expect(fourthBasicInput.value).toEqual("ec");
  expect(fifthBasicInput.value).toEqual("dh");

  // locking the third letter should reduce down the third letter to just one char
  await userEvent.click(screen.getByTestId("basic-letter-input-2-lock"));
  expect(thirdBasicInput.value).toEqual("a");

  // now when we select this letter, we expect the center to stay `a`
  const finalTargetTextItem = await screen.queryByText("chado");
  expect(finalTargetTextItem).toBeInTheDocument();

  await userEvent.click(finalTargetTextItem);

  expect(firstBasicInput.value).toEqual("abc");
  expect(secondBasicInput.value).toEqual("aeh");
  expect(thirdBasicInput.value).toEqual("a");
  expect(fourthBasicInput.value).toEqual("ecd");
  expect(fifthBasicInput.value).toEqual("dho");
});
