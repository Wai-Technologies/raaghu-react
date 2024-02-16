import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDeliveryMethod from "./rds-comp-delivery-method";


const meta: Meta = { 
    title: "Components/Delivery Method",
    component: RdsCompDeliveryMethod,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDeliveryMethod>;

export default meta;
type Story = StoryObj<typeof RdsCompDeliveryMethod>;

export const Default: Story = {
    args: {
        sizeDataWithDescription: [
                    { id: 1, type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
                    { id: 2, type: "Express", days: "2-5 buisness days", cost: "$16.00" },
                    { id: 3, type: "Free", days: "10-12 buisness days", cost: "$0.00" },],
                sizeType: "withDescription", 
    }
} satisfies Story;
