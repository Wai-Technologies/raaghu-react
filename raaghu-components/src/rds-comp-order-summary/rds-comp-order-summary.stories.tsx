import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompOrderSummary from "./rds-comp-order-summary";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Order Summary",
  component: RdsCompOrderSummary,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompOrderSummary>;


const Template: ComponentStory<typeof RdsCompOrderSummary> = (args) => (
  <RdsCompOrderSummary {...args} />
);


export const OrderSummary = Template.bind({});

OrderSummary.args = {
  isCheckout: true,
};