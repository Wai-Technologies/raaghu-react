import RdsCompLineChart from "./rds-comp-chart-line";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Line Chart",
    component: RdsCompLineChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        docs: {
            description: {
                component:
                    "The Line Chart displays continuous data trends over time or categories using connected points. It supports multiple datasets, customizable point shapes, colors, line tension, fill behavior, legends, tooltips, titles, and interaction settings.",
            },
        },
    },
    tags: ["autodocs", "stable"],
    argTypes: {
        className: {
            control: "text",
            description: "CSS class applied to the chart container.",
        },
        sx: {
            control: "object",
            description: "MUI system styles applied to the chart container.",
        },
        ref: {
            control: false,
            description: "React ref to the chart container; assign it in code.",
        },

        // Current API
        data: {
            description: "Chart data containing labels and datasets.",
        },
        ariaLabel: {
            control: "text",
            description: "Accessible label for the chart.",
        },

        // Hide deprecated aliases from the Docs table.
        labels: {
            control: false,
            table: { disable: true },
        },
        dataSets: {
            control: false,
            table: { disable: true },
        },
        chartLabel: {
            control: false,
            table: { disable: true },
        },
    },
} satisfies Meta<typeof RdsCompLineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "linechart",
        ariaLabel: "Line chart showing monthly data trends",
        data: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "My First Dataset",
                    data: [65, 59, 80, 78, 56, 55, 40],
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    pointStyle: "star",
                    pointRadius: 7,
                    tension: 0.1,
                    backgroundColor: "red",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: "top",
                    align: "center",
                    labels: {
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    usePointStyle: true,
                },
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: "Line Chart with boundaries",
                },
            },
            interaction: {
                intersect: false,
            },
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
} satisfies Story;
