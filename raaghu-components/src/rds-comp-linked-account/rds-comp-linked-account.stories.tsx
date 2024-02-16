// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
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

import type { Meta, StoryObj } from '@storybook/react';
import RdsLinkedAccount from "./rds-comp-linked-account";


const meta: Meta = { 
  title: "Components/Linked Account",
    component: RdsLinkedAccount,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsLinkedAccount>;

export default meta;
type Story = StoryObj<typeof RdsLinkedAccount>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




