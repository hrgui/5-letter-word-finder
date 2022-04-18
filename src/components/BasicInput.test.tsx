import { render, waitFor, userEvent, screen } from "../utils/test-utils";
import { vi, describe, it, expect, mock } from "vitest";
import BasicInput from "./BasicInput";

describe("empty case", () => {
  it("should render without crashing", () => {
    render(<BasicInput />);
  });
});

describe("case with value", () => {
  it("should render a defined value without crashing", () => {
    render(<BasicInput value={`crane`} />);
  });

  it("should handle a onChange event (crane => arane)", async () => {
    const onChange = vi.fn();
    render(<BasicInput value={`crane`} onChange={onChange} />);
    const cInput = screen.getByDisplayValue("c");
    // console.log(cInput);
    await userEvent.clear(cInput);
    await userEvent.type(cInput, "a");
    expect(onChange).toHaveBeenCalledWith({ target: { value: "arane" } });
  });
});

describe("locking case", () => {
  it("should handle a onChange event (crane => arane)", async () => {
    const onChange = vi.fn();
    render(<BasicInput value={`crane`} onChange={onChange} />);
    const cInput = screen.getByDisplayValue("c");
    // console.log(cInput);
    await userEvent.clear(cInput);
    await userEvent.type(cInput, "a");
    expect(onChange).toHaveBeenCalledWith({ target: { value: "arane" } });
  });
});
