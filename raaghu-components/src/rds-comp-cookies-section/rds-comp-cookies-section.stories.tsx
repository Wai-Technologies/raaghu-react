// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompCookiesSection from "./rds-comp-cookies-section";

// export default {
//     title: "Components/Cookies Section",
//     component: RdsCompCookiesSection,
//     argTypes: { onClick: { action: "clicked" } },
// } as ComponentMeta<typeof RdsCompCookiesSection>;

// const Template: ComponentStory<typeof RdsCompCookiesSection> = (args) => (
//     <RdsCompCookiesSection {...args} />
// );

// export const Default = Template.bind({});

// Default.args = {
//     showDeclineButton: true,
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCookiesSection from "./rds-comp-cookies-section";


const meta: Meta = {
    title: "Components/Cookies Section",
    component: RdsCompCookiesSection,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCookiesSection>;

export default meta;
type Story = StoryObj<typeof RdsCompCookiesSection>;

export const Default: Story = {
    args: {
        showDeclineButton: true,
    }
} satisfies Story;




