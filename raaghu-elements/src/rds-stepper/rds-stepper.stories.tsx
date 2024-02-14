import React from "react";
import RdsStepper from "./rds-stepper";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Stepper',
    component: RdsStepper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsStepper>;

export default meta;
type Story = StoryObj<typeof RdsStepper>;


export const Simple: Story = {
    args: {
        stepperType: "simple",
    }
} satisfies Story;

// Simple.decorators= [
//     (Story) => (
//         <div style={{ padding:"5% 5%" ,
//         }}>
//             <Story/>
//         </div>
//     ),
// ],
// Simple.args = {
//     stepperType: "simple",
// };

