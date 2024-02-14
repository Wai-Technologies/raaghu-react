
// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompContactInformation from "./rds-comp-contact-information";

// export default {
//     title: "Components/Contact Information",
//     component: RdsCompContactInformation,

// } as ComponentMeta<typeof RdsCompContactInformation>;


// const Template: ComponentStory<typeof RdsCompContactInformation> = (args) =>
//     <RdsCompContactInformation {...args} />;


// export const Default = Template.bind({});

// Default.args = {
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompContactInformation from "./rds-comp-contact-information";


const meta: Meta = { 
    title: "Components/Contact Information",
    component: RdsCompContactInformation,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompContactInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompContactInformation>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;