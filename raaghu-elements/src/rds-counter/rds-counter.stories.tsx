import RdsCounter, { CounterState, LayoutOptions } from "./rds-counter";
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
        layout: {
            options: ["Right Side", "Side to Side", "Bottom"],
            control: { type: "select" },
        },
        state: {
            options: ["Default", "Selected", "Disabled"],
            control: { type: "select" },
        },
        showTitle:{
            control: { type: "boolean" }
        },
       
        titleText: {
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

export const Default: Story = {
    args: {
        // counterValue: 0,
        min: 0,
        max: 50,
        width: 280,
        colorVariant: "primary",
        layout: LayoutOptions.SideToSide, 
        state: CounterState.Default,
        showTitle:true,
        titleText: "Label",
        isMandatory: false,
        placeholder: "00",
        //isDisabled: false, 
        //position:"top",
    },
};

Default.parameters = { controls: { include: [/*'min', 'max', 'width', 'colorVariant',*/ 'layout', 'state', 'titleText', 'isMandatory', 'placeholder', 'showTitle',/*'position'*/] } };


