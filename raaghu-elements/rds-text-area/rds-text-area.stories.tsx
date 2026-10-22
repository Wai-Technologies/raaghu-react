
import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof RdsTextArea> = {
    title: "Elements/Text Area",
    component: RdsTextArea,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        controls: {
            exclude: [
                "value",
                "id",
                "dataTestId",
                "onChange",
                "onClick",
                "onKeyDown",
                "onFocus",
                "onBlur",
                "reset",
                "validationPattern",
                "validationMsg",
                "isMultiUrl",
                "customClasses",
            ],
        },
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(
                        /state="([^"]+)"/g,
                        (_match, p1) => `state={TextareaState.${p1}}`
                    );
                    code = code.replace(
                        /variant="([^"]+)"/g,
                        (_match, p1) =>
                            `variant={TextareaStyle.${p1.replace(/\s+/g, "")}}`
                    );
                    return code;
                },
            },
        },
    },
    tags: ["autodocs", "stable"],
    argTypes: {
        state: {
            control: "select",
            options: ["Default", "Active", "Selected", "Disabled", "Error"],
            description: "Current state of the text area",
        },
        variant: {
            control: "select",
            options: ["Default", "Pill", "Bottom Outline"],
            description: "Visual variant of the text area",
        },
        showTitle: {
            control: "boolean",
            description: "Whether to show the label (true = show, false = hide)",
        },
    } as any,
} satisfies Meta<typeof RdsTextArea>;

export default meta;

type Story = StoryObj<typeof RdsTextArea>;

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Enter Description",
        state: TextareaState.Default,
        variant: TextareaStyle.Default,
        required: false,
        showTitle: true,
        rows: 4,
    },
};
