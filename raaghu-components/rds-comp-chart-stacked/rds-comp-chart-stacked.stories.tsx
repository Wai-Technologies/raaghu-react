
import RdsCompStackedChart from "./rds-comp-chart-stacked";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Stacked Chart",
    component: RdsCompStackedChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        docs: {
            description: {
                component:
                    "The **Stacked Chart** element visualizes multiple datasets stacked on top of each other, allowing users to compare cumulative values across categories. It supports customizable datasets, colors, stacked axes, legends, tooltips, and responsive behavior.",
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
        labels: { table: { disable: true } },
        dataSets: { table: { disable: true } },
        chartLabel: { table: { disable: true } },
    },
} satisfies Meta<typeof RdsCompStackedChart>;

export default meta;
type Story = StoryObj<typeof RdsCompStackedChart>;

export const Default: Story = {
    args: {
        id: "Stacked_Chart",
        ariaLabel: "Stacked chart showing monthly values",
        data: {
            labels: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ],
            datasets: [
                {
                    label: "My Second dataset",
                    data: [
                        140, 140, 170, 235, 125, 125,
                        110, 140, 140, 170, 230, 80,
                    ],
                    borderColor: "white",
                    backgroundColor: "#62D5D9",
                    borderRadius: 3,
                },
                {
                    label: "My Third dataset",
                    data: [
                        90, 185, 110, 90, 230, 75,
                        230, 80, 180, 185, 185, 330,
                    ],
                    borderColor: "white",
                    backgroundColor: "#928AE0",
                    borderRadius: 3,
                },
                {
                    label: "My Fourth dataset",
                    data: [
                        150, 201, 160, 203, 151, 205,
                        206, 207, 208, 209, 210, 211,
                    ],
                    borderColor: "white",
                    backgroundColor: "#EDB371",
                    borderRadius: 3,
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Stacked Chart",
                },
                tooltip: {
                    mode: "index",
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        pointStyle: "triangle",
                    },
                },
            },
            interaction: {
                mode: "nearest",
                axis: "x",
                intersect: false,
            },
            scales: {
                x: {
                    axis: "x",
                    type: "category",
                    stacked: true,
                    title: {
                        display: true,
                        text: "Month",
                        padding: {
                            top: 4,
                            bottom: 4,
                        },
                        color: "#666",
                    },
                    ticks: {
                        minRotation: 0,
                        maxRotation: 50,
                        padding: 3,
                        color: "#666",
                    },
                    grid: {
                        display: true,
                        lineWidth: 1,
                        drawOnChartArea: true,
                        drawTicks: true,
                        tickLength: 8,
                        color: "rgba(0,0,0,0.1)",
                    },
                    position: "bottom",
                },
                y: {
                    axis: "y",
                    type: "linear",
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Value",
                        padding: {
                            top: 4,
                            bottom: 4,
                        },
                        color: "#666",
                    },
                    ticks: {
                        stepSize: 50,
                        color: "#666",
                    },
                    grid: {
                        display: true,
                        lineWidth: 1,
                        drawOnChartArea: true,
                        drawTicks: true,
                        tickLength: 8,
                        color: "rgba(0,0,0,0.1)",
                    },
                    position: "left",
                },
            },
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
};
