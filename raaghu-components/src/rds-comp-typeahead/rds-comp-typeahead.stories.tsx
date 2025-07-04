import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompTypeahead from "./rds-comp-typeahead";


const meta: Meta = { 
    title: "Components/Typeahead",
    component: RdsCompTypeahead,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Typeahead** component is an interactive and user-friendly UI element designed to provide real-time suggestions as users type into an input field. It supports features such as displaying a list of selectable options, pre-selected items, and handling user interactions through callbacks. This component is ideal for applications requiring dynamic search functionality, such as filtering large datasets or providing autocomplete suggestions. Fully customizable, the Typeahead component ensures seamless integration with your design system while offering an intuitive interface for enhancing user input experiences.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    }, 
} satisfies Meta<typeof RdsCompTypeahead>;

export default meta;
type Story = StoryObj<typeof RdsCompTypeahead>;

export const Standard: Story = {
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




