import React from "react";
import RdsPagination from "./rds-pagination";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Pagination',
    component: RdsPagination,
    parameters: {
        layout: 'padded',
     docs: {
     description: {
        component:
            'The **Pagination** element is a navigation component that helps users move through large sets of content by dividing them into multiple pages. It supports different styles and sizes (`small`, `medium`, `large`). You can enable features like first and last page buttons, manual page input, a dropdown for quick page selection, and a legend to display the current page status. This component is fully customizable, making it ideal for tables, lists, or any interface where content needs to be paginated for better usability and performance.'
    }
}
    },
    tags: ['autodocs'],
    argTypes: {
        paginationType: {
            options: [
                "default"
                //"advanced"
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
        style: {
            options : ["Style1", "Style2", "Style3", "Style4", "Style5", "Style6", "Style7", "Style8", "Style9", "Style10","Style11"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsPagination>;

export default meta;
type Story = StoryObj<typeof RdsPagination>;

// export const Default: Story = {
//     args: {
//         paginationType: "default",
//         totalRecords: 10,  // Ensure this value matches your test cases
//         recordsPerPage: 3, // This will yield 4 pages total
//         size: "small",
//         alignmentType: "start",
//     }
// } satisfies Story;
// Default.parameters = { controls: { include: ['paginationType', 'totalRecords', 'recordsPerPage', 'size', 'alignmentType'] } };

// export const Advanced: Story = {
//     args: {
//         paginationType: "advanced",
//         totalRecords: 10,
//         recordsPerPage: 3,
//         size: "small",
//         alignmentType: "start",
//         style: "Style1",
//         showFirst: true,
//         showLast:true,
//         showManualInput:true,
//         showDropdown:true,
//         showLegend:true,
//     }
// } satisfies Story;
// Advanced.parameters = { controls: { include: ['paginationType', 'totalRecords', 'recordsPerPage', 'size', 'alignmentType','style','showFirst','showLast','showManualInput','showDropdown','showLegend'] } };

export const Default: Story = {
    args: {
        paginationType: "default",
        totalRecords: 10,
        recordsPerPage: 3,
        size: "small",
        alignmentType: "start",
        style: "Style1",
        showFirst: true,
        showLast:true,
        showManualInput:true,
        showDropdown:true,
        showLegend:true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['style','showFirst','showLast','showManualInput','showDropdown','showLegend'] } };
