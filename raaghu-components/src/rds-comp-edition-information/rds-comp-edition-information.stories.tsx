import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEditionInformation from "./rds-comp-edition-information";


const meta: Meta = { 
    title: "Components/Edition Information",
    component: RdsCompEditionInformation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditionInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompEditionInformation>;

export const Default: Story = {
    args: {
        sizeDataWithDescription: [
                    { type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
                    { type: "Express", days: "2-5 buisness days", cost: "$16.00" },
                    { type: "Free", days: "10-12 buisness days", cost: "$0.00" },
                ],
            
                radioItems: [
                    {
                        label: "First Bill Date",
                        inline: true,
                        id: 1,
                        itemList: [
                            {
                                id: 1,
                                label: "Immediately",
                                checked: true,
                                name: "radio_button",
                            },
                            {
                                id: 2,
                                label: "After Trial Period",
                                checked: false,
                                name: "radio_button",
                            },
                        ],
                    },
                    {
                        label: "After Subscription Expiry",
                        id: 2,
                        inline: true,
                        itemList: [
                            {
                                id: 1,
                                label: "Deactivate Tenant",
                                checked: true,
                                name: "radio_button",
                            },
                            {
                                id: 2,
                                label: "Assign To Another Edition",
                                checked: false,
                                name: "radio_button",
                            },
                        ],
                    },
                ],
    }
} satisfies Story;




