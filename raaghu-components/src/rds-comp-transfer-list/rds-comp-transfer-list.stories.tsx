import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTransferList, { SelectAllType } from "./rds-comp-transfer-list";


const meta: Meta = { 
    title: "Components/Transfer List",
    component: RdsCompTransferList,
    parameters: {
        layout: 'padded',
        docs: {
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

export const Default: Story = {
    args: {
        selectAllType: SelectAllType.Default,
    }
} satisfies Story;
