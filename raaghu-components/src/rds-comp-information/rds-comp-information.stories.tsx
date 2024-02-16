import type { Meta, StoryObj } from '@storybook/react';
import RdsCompInformation from "./rds-comp-information";


const meta: Meta = { 
    title: "Components/Information",
    component: RdsCompInformation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompInformation>;

export const Default: Story = {
    args: {
        inputTypeList: [
            {
                label: "One",
            },
            {
                label: "two",
            },
            {
                label: "three",
            },
            {
                label: "four",
            },
        ],
        informationItemInitial: {
            propertyName: "demo",
            displayName: "demo",
            inputValue: "demo",
        },
    
        reset: false,
    }
} satisfies Story;




