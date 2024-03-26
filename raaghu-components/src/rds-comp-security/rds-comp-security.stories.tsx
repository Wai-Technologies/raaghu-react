
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSecurity from "./rds-comp-security";


const meta: Meta = {
    title: "Components/Security",
    component: RdsCompSecurity,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSecurity>;

export default meta;
type Story = StoryObj<typeof RdsCompSecurity>;

export const Default: Story = {
    args: {
        checkgroupList: [
            {
                "id": 1,
                "label": "Require Digit",
                "checked": false,
                "disabled": false
            },
            {
                "id": 2,
                "label": "Require Lowercase",
                "checked": false,
                "disabled": false
            }, {
                "id": 3,
                "label": "Require Non-Alphanumeric",
                "checked": false,
                "disabled": false
            },
            {
                "id": 4,
                "label": "Require Uppercase",
                "checked": false,
                "disabled": false
            },
        ]
    }
} satisfies Story;
Default.parameters = { controls: { include: ['checkgroupList'] } };





