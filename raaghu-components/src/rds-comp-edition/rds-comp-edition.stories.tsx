import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEdition from "./rds-comp-edition";


const meta: Meta = {
    title: "Components/Edition",
    component: RdsCompEdition,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEdition>;

export default meta;
type Story = StoryObj<typeof RdsCompEdition>;

export const Default: Story = {
    args: {
        EditionItems: {
            EditionName: "Corporate",
            EditionTitle: "Strong Application for large team",
            Price: "45",
            Plan: "Per month",
        },
        features: [
            "Maximum User Count",
            "Test Check feature",
            "Test check feature count 2",
        ],
    }
} satisfies Story;