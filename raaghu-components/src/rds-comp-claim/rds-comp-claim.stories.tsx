// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompClaim from "./rds-comp-claim";

// export default {
//     title: "Components/Claim",
//     component: RdsCompClaim,

//     argTypes: {
//         onCreate: { action: "Created" },
//         onCancel: { action: " cancelled" },
//     },
// } as ComponentMeta<typeof RdsCompClaim>;

// const Template: ComponentStory<typeof RdsCompClaim> = (args) => (
//     <RdsCompClaim {...args} />
// );

// export const Claim = Template.bind({});

// Claim.args = {
//     resources: [
//         {
//             id: 1,
//             displayName: "A - E",
//             selected: false,
//             children: [
//                 {
//                     id: 1,
//                     p_id: 1,
//                     displayName: "Availability",
//                     selected: false,
//                 },
//                 {
//                     id: 2,
//                     p_id: 1,
//                     displayName: "Apiopolis",
//                     selected: false,
//                 },
//                 {
//                     id: 3,
//                     p_id: 1,
//                     displayName: "Apigenix",
//                     selected: false,
//                 },
//                 {
//                     id: 4,
//                     p_id: 1,
//                     displayName: "Best Selector",
//                     selected: false,
//                 },
//                 {
//                     id: 5,
//                     p_id: 1,
//                     displayName: "Best Selector",
//                     selected: false,
//                 },
//                 {
//                     id: 6,
//                     p_id: 1,
//                     displayName: "Creative",
//                     selected: false,
//                 },
//                 {
//                     id: 7,
//                     p_id: 1,
//                     displayName: "ALT Genix Api",
//                     selected: false,
//                 },
//                 {
//                     id: 8,
//                     p_id: 1,
//                     displayName: "Dev Support Api",
//                     selected: false,
//                 },
//             ],
//         },
//         {
//             id: 2,
//             displayName: "F - O",
//             selected: false,
//             children: [
//                 {
//                     id: 1,
//                     p_id: 2,
//                     displayName: "Availability",
//                     selected: false,
//                 },
//                 {
//                     id: 2,
//                     p_id: 2,
//                     displayName: "Apiopolis",
//                     selected: false,
//                 },
//                 {
//                     id: 3,
//                     p_id: 2,
//                     displayName: "Apigenix",
//                     selected: false,
//                 },
//                 {
//                     id: 4,
//                     p_id: 2,
//                     displayName: "Best Selector",
//                     selected: false,
//                 },
//                 {
//                     id: 5,
//                     p_id: 2,
//                     displayName: "Best Selector",
//                     selected: false,
//                 },
//                 {
//                     id: 6,
//                     p_id: 2,
//                     displayName: "Creative",
//                     selected: false,
//                 },
//                 {
//                     id: 7,
//                     p_id: 2,
//                     displayName: "ALT Genix Api",
//                     selected: false,
//                 },
//                 {
//                     id: 8,
//                     p_id: 2,
//                     displayName: "Dev Support Api",
//                     selected: false,
//                 },
//             ],
//         },
//         {
//             id: 3,
//             displayName: "P - Z",
//             selected: false,
//             children: [
//                 {
//                     id: 1,
//                     p_id: 3,
//                     displayName: "Availability",
//                     selected: false,
//                 },
//                 {
//                     id: 2,
//                     p_id: 3,
//                     displayName: "Apiopolis",
//                     selected: false,
//                 },
//                 {
//                     id: 3,
//                     p_id: 3,
//                     displayName: "Apigenix",
//                     selected: false,
//                 },
//                 {
//                     id: 4,
//                     p_id: 3,
//                     displayName: "Best Selector",
//                     selected: false,
//                 },
//                 {
//                     id: 5,
//                     p_id: 3,
//                     displayName: "Best Selector",
//                     selected: false,
//                 },
//                 {
//                     id: 6,
//                     p_id: 3,
//                     displayName: "Creative",
//                     selected: false,
//                 },
//                 {
//                     id: 7,
//                     p_id: 3,
//                     displayName: "ALT Genix Api",
//                     selected: false,
//                 },
//                 {
//                     id: 8,
//                     p_id: 3,
//                     displayName: "Dev Support Api",
//                     selected: false,
//                 },
//             ],
//         },
//     ],
// };


