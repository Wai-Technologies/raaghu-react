import type { Meta, StoryObj } from '@storybook/react';
import RdsCompClientResource from "./rds-comp-client-resources";


const meta: Meta = {
    title: "Components/Client Resource",
    component: RdsCompClientResource,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompClientResource>;

export default meta;
type Story = StoryObj<typeof RdsCompClientResource>;

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