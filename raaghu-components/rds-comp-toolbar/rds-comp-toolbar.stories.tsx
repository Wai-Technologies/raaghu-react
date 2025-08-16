import { Meta, StoryObj } from "@storybook/react";
import RdsCompToolbar, { RdsCompToolbarProps } from "./rds-comp-toolbar";

const meta: Meta<typeof RdsCompToolbar> = {
    title: "Components/Toolbar",
    component: RdsCompToolbar,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        layout: {
            control: { type: 'select' },
            options: ['primary', 'secondary'],
            description: 'Layout variant of the toolbar',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
        },
        type: {
            control: { type: 'select' },
            options: ['inline-editor', 'full-featured', 'more-text', 'more-paragraph', 'more-rich-content', 'misc'],
            description: 'Type/variant of the toolbar (only available for secondary layout)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'full-featured' },
            },
            if: { arg: 'layout', eq: 'secondary' },
        },
        state: {
            control: { type: 'select' },
            options: ['off', 'on', 'disabled-on', 'disabled-off'],
            description: 'State of the toolbar',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'on' },
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsCompToolbar>;

export default meta;
type Story = StoryObj<typeof RdsCompToolbar>;

export const Default: Story = {
    args: {
        layout: 'primary',
        type: 'full-featured',
        state: 'on',
    },
};  