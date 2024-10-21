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
                "advanced"
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
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsPagination>;

export default meta;
type Story = StoryObj<typeof RdsPagination>;

export const Default: Story = {
    args: {
        paginationType: "default",
        totalRecords: 10,  // Ensure this value matches your test cases
        recordsPerPage: 3, // This will yield 4 pages total
        size: "small",
        alignmentType: "start",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['paginationType', 'totalRecords', 'recordsPerPage', 'size', 'alignmentType'] } };

export const Advanced: Story = {
    args: {
        paginationType: "advanced",
        totalRecords: 10,
        recordsPerPage: 3,
        size: "small",
        alignmentType: "start"
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['paginationType', 'totalRecords', 'recordsPerPage', 'size', 'alignmentType'] } };
