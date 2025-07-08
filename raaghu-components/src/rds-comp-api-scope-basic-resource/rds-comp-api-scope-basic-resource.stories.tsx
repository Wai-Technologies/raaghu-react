
// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react-vite";
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

import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompApiScopeBasicResource from './rds-comp-api-scope-basic-resource';

const meta: Meta = { 
    title: "Components/Api Scope Basic Resource",
    component: RdsCompApiScopeBasicResource,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Api Scope Basic Resource** component is a customizable UI element designed to manage and configure basic settings for API scopes within your application. It supports features such as defining resource data through properties like `Name`, `Displayname`, and `Description`, along with a checklist of options to enable or disable specific attributes. The checklist includes options such as `Enables`, `Required`, `Emphasize`, and `Show in discovery Documents`, allowing for granular control over the scope’s behavior. Fully customizable, this component is ideal for administrative interfaces or API management dashboards, simplifying the process of configuring API scopes while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApiScopeBasicResource>;

export default meta;
type Story = StoryObj<typeof RdsCompApiScopeBasicResource>;

export const Standard: Story = {
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