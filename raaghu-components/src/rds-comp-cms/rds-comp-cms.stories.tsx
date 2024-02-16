import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCMS from "./rds-comp-cms";


const meta: Meta = { 
    title: "Components/CMS",
    component: RdsCompCMS,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCMS>;

export default meta;
type Story = StoryObj<typeof RdsCompCMS>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;