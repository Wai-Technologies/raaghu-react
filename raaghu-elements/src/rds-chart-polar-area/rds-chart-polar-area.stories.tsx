import RdsPolarAreaChart from "./rds-chart-polar-area";
import "./rds-chart-polar-area.css";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Polar Area Chart',
    component: RdsPolarAreaChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsPolarAreaChart>;

export default meta;
type Story = StoryObj<typeof RdsPolarAreaChart>;

export const PolarAreaChart: Story = {
    args: {
        id: "Polar_Area_chart",
        radius: 300,
        dataSets: [
            {
                label: "Dataset 1",
                data: [100, 70, 80, 96, 87, 77],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(167, 145, 78, 0.2)"
                ],
                borderColor: [
                    "#fff",
                ],
            }
        ],
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        options: {
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: false
            },
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    pointStyle: "line",

                    labels: {

                        usePointStyle: true
                    }
                },
                tooltip: {
                    usePointStyle: true,
                },
                title: {
                    display: true,
                    text: "Polar Area Chart"
                }
            }
        },
    }
};
