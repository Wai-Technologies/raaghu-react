import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTransferList, { SelectAllType } from "./rds-comp-transfer-list";


const meta: Meta = { 
    title: "Components/Transfer List",
    component: RdsCompTransferList,
    parameters: {
        layout: 'padded',
        
        docs: {
             description: {
        component: 
            'The **Transfer List** component is a dynamic and interactive UI element designed to facilitate the transfer of items between two lists. It supports features such as "Select All" functionality with configurable modes (e.g., default and advanced), making it ideal for applications requiring efficient item selection and management. Fully customizable, the Transfer List component ensures seamless integration with your design system while providing a user-friendly interface for managing and transferring data between lists effectively.'
    },
            source: {
                transform: (code: string) => {
                    // Transform SelectAllType enum - remove spaces and transform
                    code = code.replace(/"(default|advanced)"/g, '{SelectAllType.$1}');
                    return code;
                }
            }
        }
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

export const Standard: Story = {
    args: {
        selectAllType: SelectAllType.Default,
    }
} satisfies Story;
