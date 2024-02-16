// /* eslint-disable */
// import React from 'react';
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompApplicationScopes from './rds-comp-application-scopes';

// export default {
//   title: "components/Application Scopes",
//   component: RdsCompApplicationScopes,
// } as ComponentMeta<typeof RdsCompApplicationScopes>;

// const Template: ComponentStory<typeof RdsCompApplicationScopes> = (args) => (
//   <RdsCompApplicationScopes {...args} />
// );

// export const ApplicationScopes = Template.bind({});

// ApplicationScopes.args = {
//   name: 'default',
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplicationScopes from './rds-comp-application-scopes';



const meta: Meta = { 
    title: "Components/Application Scopes",
    component: RdsCompApplicationScopes,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplicationScopes>;

export default meta;
type Story = StoryObj<typeof RdsCompApplicationScopes>;

export const Default: Story = {
    args: {
        scopesList: [
            {
                id: 1,
                label: "Read",
                checked: false
            },
            {
                id: 2,
                label: "Write",
                checked: false
            },
            {
                id: 3,
                label: "Delete",
                checked: false
            }
        ]
    }
} satisfies Story;
