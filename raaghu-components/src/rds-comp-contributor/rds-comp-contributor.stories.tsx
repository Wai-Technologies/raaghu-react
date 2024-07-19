import type { Meta, StoryObj } from '@storybook/react';
import RdsCompContributor from "./rds-comp-contributor";

const meta: Meta = {
    title: "Components/Contributor",
    component: RdsCompContributor,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompContributor>;

export default meta;
type Story = StoryObj<typeof RdsCompContributor>;

export const Default: Story = {
    args: {}
} satisfies Story;




