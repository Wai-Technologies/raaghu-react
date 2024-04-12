import type { Meta, StoryObj } from '@storybook/react';
import RdsCompContactUs from "./rds-comp-contact-us";

const meta: Meta = {
    title: "Components/Contact Us",
    component: RdsCompContactUs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompContactUs>;

export default meta;
type Story = StoryObj<typeof RdsCompContactUs>;

export const Default: Story = {
    args: {}
} satisfies Story;
//Default.parameters = { controls: { include: [] } };




