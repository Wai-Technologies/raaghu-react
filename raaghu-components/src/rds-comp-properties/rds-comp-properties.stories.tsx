import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProperties from "./rds-comp-properties";


const meta: Meta = { 
    title: "Components/Properties",
    component: RdsCompProperties,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompProperties>;

export default meta;
type Story = StoryObj<typeof RdsCompProperties>;

export const Default: Story = {
    args: {
        displayType: "basic",
        propertyHeaders: [
                    { displayName: "Member", key: "member", datatype: "avatarTitleInfo", sortable: false },
                    { displayName: "Cases", key: "cases", datatype: "number", sortable: false, },
                    { displayName: "Active", key: "active", datatype: "number", sortable: false },
                    { displayName: "Closed", key: "closed", datatype: "number", sortable: false },
                    { displayName: "Rate", key: "rate", datatype: "number", sortable: false },
                ],
                propertyData: [
                    {
                        "cases": 10,
                        "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
                        "active": 38,
                        "closed": 10,
                        "rate": 92,
                    },
                    {
                        "cases": 18,
                        "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
                        "active": 342,
                        "closed": 25,
                        "rate": 42
                    },
                    {
                        "cases": 7,
                        "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
                        "active": 25,
                        "closed": 5,
                        "rate": 96
                    },
                    {
                        "cases": 14,
                        "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
                        "active": 42,
                        "closed": 42,
                        "rate": 16
                    }
                ]
    }
} satisfies Story;

export const Advanced: Story = {
    args: {
        displayType: "advanced",
    }
} satisfies Story;
