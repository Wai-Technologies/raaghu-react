import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTypeahead from "./rds-comp-typeahead";


const meta: Meta = { 
    title: "Components/Typeahead",
    component: RdsCompTypeahead,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    }, 
} satisfies Meta<typeof RdsCompTypeahead>;

export default meta;
type Story = StoryObj<typeof RdsCompTypeahead>;

export const Default: Story = {
    args: {
        selectItems: [
                    {
                        "option": "J.K Rowling",
                        "value": "one"
                    },
                    {
                        "option": "Rudyard Kipling",
                        "value": "two"
                    }
                ],
                label: "Authors",
                selectedItems: [
                    {
                        "option": "Pablo Neruda",
                        "value": "three"
                    },
                    {
                        "option": "Robin sharma",
                        "value": "four"
                    }
                ],
                onChange: (data: any) => {
                }
    }
} satisfies Story;




