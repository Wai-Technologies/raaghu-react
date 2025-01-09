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
        // position: {
        //     options: ["top", "bottom", "left", "right"],
        //     control: { type: "radio" },
        // },
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
    },
};
Counter.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label'] } };

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
