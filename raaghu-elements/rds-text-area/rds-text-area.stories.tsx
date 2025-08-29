import React, { useState } from "react";
import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
        layout: 'padded',
        // Docs addon expects source.transform under parameters.docs.source
        docs: {
            source: {
                transform: (code: string) => {
                    // Transform state enum
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={TextareaState.${p1}}`);
                    // Transform style enum  
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={TextareaStyle.${p1.replace(/\s+/g, "")}}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            control: 'select',
            options: ['Default', 'Active', 'Selected', 'Disabled', 'Error'],
            description: 'Current state of the text area'
        },
        style: {
            control: 'select',
            options: ['Default', 'Pill', 'Bottom Outline'],
            description: 'Visual style variant of the text area'
        },
        isMandatory: {
            control: 'boolean',
            description: 'Whether the field is required'
        },
            showTitle: {
                control: 'boolean',
                description: 'Whether to show the label (true = show, false = hide)'
            }
    },
} satisfies Meta<typeof RdsTextArea>;

export default meta;
type Story = StoryObj<typeof RdsTextArea>;

// Default style - standard rounded corners
export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Enter Description",
        state: TextareaState.Default,
        style: TextareaStyle.Default,
        isMandatory: false
    }
};