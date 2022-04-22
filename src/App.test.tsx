import { render, waitFor, userEvent, screen } from "./utils/test-utils";

import App from "./App";
import { vi, it, expect } from "vitest";

function queryTextButton(name) {
  return screen.queryByRole("button", { name });
}

vi.mock("react-virtualized-auto-sizer", () => {
  return {
    default: ({ children }) => {
      return children({ width: 600, height: 1000 });
    },
  };
});

it("should render the default state - nothing filtered", async () => {
  render(<App />);

  await waitFor(() => {
    return expect(queryTextButton("aahed")).toBeInTheDocument();
  });
});

it("should filter according to BasicInput if it is set (x,x,x,x,r (lock)) => find all 5 letter words that end with r", async () => {
  render(<App />);
  expect(await queryTextButton("aahed")).toBeInTheDocument();

  await userEvent.type(screen.getByTestId("basic-letter-input-4"), `r`);
  await userEvent.click(screen.getByTestId("basic-letter-input-4-lock"));
  expect(await queryTextButton("abear")).toBeInTheDocument();
});

it("should filter according to BasicInput and MustHaveInput if it is set to (b (lock),x,o (lock),x,e (lock)), must have s", async () => {
  render(<App />);
  expect(await queryTextButton("aahed")).toBeInTheDocument();
  // screen.debug();
  await userEvent.type(screen.getByTestId("basic-letter-input-0"), `b`);
  await userEvent.click(screen.getByTestId("basic-letter-input-0-lock"));
  await userEvent.type(screen.getByTestId("basic-letter-input-2"), `o`);
  await userEvent.click(screen.getByTestId("basic-letter-input-2-lock"));
  await userEvent.type(screen.getByTestId("basic-letter-input-4"), `e`);
  await userEvent.click(screen.getByTestId("basic-letter-input-4-lock"));
  expect(await queryTextButton("biome")).toBeInTheDocument();
  await userEvent.type(screen.getByTestId("MustHaveInput"), `s`);
  expect(await queryTextButton("boose")).toBeInTheDocument();
});

it("should fill in the basic input once a word is clicked, filtering w/ respect to locks and must have values", async () => {
  // abbey => must have y => glyph => (lock y, lock p) => crypt
  render(<App />);
  const textItem = await queryTextButton("abbey");
  expect(textItem).toBeInTheDocument();

  await userEvent.click(textItem);

  const firstBasicInput = screen.getByTestId("basic-letter-input-0") as HTMLInputElement;
  const secondBasicInput = screen.getByTestId("basic-letter-input-1") as HTMLInputElement;
  const thirdBasicInput = screen.getByTestId("basic-letter-input-2") as HTMLInputElement;
  const fourthBasicInput = screen.getByTestId("basic-letter-input-3") as HTMLInputElement;
  const fifthBasicInput = screen.getByTestId("basic-letter-input-4") as HTMLInputElement;

  expect(firstBasicInput.value).toEqual("a");
  expect(secondBasicInput.value).toEqual("b");
  expect(thirdBasicInput.value).toEqual("b");
  expect(fourthBasicInput.value).toEqual("e");
  expect(fifthBasicInput.value).toEqual("y");

  expect(await queryTextButton("abbey")).not.toBeInTheDocument();

  // must have a y
  await userEvent.type(screen.getByTestId("MustHaveInput"), "y");

  // glyph should exist now in the list
  const nextTargetTextItem = await queryTextButton("glyph");
  expect(nextTargetTextItem).toBeInTheDocument();
  // on consecutive word clicks, we should see more being added

  await userEvent.click(nextTargetTextItem);
  expect(firstBasicInput.value).toEqual("ag");
  expect(secondBasicInput.value).toEqual("bl");
  expect(thirdBasicInput.value).toEqual("by");
  expect(fourthBasicInput.value).toEqual("ep");
  expect(fifthBasicInput.value).toEqual("yh");

  // locking the third letter should reduce down the third letter to just one char
  await userEvent.click(screen.getByTestId("basic-letter-input-2-lock"));
  await userEvent.click(screen.getByTestId("basic-letter-input-3-lock"));

  // now when we select this letter, we expect the center to stay `y`
  expect(thirdBasicInput.value).toEqual("y");
  expect(fourthBasicInput.value).toEqual("p");

  // crypt should now exist
  const finalTargetTextItem = await queryTextButton("crypt");
  expect(finalTargetTextItem).toBeInTheDocument();

  await userEvent.click(finalTargetTextItem);

  expect(firstBasicInput.value).toEqual("agc");
  expect(secondBasicInput.value).toEqual("blr");
  expect(thirdBasicInput.value).toEqual("y");
  expect(fourthBasicInput.value).toEqual("p");
  expect(fifthBasicInput.value).toEqual("yht");
});

