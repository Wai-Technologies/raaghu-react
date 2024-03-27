import type { Meta, StoryObj } from '@storybook/react';
import RdsCompScopeBasicResource from "./rds-comp-scope-basic-resource";


const meta: Meta = { 
    title: "Components/Scope Basic Resource",
    component: RdsCompScopeBasicResource,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompScopeBasicResource>;

export default meta;
type Story = StoryObj<typeof RdsCompScopeBasicResource>;

export const Default: Story = {
    args: {
        resourceData: {
            "Name": "",
            "Displayname": "",
            "Description": "",
            checklist: [
                {
                    "id": 1,
                    "label": "Enables",
                    "checked": false,
                    "disabled": false
                },
                {
                    "id": 2,
                    "label": "Required",
                    "checked": false,
                    "disabled": false
                },
                {
                    "id": 3,
                    "label": "Emphasize",
                    "checked": false,
                    "disabled": false
                },
                {
                    "id": 4,
                    "label": "Show in discovery Documents",
                    "checked": false,
                    "disabled": false
                },
            ]
    
        }
    }
} satisfies Story;
Default.parameters = { controls: { include: ['resourceData'] } };




