// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react-vite";
// import RdsLinkedAccount from "./rds-comp-linked-account";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//   title: "Components/Linked Account",
//   component: RdsLinkedAccount,
//   decorators: [
//     (StoryComponent) => (
//       <I18nextProvider i18n={i18n}>
//         <StoryComponent />
//       </I18nextProvider>
//     ),
//   ],
// } as ComponentMeta<typeof RdsLinkedAccount>;

// const Template: ComponentStory<typeof RdsLinkedAccount> = (args) => (
//   <RdsLinkedAccount {...args} />
// );

// export const LinkedAccount = Template.bind({});
// LinkedAccount.args = {

// };

import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsLinkedAccount from "./rds-comp-linked-account";


const meta: Meta = { 
  title: "Components/Linked Account",
    component: RdsLinkedAccount,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Linked Account** component is a customizable UI element designed to manage and display linked accounts within your application. It provides a structured interface for users to view, link, or unlink external accounts, making it ideal for authentication systems, user profile management, or any application requiring account linking functionality. Fully customizable, the Linked Account component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsLinkedAccount>;

export default meta;
type Story = StoryObj<typeof RdsLinkedAccount>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




