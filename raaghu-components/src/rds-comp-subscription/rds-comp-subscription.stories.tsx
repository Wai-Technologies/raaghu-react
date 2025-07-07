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

// export const Standard = Template.bind({});

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
        docs: {
    description: {
        component: 
            'The **Subscription** component is a customizable UI element designed to display and manage subscription plans within your application. It provides a structured interface for showcasing plan details such as name, price, duration, features, and recommended status. The component supports multiple subscription tiers (e.g., Basic, Standard, Premium) and allows customization of color variants, icons, and feature lists. This component is ideal for SaaS platforms, e-commerce applications, or any system requiring a user-friendly and visually appealing subscription management interface. Fully customizable, the Subscription component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSubscription>;

export default meta;
type Story = StoryObj<typeof RdsCompSubscription>;

export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['width', 'subscriptionData'] } };
