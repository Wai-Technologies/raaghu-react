
// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompApiScopeBasicResource from "./rds-comp-api-scope-basic-resource";

// export default {
//     title: "Components/Api Scope Basic Resource",
//     component: RdsCompApiScopeBasicResource,

// } as ComponentMeta<typeof RdsCompApiScopeBasicResource>;


// const Template: ComponentStory<typeof RdsCompApiScopeBasicResource> = (args) => (
//     <RdsCompApiScopeBasicResource {...args} />
// );

// export const ApiScopeBasicResource = Template.bind({});

// ApiScopeBasicResource.args = {
//     resourceData: {
//         "Name": "",
//         "Displayname": "",
//         "Description": "",
//         checklist: [
//             {
//                 "id": 1,
//                 "label": "Enables",
//                 "checked": false,
//                 "disabled": false
//             },
//             {
//                 "id": 2,
//                 "label": "Required",
//                 "checked": false,
//                 "disabled": false
//             },
//             {
//                 "id": 3,
//                 "label": "Emphasize",
//                 "checked": false,
//                 "disabled": false
//             },
//             {
//                 "id": 4,
//                 "label": "Show in discovery Documents",
//                 "checked": false,
//                 "disabled": false
//             },
//         ]

//     }
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApiScopeBasicResource from './rds-comp-api-scope-basic-resource';

const meta: Meta = { 
    title: "Components/Api Scope Basic Resource",
    component: RdsCompApiScopeBasicResource,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApiScopeBasicResource>;

export default meta;
type Story = StoryObj<typeof RdsCompApiScopeBasicResource>;

export const Default: Story = {
    args: {
        // resourceData: {
        //             "Name": "",
        //             "Displayname": "",
        //             "Description": "",
        //             checklist: [
        //                 {
        //                     "id": 1,
        //                     "label": "Enables",
        //                     "checked": false,
        //                     "disabled": false
        //                 },
        //                 {
        //                     "id": 2,
        //                     "label": "Required",
        //                     "checked": false,
        //                     "disabled": false
        //                 },
        //                 {
        //                     "id": 3,
        //                     "label": "Emphasize",
        //                     "checked": false,
        //                     "disabled": false
        //                 },
        //                 {
        //                     "id": 4,
        //                     "label": "Show in discovery Documents",
        //                     "checked": false,
        //                     "disabled": false
        //                 },
        //             ]
            
        //         }
    }
} satisfies Story;