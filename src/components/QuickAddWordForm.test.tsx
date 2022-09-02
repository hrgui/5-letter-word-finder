import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuickAddWordForm from "./QuickAddWordForm";
it("should render without crashing", async () => {
  const handleSubmit = vi.fn();
  render(<QuickAddWordForm onSubmit={handleSubmit} />);
  const input = screen.getByPlaceholderText(/Quick add word/);
  expect(input).toBeInTheDocument();
  await userEvent.type(input, "crane");
  fireEvent.submit(input);
  expect(handleSubmit.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "crane",
      ],
    ]
  `);
});