import type { Meta, StoryObj } from '@storybook/react';
import RdsCompClaim from "./rds-comp-claim";


const meta: Meta = { 
    title: "Components/Claim",
    component: RdsCompClaim,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Claim** component is a dynamic and interactive UI element designed to display and manage hierarchical resource data. It supports features such as grouping resources into categories (e.g., "A - E", "F - O", "P - Z") and organizing them in a nested structure with parent-child relationships. Each resource can be selected or deselected, making it ideal for applications requiring resource management, such as dashboards, content management systems, or enterprise tools. Fully customizable, the Claim component ensures seamless integration with your design system while providing a user-friendly interface for managing and visualizing complex data structures effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompClaim>;

export default meta;
type Story = StoryObj<typeof RdsCompClaim>;

export const Default: Story = {
    args: {
        resources: [
                    {
                        id: 1,
                        displayName: "A - E",
                        selected: false,
                        children: [
                            {
                                id: 1,
                                p_id: 1,
                                displayName: "Availability",
                                selected: false,
                            },
                            {
                                id: 2,
                                p_id: 1,
                                displayName: "Apiopolis",
                                selected: false,
                            },
                            {
                                id: 3,
                                p_id: 1,
                                displayName: "Apigenix",
                                selected: false,
                            },
                            {
                                id: 4,
                                p_id: 1,
                                displayName: "Best Selector",
                                selected: false,
                            },
                            {
                                id: 5,
                                p_id: 1,
                                displayName: "Best Selector",
                                selected: false,
                            },
                            {
                                id: 6,
                                p_id: 1,
                                displayName: "Creative",
                                selected: false,
                            },
                            {
                                id: 7,
                                p_id: 1,
                                displayName: "ALT Genix Api",
                                selected: false,
                            },
                            {
                                id: 8,
                                p_id: 1,
                                displayName: "Dev Support Api",
                                selected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        displayName: "F - O",
                        selected: false,
                        children: [
                            {
                                id: 1,
                                p_id: 2,
                                displayName: "Availability",
                                selected: false,
                            },
                            {
                                id: 2,
                                p_id: 2,
                                displayName: "Apiopolis",
                                selected: false,
                            },
                            {
                                id: 3,
                                p_id: 2,
                                displayName: "Apigenix",
                                selected: false,
                            },
                            {
                                id: 4,
                                p_id: 2,
                                displayName: "Best Selector",
                                selected: false,
                            },
                            {
                                id: 5,
                                p_id: 2,
                                displayName: "Best Selector",
                                selected: false,
                            },
                            {
                                id: 6,
                                p_id: 2,
                                displayName: "Creative",
                                selected: false,
                            },
                            {
                                id: 7,
                                p_id: 2,
                                displayName: "ALT Genix Api",
                                selected: false,
                            },
                            {
                                id: 8,
                                p_id: 2,
                                displayName: "Dev Support Api",
                                selected: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        displayName: "P - Z",
                        selected: false,
                        children: [
                            {
                                id: 1,
                                p_id: 3,
                                displayName: "Availability",
                                selected: false,
                            },
                            {
                                id: 2,
                                p_id: 3,
                                displayName: "Apiopolis",
                                selected: false,
                            },
                            {
                                id: 3,
                                p_id: 3,
                                displayName: "Apigenix",
                                selected: false,
                            },
                            {
                                id: 4,
                                p_id: 3,
                                displayName: "Best Selector",
                                selected: false,
                            },
                            {
                                id: 5,
                                p_id: 3,
                                displayName: "Best Selector",
                                selected: false,
                            },
                            {
                                id: 6,
                                p_id: 3,
                                displayName: "Creative",
                                selected: false,
                            },
                            {
                                id: 7,
                                p_id: 3,
                                displayName: "ALT Genix Api",
                                selected: false,
                            },
                            {
                                id: 8,
                                p_id: 3,
                                displayName: "Dev Support Api",
                                selected: false,
                            },
                        ],
                    },
                ],
    }
} satisfies Story;