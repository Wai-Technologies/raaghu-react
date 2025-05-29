import type { Meta, StoryObj } from "@storybook/react";
import RdsCompClaimType from "./rds-comp-claim-type";

const meta: Meta = { 
    title: "Components/Claim Type",
    component: RdsCompClaimType,
    parameters: {
        layout: "padded",
        docs: {
    description: {
        component: 
            'The **Claim Type** component is a customizable UI element designed to manage and display claim types within your application. It supports features such as a `valueType` array to define the available claim types, with properties like `option` for the display name and `value` for the corresponding identifier. This component is ideal for administrative dashboards, user management systems, or any interface requiring structured and user-friendly claim type management. Fully customizable, the Claim Type component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ["autodocs"],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompClaimType>;

export default meta;
type Story = StoryObj<typeof RdsCompClaimType>;

export const Default: Story = {
    args: {
       
        valueType: [
            {
                option: "One",
                value: "one"
            },
            {
                option: "two",
                value: "two"
            },
            {
                option: "three",
                value: "three"
            },
            {
                option: "four",
                value: "four"
            }
    
        ]
    }
} satisfies Story;