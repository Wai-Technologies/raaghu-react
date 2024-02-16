import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSyntaxHighlighter from "./rds-comp-syntax-highlighter";


const meta: Meta = { 
    title: "Components/Syntax Highlighter",
    component: RdsCompSyntaxHighlighter,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSyntaxHighlighter>;

export default meta;
type Story = StoryObj<typeof RdsCompSyntaxHighlighter>;

export const Default: Story = {
    args: {
      disabled: false,
        maxLength: 550,
        minLength: 500,
        name: "Editior",
        placeholder: "Type here",
        padding: 15,
        required: true,
        tabSize: 15
    }
} satisfies Story;




