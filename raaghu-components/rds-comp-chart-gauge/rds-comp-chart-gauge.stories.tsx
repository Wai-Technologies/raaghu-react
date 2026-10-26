
import RdsCompGaugeChart from "./rds-comp-chart-gauge";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
    title: "Components/Charts/Gauge Chart",
    component: RdsCompGaugeChart,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
        controls: {
            exclude: ["value", "maxValue"],
        },
        docs: {
            description: {
                component:
                    "The Gauge Chart displays data as a semicircular meter, ideal for showing progress, performance metrics, or KPIs. It supports customizable labels, datasets, titles, subtitles, colors, legends, tooltips, and center text.",
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
        description: "Smaller text displayed below the gauge title.",
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
    value: {
        control: false,
        table: { disable: true },
    },
    maxValue: {
        control: false,
        table: { disable: true },
    },
},
} satisfies Meta<typeof RdsCompGaugeChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "gaugeChart",
        titleText: "Title",
        subtitle: "Subtitle",
        ariaLabel: "Gauge chart showing six color categories",
        data: {
            labels: ["Green", "Blue", "Yellow", "Orange", "Purple", "Red"],
            datasets: [
                {
                    label: "Gauge Data",
                    data: [15, 10, 25, 5, 15, 30],
                    backgroundColor: [
                        "#28a745",
                        "#17a2b8",
                        "#ffc107",
                        "#fd7e14",
                        "#6f42c1",
                        "#dc3545",
                    ],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole("img");
        await expect(chart).toBeInTheDocument();
    },
} satisfies Story;

export const BlueYellowOrangePurpleRed: Story = {
    args: {
        id: "gaugeChart2",
        titleText: "Title",
        subtitle: "Subtitle",
        ariaLabel: "Gauge chart showing blue, yellow, orange, purple, and red",
        data: {
            labels: ["Blue", "Yellow", "Orange", "Purple", "Red"],
            datasets: [
                {
                    label: "Gauge Data",
                    data: [20, 20, 20, 20, 20],
                    backgroundColor: [
                        "#17a2b8",
                        "#ffc107",
                        "#fd7e14",
                        "#6f42c1",
                        "#dc3545",
                    ],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    },
} satisfies Story;

export const YellowOrangePurpleRed: Story = {
    args: {
        id: "gaugeChart3",
        titleText: "Title",
        subtitle: "Subtitle",
        ariaLabel: "Gauge chart showing yellow, orange, purple, and red",
        data: {
            labels: ["Yellow", "Orange", "Purple", "Red"],
            datasets: [
                {
                    label: "Gauge Data",
                    data: [25, 25, 25, 25],
                    backgroundColor: [
                        "#ffc107",
                        "#fd7e14",
                        "#6f42c1",
                        "#dc3545",
                    ],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    },
} satisfies Story;

export const OrangePurpleRed: Story = {
    args: {
        id: "gaugeChart4",
        titleText: "Title",
        subtitle: "Subtitle",
        ariaLabel: "Gauge chart showing orange, purple, and red",
        data: {
            labels: ["Orange", "Purple", "Red"],
            datasets: [
                {
                    label: "Gauge Data",
                    data: [33.3, 33.3, 33.4],
                    backgroundColor: [
                        "#fd7e14",
                        "#6f42c1",
                        "#dc3545",
                    ],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    },
} satisfies Story;

export const PurpleRed: Story = {
    args: {
        id: "gaugeChart5",
        titleText: "Title",
        subtitle: "Subtitle",
        ariaLabel: "Gauge chart showing purple and red",
        data: {
            labels: ["Purple", "Red"],
            datasets: [
                {
                    label: "Gauge Data",
                    data: [50, 50],
                    backgroundColor: [
                        "#6f42c1",
                        "#dc3545",
                    ],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    },
} satisfies Story;

export const RedOnly: Story = {
    args: {
        id: "gaugeChart6",
        titleText: "Title",
        subtitle: "Subtitle",
        ariaLabel: "Gauge chart showing red",
        data: {
            labels: ["Red"],
            datasets: [
                {
                    label: "Gauge Data",
                    data: [100],
                    backgroundColor: ["#dc3545"],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    },
} satisfies Story;
