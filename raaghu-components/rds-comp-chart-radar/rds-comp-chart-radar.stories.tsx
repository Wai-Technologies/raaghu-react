
import RdsCompRadarChart from "./rds-comp-chart-radar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Radar Chart",
    component: RdsCompRadarChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        docs: {
            description: {
                component:
                    "The Radar Chart visualizes multivariate data across multiple radial axes. It supports multiple datasets, customizable colors, fills, point styles, labels, legends, tooltips, and radial scale options.",
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
        radius: { table: { disable: true } },
    },
} satisfies Meta<typeof RdsCompRadarChart>;

export default meta;

type Story = StoryObj<typeof RdsCompRadarChart>;

export const Default: Story = {
    args: {
        id: "Radar_Chart",
        ariaLabel: "Radar chart comparing three datasets",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
            datasets: [
                {
                    label: "Dataset 1",
                    data: [0.5, 0.8, 0.4, 0.6, 0.7, 0.2, 0.9],
                    borderColor: ["#ff9f40"],
                    backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                    fill: false,
                    pointStyle: "circle",
                    pointRadius: 2,
                },
                {
                    label: "Dataset 2",
                    data: [0.9, 0.3, 0.8, 0.9, 0.1, 0.7, 0.2],
                    borderColor: ["#ff6384"],
                    backgroundColor: ["rgba(255, 206, 86, 0.2)"],
                    fill: true,
                    pointStyle: "circle",
                    pointRadius: 2,
                },
                {
                    label: "Dataset 3",
                    data: [0.7, 0.2, 0.1, 0.9, 0.8, 0.4, 0.7],
                    borderColor: ["#83BE5A"],
                    backgroundColor: ["rgba(255, 240, 204, 0.2)"],
                    fill: false,
                    pointStyle: "circle",
                    pointRadius: 2,
                },
            ],
        },
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: "Radar Chart",
                },
                legend: {
                    position: "top",
                    align: "start",
                    labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 500,
                        },
                    },
                },
                tooltip: {
                    usePointStyle: true,
                },
            },
            scales: {
                r: {
                    type: "radialLinear",
                    display: true,
                    startAngle: 0,
                    angleLines: {
                        display: true,
                        lineWidth: 1,
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                    grid: {
                        circular: false,
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                    ticks: {
                        showLabelBackdrop: true,
                        color: "#666",
                        padding: 3,
                        backdropColor: "rgba(255, 255, 255, 0.75)",
                        backdropPadding: 2,
                    },
                    pointLabels: {
                        display: true,
                        font: {
                            size: 10,
                        },
                        padding: 5,
                        centerPointLabels: false,
                        color: "#666",
                    },
                    beginAtZero: false,
                },
            },
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
};
