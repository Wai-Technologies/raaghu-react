import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAddressInput from './rds-comp-address-input';

const meta: Meta = { 
    title: "Components/Address Input",
    component: RdsCompAddressInput,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Address Input** component enables users to enter and select detailed address information in a structured and user-friendly format. It supports optional display of an icon via the \`withIcon\` boolean prop, allowing enhanced visual context. The component includes a customizable header, controlled by the \`header\` string prop, which sets the address section's title for better clarity. Users can input multiple address lines (\`addressLine1\`, \`addressLine2\`, and \`addressLine3\`), each accepting string values for comprehensive address entry. The \`cardborder\` boolean prop allows toggling the component's border styling, enabling seamless integration into different UI designs, either as a bordered card or a borderless form element. This component is ideal for forms requiring detailed address inputs with support for country, state, and city selections, providing a clean, accessible, and consistent user experience.`
}

        }
       
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAddressInput>;

export default meta;
type Story = StoryObj<typeof RdsCompAddressInput>;

export const Standard: Story = {
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