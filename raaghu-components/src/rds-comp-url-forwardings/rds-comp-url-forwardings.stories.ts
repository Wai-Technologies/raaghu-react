import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUrlForwardings from './rds-comp-url-forwardings';


const meta: Meta = { 
    title: "Components/Url Forwardings",
    component: RdsCompUrlForwardings,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUrlForwardings>;

export default meta;
type Story = StoryObj<typeof RdsCompUrlForwardings>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
Default.parameters = { controls : { include : []}};





