// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompSubscription from "./rds-comp-subscription";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//     title: "Components/Subscription",
//     component: RdsCompSubscription,
//     decorators: [
//         (StoryComponent) => (
//             <I18nextProvider i18n={i18n}>
//                 <StoryComponent />
//             </I18nextProvider>
//         ),
//     ],
// } as ComponentMeta<typeof RdsCompSubscription>;

// const Template: ComponentStory<typeof RdsCompSubscription> = (args) => (
//     <RdsCompSubscription {...args} />
// );

// export const Default = Template.bind({});

// Default.args = {
//     width: "226px",

//     subscriptionData: [
//         {
//             name: "BASIC",
//             price: "$232",
//             duration: "2 Year",
//             colorVariant: "info",
//             icon: "basic_subscription",
//             recommended: false,
//             features: [
//                 { title: "Maximum User Count", isInclude: true },
//                 { title: "Test Check feature", isInclude: false },
//                 { title: "Test check feature count 2", isInclude: false },
//             ],
//         },
//         {
//             name: "STANDARD",
//             price: "$432",
//             duration: "2 Year",
//             colorVariant: "success",
//             icon: "standard_subscription",
//             recommended: false,
//             features: [
//                 { title: "Maximum User Count", isInclude: true },
//                 { title: "Test Check feature", isInclude: true },
//                 { title: "Test check feature count 2", isInclude: false },
//             ],
//         },
//         {
//             name: "PREMIUM",
//             price: "$532",
//             duration: "2 Year",
//             colorVariant: "primary",
//             icon: "premium_subscription",
//             recommended: true,
//             features: [
//                 { title: "Maximum User Count", isInclude: true },
//                 { title: "Test Check feature", isInclude: true },
//                 { title: "Test check feature count 2", isInclude: true },
//             ],
//         },]

// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSubscription from "./rds-comp-subscription";


const meta: Meta = { 
    title: "Components/Subscription",
    component: RdsCompSubscription,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSubscription>;

export default meta;
type Story = StoryObj<typeof RdsCompSubscription>;

export const Default: Story = {
    args: {
        width: "226px",
        subscriptionData: [
                {
                    name: "BASIC",
                    price: "$232",
                    duration: "2 Year",
                    colorVariant: "info",
                    icon: "basic_subscription",
                    recommended: false,
                    features: [
                        { title: "Maximum User Count", isInclude: true },
                        { title: "Test Check feature", isInclude: false },
                        { title: "Test check feature count 2", isInclude: false },
                    ],
                },
                {
                    name: "STANDARD",
                    price: "$432",
                    duration: "2 Year",
                    colorVariant: "success",
                    icon: "standard_subscription",
                    recommended: false,
                    features: [
                        { title: "Maximum User Count", isInclude: true },
                        { title: "Test Check feature", isInclude: true },
                        { title: "Test check feature count 2", isInclude: false },
                    ],
                },
                {
                    name: "PREMIUM",
                    price: "$532",
                    duration: "2 Year",
                    colorVariant: "primary",
                    icon: "premium_subscription",
                    recommended: true,
                    features: [
                        { title: "Maximum User Count", isInclude: true },
                        { title: "Test Check feature", isInclude: true },
                        { title: "Test check feature count 2", isInclude: true },
                    ],
        },]
        
    }
} satisfies Story;
Default.parameters = { controls: { include: ['width', 'subscriptionData'] } };
