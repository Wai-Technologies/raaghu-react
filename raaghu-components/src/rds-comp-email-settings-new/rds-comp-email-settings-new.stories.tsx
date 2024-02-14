import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEmailSettingsNew from "./rds-comp-email-settings-new";


const meta: Meta = { 
    title: "Components/Email Settings New",
    component: RdsCompEmailSettingsNew,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEmailSettingsNew>;

export default meta;
type Story = StoryObj<typeof RdsCompEmailSettingsNew>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




