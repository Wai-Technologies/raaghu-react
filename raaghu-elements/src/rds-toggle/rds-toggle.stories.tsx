import React from "react";
import RdsToggle from "./rds-toggle";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Toggle',
    component: RdsToggle,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsToggle>;

export default meta;
type Story = StoryObj<typeof RdsToggle>;

export const Default: Story = {
    args: {
        iconOnUncheck: "",
        iconOnCheck: "",
        small: false
    }
} satisfies Story;

Default.parameters = { controls: { include: [] } };
