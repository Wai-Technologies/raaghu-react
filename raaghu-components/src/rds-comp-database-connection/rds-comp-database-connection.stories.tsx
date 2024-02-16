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
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDatabaseConnection>;

export default meta;
type Story = StoryObj<typeof RdsCompDatabaseConnection>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;


