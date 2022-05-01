import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { Story, Meta } from "@storybook/react";
import App from "../App";
const meta: Meta = { title: "App", component: App, parameters: { layout: "fullscreen" } };

const Demo: Story = (props) => <App {...props} />;

export const Default = Demo.bind({});
Default.args = {};

Default.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);

  const aahed = await canvas.findByRole("button", { name: "aahed" });

  await userEvent.click(aahed);

  // await userEvent.click(await canvas.findByRole("button", { name: "bibbs" }));

  await userEvent.click(canvas.getByTestId("basic-letter-input-0-lock"));

  // await userEvent.type(canvas.getByTestId("abbey"), "email@provider.com", {
  //   delay: 100,
  // });
  // await userEvent.type(canvas.getByTestId("password"), "a-random-password", {
  //   delay: 100,
  // });

  // // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  // await userEvent.click(canvas.getByRole('button'));
};

export default meta;
