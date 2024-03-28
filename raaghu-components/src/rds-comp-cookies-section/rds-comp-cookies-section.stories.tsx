import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCookiesSection from "./rds-comp-cookies-section";

const meta: Meta = {
    title: "Components/Cookies Section",
    component: RdsCompCookiesSection,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCookiesSection>;

export default meta;
type Story = StoryObj<typeof RdsCompCookiesSection>;

export const Default: Story = {
    args: {
        showDeclineButton: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['showDeclineButton'] } };




