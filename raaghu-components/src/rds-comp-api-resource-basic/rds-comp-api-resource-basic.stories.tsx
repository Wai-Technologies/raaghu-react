
// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompApiResourceBasic from "./rds-comp-api-resource-basic";

// export default {
//     title: "Components/Api Resource Basic",
//     component: RdsCompApiResourceBasic,

// } as ComponentMeta<typeof RdsCompApiResourceBasic>;


// const Template: ComponentStory<typeof RdsCompApiResourceBasic> = (args) => (
//     <RdsCompApiResourceBasic {...args} />
// );


// export const ApiResourceBasic = Template.bind({});

// ApiResourceBasic.args = {
//     email: "xyz@xyz",
//     fullname: "xyz",
//     message: "xyz",
//     accessTokenSigningAlgorithm: "dfg"
// };


import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApiResourceBasic from "./rds-comp-api-resource-basic";


const meta: Meta = {
    title: "Components/Api Resource Basic",
    component: RdsCompApiResourceBasic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApiResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompApiResourceBasic>;

export const Default: Story = {
    args: {
        email: "xyz@xyz",
        fullname: "xyz",
        message: "xyz",
        accessTokenSigningAlgorithm: "dfg"
    }
} satisfies Story;