import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompShoppingCart from "./rds-comp-shopping-cart";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Shopping Cart",
  component: RdsCompShoppingCart,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompShoppingCart>;


const Template: ComponentStory<typeof RdsCompShoppingCart> = (args) =>
  <RdsCompShoppingCart {...args} />;


export const ShoppingCart = Template.bind({});

ShoppingCart.args = {

};



