import type { Meta, StoryObj } from '@storybook/react';
import RdsCompHierarcy from "./rds-comp-hierarcy";


const meta: Meta = { 
    title: "Components/Hierarcy",
    component: RdsCompHierarcy,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompHierarcy>;

export default meta;
type Story = StoryObj<typeof RdsCompHierarcy>;

export const Default: Story = {
    args: {
        mutable: true,
        ButtonLabel: "New Node",
        TreeType: "IconLabel",
        treeData: [
    
            {
                "ItemCode": "L1N1",
                "ItemDescription": "CEO",
                "level": 1,
                "children": [
                    {
                        "ItemCode": "L2N2",
                        "ItemDescription": "Head Of Marketing",
                        "level": 2,
                        "children": [],
                        "selected": true
                    },
                    {
                        "ItemCode": "L2N2",
                        "ItemDescription": "Head of HR",
                        "level": 2,
                        "children": [
                            {
                                "ItemCode": "L21N1",
                                "ItemDescription": "Senior Manager",
                                "level": 3,
                                "children": [],
                                "selected": true
                            }, {
                                "ItemCode": "L21N2",
                                "ItemDescription": "Executive",
                                "level": 3,
                                "children": [],
                                "selected": true
                            },
                            {
                                "ItemCode": "L21N3",
                                "ItemDescription": "Assistant",
                                "level": 3,
                                "children": [],
                                "selected": true
                            },
    
                        ],
                        "selected": false
                    }
                    ,
                    {
                        "ItemCode": "L2N3",
                        "ItemDescription": "Head of HR",
                        "level": 2,
                        "children": [
                            {
                                "ItemCode": "L31N1",
                                "ItemDescription": "Executive",
                                "level": 3,
                                "children": [],
                                "selected": true
                            }, {
                                "ItemCode": "L31N2",
                                "ItemDescription": " Assistant 1",
                                "level": 3,
                                "children": [],
                                "selected": true
                            },
                            {
                                "ItemCode": "L31N3",
                                "ItemDescription": "Assistant 1",
                                "level": 3,
                                "children": [],
                                "selected": true
                            },
    
                        ],
                        "selected": false
                    }
                ],
                "selected": true
            }
        ],
        nodeColor: [
            "#6E4D9F",
            "#0D79AE",
            "#14A94B",
            "#FBA919"
        ]
    }
} satisfies Story;




