import React from "react";
import RdsCompSubscriptionPlan from "./rds-comp-subscription-plan";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { ComponentMeta, ComponentStory } from "@storybook/react";
 
 
export default {
    title: "Elements/Subscription Plan",
    component: RdsCompSubscriptionPlan,
    decorators: [
        (StoryComponent: React.FC) => (
            <I18nextProvider i18n={i18n}>
            <StoryComponent />
          </I18nextProvider>
        ),
      ],
} as ComponentMeta<typeof RdsCompSubscriptionPlan>;
 
const Template: ComponentStory<typeof RdsCompSubscriptionPlan> = (args: any) => (
    <RdsCompSubscriptionPlan {...args} />
);
 
export const Default = Template.bind({});
 
Default.args = {
};