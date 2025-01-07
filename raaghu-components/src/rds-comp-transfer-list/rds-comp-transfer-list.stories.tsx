import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTransferList from "./rds-comp-transfer-list";


const meta: Meta = { 
    title: "Components/Transfer List",
    component: RdsCompTransferList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        selectAllType: {
            options: [
                "default",
                "advanced",       
            ],
            control: { type: "radio" },
        },
    }, 
} satisfies Meta<typeof RdsCompTransferList>;

export default meta;
type Story = StoryObj<typeof RdsCompTransferList>;

export const Default: Story = {
    args: {
        selectAllType: "default",
    }
} satisfies Story;
