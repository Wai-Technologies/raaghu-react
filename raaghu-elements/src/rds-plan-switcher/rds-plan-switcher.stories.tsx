import React from "react";
import RdsPlanSwitcher from "./rds-plan-switcher";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { ComponentMeta, ComponentStory } from "@storybook/react";
 
 
export default {
    title: "Elements/Plan Switcher",
    component: RdsPlanSwitcher,
    decorators: [
        (StoryComponent: React.FC) => (
            <I18nextProvider i18n={i18n}>
            <StoryComponent />
          </I18nextProvider>
        ),
      ],
} as ComponentMeta<typeof RdsPlanSwitcher>;
 
const Template: ComponentStory<typeof RdsPlanSwitcher> = (args: any) => (
    <RdsPlanSwitcher {...args} />
);
 
export const Default = Template.bind({});
 
Default.args = {
};
 