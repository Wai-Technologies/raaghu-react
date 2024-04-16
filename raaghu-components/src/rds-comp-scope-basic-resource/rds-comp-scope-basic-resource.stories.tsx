import type { Meta, StoryObj } from '@storybook/react';
import RdsCompScopeBasicResource from "./rds-comp-scope-basic-resource";


const meta: Meta = { 
    title: "Components/Scope Basic Resource",
    component: RdsCompScopeBasicResource,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompScopeBasicResource>;

export default meta;
type Story = StoryObj<typeof RdsCompScopeBasicResource>;

export const Default: Story = {
    args: {
       
    }
} satisfies Story;
