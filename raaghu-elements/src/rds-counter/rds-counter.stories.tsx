import RdsCounter from "./rds-counter";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Counter',
    component: RdsCounter,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        type: {
            options: ["Default", "Side-by-side", "Bottom"],
            control: { type: "radio" },
        },
        showLabel:{
            control: { type: "boolean" }
        },
        isDisabled: {  // Added this field for controlling the disabled state
            control: { type: "boolean" },
        },
        label: {
            control: { type: "text" },
        },
        min: {
            control: { type: "number" },
        },
        max: {
            control: { type: "number" },
        },
        width: {
            control: { type: "number" },
        },
    },
} satisfies Meta<typeof RdsCounter>;

export default meta;

type Story = StoryObj<typeof RdsCounter>;

export const Counter: Story = {
    args: {
        counterValue: 0,
        min: 0,
        max: 50,
        width: 400,
        colorVariant: "primary",
        type: "Default", // Default button placement
        label: "Counter",
        isDisabled: false, // Default disabled state to false
        showLabel:true,
        showTitle:true,
    },
};

Counter.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label', 'isDisabled','showLabel'] } };

// import RdsCounter from "./rds-counter";
// import { Meta, StoryObj } from "@storybook/react";

// const meta: Meta = {
//     title: 'Elements/Counter',
//     component: RdsCounter,
//     parameters: {
//         layout: 'padded',
//     },
//     tags: ['autodocs'],
//     argTypes: {
//         colorVariant: {
//             options: [
//                 "primary",
//                 "secondary",
//                 "success",
//                 "info",
//                 "warning",
//                 "danger",
//                 "dark",
//                 "light",
//             ],
//             control: { type: "select" },
//         },
//         position: {
//             options: ["top", "bottom", "left", "right"],
//             control: { type: "radio" },
//         },
//     },
// } satisfies Meta<typeof RdsCounter>;

// export default meta;
// type Story = StoryObj<typeof RdsCounter>;

// export const Counter: Story = {
//     args: {
//         // counterValue: 0,
//         min: 0,
//         max: 50,
//         width: 135,
//         colorVariant: "primary",
//         position: "top",
//         label: "Counter",
//     }
// } satisfies Story;
// Counter.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'position', 'label'] } };
