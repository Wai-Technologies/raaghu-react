
import RdsCompMixedChart from "./rds-comp-chart-mixed";
import "./rds-comp-chart-mixed.scss";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Mixed Chart",
    component: RdsCompMixedChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        docs: {
            description: {
                component:
                    "The Mixed Chart combines multiple chart types, such as bars and lines, in one visualization. Each dataset can define its own type, colors, and rendering order. The chart supports configurable labels, legends, tooltips, and responsive layouts for dashboards and reports.",
            },
        },
    },
    tags: ["autodocs", "stable"],
 argTypes: {
    data: {
        control: "object",
        description:
            "Chart.js data containing labels and datasets. Set type to bar or line on each dataset.",
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
} satisfies Meta<typeof RdsCompMixedChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "mixed_chart",
        ariaLabel: "Mixed chart comparing bar and line datasets",
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
                    type: "bar",
                    label: "Bar Dataset",
                    data: [0, 37, -3, 70, -25, 50, -24],
                    backgroundColor: "rgb(248, 188, 198)",
                    borderColor: "rgb(248, 188, 198)",
                    order: 0,
                },
                {
                    type: "line",
                    label: "Line Dataset",
                    pointStyle: "triangle",
                    pointRadius: 10,
                    data: [25, 5, 90, 78, 17, 17, -98],
                    borderColor: "blue",
                    backgroundColor: "blue",
                    order: 1,
                },
            ],
        },
        options: {
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
            },
            responsive: true,
            maintainAspectRatio: false,
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
} satisfies Story;
