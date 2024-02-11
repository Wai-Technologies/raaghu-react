import type { Meta, StoryObj } from '@storybook/react';
import { RdsAppDetail } from "../rds-elements";

const meta: Meta = { 
    title: "Component/App Detail",
    component: RdsAppDetail,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsAppDetail>;

export default meta;
type Story = StoryObj<typeof RdsAppDetail>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;