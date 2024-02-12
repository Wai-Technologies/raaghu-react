import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPropertiesNew from './rds-comp-properties-new';


const meta: Meta = { 
    title: "Components/Properties New",
    component: RdsCompPropertiesNew,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPropertiesNew>;

export default meta;
type Story = StoryObj<typeof RdsCompPropertiesNew>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




