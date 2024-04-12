import type { Meta, StoryObj } from '@storybook/react';
import RdsCompContactInformation from "./rds-comp-contact-information";

const meta: Meta = { 
    title: "Components/Contact Information",
    component: RdsCompContactInformation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompContactInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompContactInformation>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
//Default.parameters = { controls: { include: [] } };