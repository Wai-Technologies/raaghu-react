// /* eslint-disable */
// import React from 'react';
// import './rds-comp-database-connection';
// import RdsCompDatabaseConnection from './rds-comp-database-connection';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../../.storybook/i18n';
// import { ComponentStory, ComponentMeta } from "@storybook/react";

// export default {
//   title: "Components/Database Connection",
//   component: RdsCompDatabaseConnection,
//   decorators: [
//     (StoryComponent) => (
//       <I18nextProvider i18n={i18n}>
//         <StoryComponent />
//       </I18nextProvider>
//     ),
//   ],
// } as ComponentMeta<typeof RdsCompDatabaseConnection>;


// const Template: ComponentStory<typeof RdsCompDatabaseConnection> = (args) => (
//   <RdsCompDatabaseConnection {...args} />
// );

// export const Database_Connection = Template.bind({});

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDatabaseConnection from './rds-comp-database-connection';


const meta: Meta = { 
    title: "Components/Database Connection",
    component: RdsCompDatabaseConnection,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Database Connection** component is a customizable UI element designed to facilitate the configuration and management of database connections within your application. It provides a structured interface for users to input and manage connection details, such as database type, host, port, username, and password. This component is ideal for administrative dashboards, system configuration panels, or any interface requiring database connection setup. Fully customizable, the Database Connection component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDatabaseConnection>;

export default meta;
type Story = StoryObj<typeof RdsCompDatabaseConnection>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;


