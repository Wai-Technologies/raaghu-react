import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEditLanguageText from "./rds-comp-edit-language-text";


const meta: Meta = { 
    title: "Components/Edit Language Text",
    component: RdsCompEditLanguageText,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditLanguageText>;

export default meta;
type Story = StoryObj<typeof RdsCompEditLanguageText>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;