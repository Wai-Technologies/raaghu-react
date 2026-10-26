
import RdsCompDoughnutChart from "./rds-comp-chart-doughnut";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Doughnut Chart",
    component: RdsCompDoughnutChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        docs: {
            description: {
                component:
                    "The Doughnut Chart represents data as proportional segments of a circle. It supports customizable labels, datasets, titles, subtitles, legends, tooltips, and center text for dashboards and reports.",
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
    subtitle: {
        control: "text",
        description: "Smaller text displayed below the center title.",
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
    subTitleText: {
        control: false,
        table: { disable: true },
    },
    chartLabel: {
        control: false,
        table: { disable: true },
    },
},
} satisfies Meta<typeof RdsCompDoughnutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "myChart",
        titleText: "Title",
        subtitle: "Subtext",
        ariaLabel: "Doughnut chart showing five color categories",
        data: {
            labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
            datasets: [
                {
                    label: "Dataset 1",
                    data: [15, 25, 20, 15, 25],
                    backgroundColor: [
                        "#ff6384",
                        "#ff9f40",
                        "#ffcd56",
                        "#4bc0c0",
                        "#0000FF",
                    ],
                    borderColor: ["#fff"],
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
               title: {
    display: true,
    text: "Boolean Chart",
},
            },
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
} satisfies Story;

export const Advanced: Story = {
    args: {
        id: "doughnutchart",
        titleText: "Title Sample",
        subtitle: "total",
        ariaLabel: "Doughnut chart showing total sales, revenue, and expenses",
        data: {
            labels: [
                "Total Sales - 85%",
                "Revenue - 25%",
                "Expenses - 15%",
            ],
            datasets: [
                {
                    label: "Total Sales",
                    data: [85, 0, 0, 15],
                    backgroundColor: [
                        "#FF6384",
                        "#BF00BB",
                        "#7E2EEF",
                        "#d9c9ef33",
                    ],
                    borderRadius: 20,
                    borderColor: ["transparent"],
                },
                {
                    label: "Revenue",
                    data: [0, 75, 0, 25],
                    backgroundColor: [
                        "#FF6384",
                        "#BF00BB",
                        "#7E2EEF",
                        "#d9c9ef33",
                    ],
                    borderRadius: 20,
                    borderColor: ["transparent"],
                },
                {
                    label: "Expenses",
                    data: [0, 0, 55, 45],
                    backgroundColor: [
                        "#FF6384",
                        "#BF00BB",
                        "#7E2EEF",
                        "#d9c9ef33",
                    ],
                    borderRadius: 20,
                    borderColor: ["transparent"],
                },
            ],
        },
        options: {
            cutout: "80%",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: "top",
                    labels: {
                        boxWidth: 15,
                        padding: 15,
                    },
                },
                title: {
                    display: true,
                    text: "Doughnut Chart",
                },
                tooltip: {
                    enabled: false,
                },
            },
        },
    },
} satisfies Story;
