import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentiyResourceBasic from "./rds-comp-identiy-resource-basic";


const meta: Meta = { 
  title: "Components/Scope",
    component: RdsCompIdentiyResourceBasic,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentiyResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentiyResourceBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;