
import RdsCompBubbleChart from "./rds-comp-chart-bubble";
import "./rds-comp-chart-bubble.scss";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Bubble Chart",
    component: RdsCompBubbleChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        docs: {
            description: {
                component:
                    "The Bubble Chart displays multidimensional data, where each point represents x, y, and radius values. It supports multiple datasets, customizable colors, point shapes, tooltips, legends, and titles.",
            },
        },
    },
    tags: ["autodocs", "stable"],
   argTypes: {
    data: {
        control: "object",
        description: "Chart.js data containing labels and datasets.",
    },
    options: {
        control: "object",
        description: "Chart.js configuration options.",
    },
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
    ariaLabel: {
        control: "text",
        description: "Accessible label for the chart.",
    },
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
} satisfies Meta<typeof RdsCompBubbleChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "bubblecha",
        ariaLabel: "Bubble chart showing two datasets",
        data: {
            labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            datasets: [
                {
                    label: "Dataset 1",
                    pointStyle: "triangle",
                    data: [
                        { x: 10, y: 90, r: 10 },
                        { x: 20, y: 97, r: 12 },
                        { x: 30, y: 20, r: 8 },
                        { x: 40, y: 30, r: 10 },
                        { x: 50, y: 40, r: 12 },
                        { x: 60, y: 50, r: 10 },
                        { x: 70, y: 60, r: 8 },
                        { x: 80, y: 70, r: 10 },
                    ],
                    borderColor: ["red"],
                    backgroundColor: ["rgba(255, 99, 132)"],
                },
                {
                    label: "Dataset 2",
                    data: [
                        { x: 10, y: 90, r: 8 },
                        { x: 20, y: 80, r: 10 },
                        { x: 30, y: 70, r: 12 },
                        { x: 40, y: 60, r: 10 },
                        { x: 50, y: 50, r: 8 },
                        { x: 60, y: 40, r: 10 },
                        { x: 70, y: 30, r: 12 },
                        { x: 80, y: 90, r: 10 },
                        { x: 90, y: 98, r: 8 },
                    ],
                    borderColor: ["orange"],
                    backgroundColor: ["rgba(255, 206, 86)"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    usePointStyle: true,
                },
                title: {
                    display: true,
                    text: "Bubble Chart",
                },
            },
        },
    },
    parameters: {
        controls: {
            exclude: ["chartWidth", "chartStyle"],
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
};
