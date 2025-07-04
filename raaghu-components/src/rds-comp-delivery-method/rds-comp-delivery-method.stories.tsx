import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompDeliveryMethod from "./rds-comp-delivery-method";


const meta: Meta = { 
    title: "Components/Delivery Method",
    component: RdsCompDeliveryMethod,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Delivery Method** component provides a structured and interactive interface for presenting delivery options to users. It supports a `sizeDataWithDescription` array to define delivery types, estimated delivery times, and associated costs. With its customizable design, this component is perfect for checkout workflows, shipping configuration pages, or any application requiring delivery method selection. Developers can easily adapt the component to align with their design system and functional needs, ensuring a smooth and intuitive user experience.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDeliveryMethod>;

export default meta;
type Story = StoryObj<typeof RdsCompDeliveryMethod>;

export const Standard: Story = {
    args: {
        sizeDataWithDescription: [
                    { id: 1, type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
                    { id: 2, type: "Express", days: "2-5 buisness days", cost: "$16.00" },
                    { id: 3, type: "Free", days: "10-12 buisness days", cost: "$0.00" },],
                sizeType: "withDescription", 
    }
} satisfies Story;
