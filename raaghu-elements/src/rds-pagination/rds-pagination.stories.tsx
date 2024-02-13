import React from "react";
import RdsPagination from "./rds-pagination";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Pagination',
    component: RdsPagination,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        paginationType: {
            options: [
                "default",
                "advance"
            ],
            control: { type: "select" },
        },
        alignmentType: {
            options: [
                "start",
                "center",
                "end"
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsPagination>;

export default meta;
type Story = StoryObj<typeof RdsPagination>;

export const Default: Story = {
    args: {
        paginationType: "default",
        totalRecords: 10,
        recordsPerPage: 3,
        size: "sm",
        alignmentType: "start",
    }
} satisfies Story;

export const Advanced: Story = {
    args: {
        paginationType: "advance",
        totalRecords: 10,
        recordsPerPage: 3,
        size: "sm",
        alignmentType: "start"
    }
} satisfies Story;


