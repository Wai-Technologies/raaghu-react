// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompApiScopeResource from "./rds-comp-api-scope-resource";

// export default {
//     title: "Components/ApiScopeResource",
//     component: RdsCompApiScopeResource,
// } as ComponentMeta<typeof RdsCompApiScopeResource>;

// const Template: ComponentStory<typeof RdsCompApiScopeResource> = (args) => (
//     <RdsCompApiScopeResource {...args} />
// );

// export const ApiScopeResource = Template.bind({});

// ApiScopeResource.args = {
//     role: "advanced",
//     resources: [
//         {
//             id: 1,
//             displayName: "A - E",
//             selected: false,
//             select: false,
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
//             select: false,
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
//             select: false,
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
import RdsCompApiScopeResource from "./rds-comp-api-scope-resource";

const meta: Meta = { 
    title: "Components/Api Scope Resource",
    component: RdsCompApiScopeResource,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApiScopeResource>;

export default meta;
type Story = StoryObj<typeof RdsCompApiScopeResource>;

export const Default: Story = {
    args: {
    role: "basic",
    resources: [
        {
            id: 1,
            displayName: "A - E",
            selected: false,
            select: false,
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
            select: false,
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
            select: false,
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