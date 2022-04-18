import { render, waitFor, userEvent, screen } from "../utils/test-utils";
import { vi, describe, it, expect } from "vitest";
import BasicInput from "./BasicInput";

describe("empty case", () => {
  it("should render without crashing", () => {
    render(<BasicInput />);
  });
});

describe("case with value", () => {
  it("should render a defined value without crashing", () => {
    render(<BasicInput value={`crane`.split("")} />);
  });

  it("should handle a onChange event (crane => arane)", async () => {
    const onChange = vi.fn();
    render(<BasicInput value={`crane`.split("")} onChange={onChange} />);
    const cInput = screen.getByDisplayValue("c");
    await userEvent.clear(cInput);
    await userEvent.type(cInput, "a");
    expect(onChange.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {
            "target": {
              "locks": [
                false,
                false,
                false,
                false,
                false,
              ],
              "value": [
                "",
                "r",
                "a",
                "n",
                "e",
              ],
            },
          },
        ],
        [
          {
            "target": {
              "locks": [
                false,
                false,
                false,
                false,
                false,
              ],
              "value": [
                "a",
                "r",
                "a",
                "n",
                "e",
              ],
            },
          },
        ],
      ]
    `);
  });
});

describe("locking case", () => {
  it("should handle a onChange event (crane => arane)", async () => {
    const onChange = vi.fn();
    render(<BasicInput value={`crane`.split("")} onChange={onChange} />);
    const cInput = screen.getByDisplayValue("c");
    // console.log(cInput);
    await userEvent.clear(cInput);
    await userEvent.type(cInput, "a");
    expect(onChange.mock.calls).toMatchInlineSnapshot(`
      [
        [
          {
            "target": {
              "locks": [
                false,
                false,
                false,
                false,
                false,
              ],
              "value": [
                "",
                "r",
                "a",
                "n",
                "e",
              ],
            },
          },
        ],
        [
          {
            "target": {
              "locks": [
                false,
                false,
                false,
                false,
                false,
              ],
              "value": [
                "a",
                "r",
                "a",
                "n",
                "e",
              ],
            },
          },
        ],
      ]
    `);
  });
});
