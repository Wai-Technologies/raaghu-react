import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAddressInput from './rds-comp-address-input';

const meta: Meta = { 
    title: "Components/Address Input",
    component: RdsCompAddressInput,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAddressInput>;

export default meta;
type Story = StoryObj<typeof RdsCompAddressInput>;

export const Default: Story = {
    args: {
        countriesList: [
            { label: "United States", val: "United States" },
            { label: "United Kingdom", val: "United Kingdom" },
            { label: "Japan", val: "Japan" },
            { label: "France", val: "France" },
            { label: "Australia", val: "Australia" }
        ],
        citiesList: [
            { label: "New York", val: "New York" },
            { label: "London", val: "London" },
            { label: "Tokyo", val: "Tokyo" },
            { label: "Paris", val: "Paris" },
            { label: "Sydney", val: "Sydney" }
        ],

        statesList: [
            { label: "California", val: "California" },
            { label: "Texas", val: "Texas" },
            { label: "New South Wales", val: "New South Wales" },
            { label: "Tokyo", val: "Tokyo" },
            { label: "Île-de-France", val: "Île-de-France" }
        ]
                   
    }
} satisfies Story;