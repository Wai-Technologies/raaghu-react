import React from "react";
import { ComponentStory } from "@storybook/react";
import RdsCompInvoice from './rds-comp-invoice';

export default {
  title: "Components/Invoice",
  component: RdsCompInvoice,
};

const Template: ComponentStory<typeof RdsCompInvoice> = (args) => (
  <RdsCompInvoice {...args} />
);

export const Invoice = Template.bind({});

Invoice.story = {
  name: 'default',
};
