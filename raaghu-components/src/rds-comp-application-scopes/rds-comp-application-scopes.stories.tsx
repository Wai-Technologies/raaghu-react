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
        docs: {
    description: {
        component: 
            'Designed to simplify the management of application permissions, the **Application Scopes** component is a highly customizable UI element that allows users to configure and manage scopes for applications within your system. It supports a `scopesList` array to define the available scopes, with properties such as `id`, `label`, and `checked` to represent each scope and its state. This component is ideal for administrative dashboards or application management systems, enabling granular control over application permissions. Fully customizable, the Application Scopes component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplicationScopes>;

export default meta;
type Story = StoryObj<typeof RdsCompApplicationScopes>;

export const Standard: Story = {
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
