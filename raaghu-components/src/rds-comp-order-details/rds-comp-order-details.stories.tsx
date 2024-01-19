import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompOrderDetails from "./rds-comp-order-details";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Order Details",
  component: RdsCompOrderDetails,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompOrderDetails>;


const Template: ComponentStory<typeof RdsCompOrderDetails> = (args) => (
  <RdsCompOrderDetails {...args} />
);


export const OrderDetails = Template.bind({});

OrderDetails.args = {
};