it("should fill in basic input when quick add word is clicked", async () => {
  render(<App />);
  const quickAddWordInput = screen.queryByTestId("quickAddWordInput");
  const quickAddWordButton = screen.queryByTestId("quickAddWordButton");
  await userEvent.type(quickAddWordInput, "crane");
  await userEvent.click(quickAddWordButton);

  const firstBasicInput = screen.getByTestId("basic-letter-input-0") as HTMLInputElement;
  const secondBasicInput = screen.getByTestId("basic-letter-input-1") as HTMLInputElement;
  const thirdBasicInput = screen.getByTestId("basic-letter-input-2") as HTMLInputElement;
  const fourthBasicInput = screen.getByTestId("basic-letter-input-3") as HTMLInputElement;
  const fifthBasicInput = screen.getByTestId("basic-letter-input-4") as HTMLInputElement;

  expect(firstBasicInput.value).toEqual("c");
  expect(secondBasicInput.value).toEqual("r");
  expect(thirdBasicInput.value).toEqual("a");
  expect(fourthBasicInput.value).toEqual("n");
  expect(fifthBasicInput.value).toEqual("e");
});

it("should exclude properly after adding consecutive words (crane => breds => drier)", async () => {
  render(<App />);
  const quickAddWordInput = screen.queryByTestId("quickAddWordInput");
  const quickAddWordButton = screen.queryByTestId("quickAddWordButton");
  await userEvent.type(quickAddWordInput, "crane");
  await userEvent.click(quickAddWordButton);
  await userEvent.type(screen.getByTestId("MustHaveInput"), `e`);

  // lock the r
  await userEvent.click(screen.getByTestId("basic-letter-input-1-lock"));

  await userEvent.type(quickAddWordInput, "breds");
  await userEvent.click(quickAddWordButton);

  await userEvent.type(screen.getByTestId("MustHaveInput"), `d`);

  expect(await queryTextButton("drier")).toBeInTheDocument();
});

it("should add to the extra characters to exclude (crane => glide)", async () => {
  render(<App />);
  const quickAddWordInput = screen.queryByTestId("quickAddWordInput");
  const quickAddWordButton = screen.queryByTestId("quickAddWordButton");
  await userEvent.type(quickAddWordInput, "crane");
  await userEvent.click(quickAddWordButton);
  await userEvent.type(screen.getByTestId("MustHaveInput"), `e`);

  // lock the e
  await userEvent.click(screen.getByTestId("basic-letter-input-4-lock"));

  await userEvent.type(quickAddWordInput, "glide");
  await userEvent.click(quickAddWordButton);

  // lock the d
  await userEvent.click(screen.getByTestId("basic-letter-input-3-lock"));
  // lock the i
  await userEvent.click(screen.getByTestId("basic-letter-input-2-lock"));

  // abide should no longer be in the document, but if it is then
  // we are dismissing characters we drop after we lock
  expect(await queryTextButton("abide")).not.toBeInTheDocument();
});
