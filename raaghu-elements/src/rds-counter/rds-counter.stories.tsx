import RdsCounter, { CounterState, LayoutOptions } from "./rds-counter";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Counter',
    component: RdsCounter,
    parameters: {
        layout: 'padded',
        
        docs: {
            description: {
        component:
            'The **Counter** component is an interactive numeric input element for displaying and adjusting values within a specified range. It supports multiple layout options (`Right Side`, `Side to Side`, `Bottom`), customizable minimum and maximum values, width, and color variants. The component can display an optional title, be marked as mandatory, and show a placeholder when empty. It also supports different states (`Default`, `Selected`, `Disabled`) to reflect user interaction or availability. The Counter element is ideal for forms, quantity selectors, and any interface where users need to increment or decrement a value easily, with flexible props for appearance and behavior.'
    },
            source: {
                transform: (code: string) => {
                    // Transform layout enum - remove spaces and transform
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={LayoutOptions.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: LayoutOptions.${p1.replace(/\s+/g, '')}`);
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={CounterState.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: CounterState.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
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


