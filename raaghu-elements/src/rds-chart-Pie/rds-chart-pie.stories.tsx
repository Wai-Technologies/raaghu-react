import RdsPieChart from "./rds-chart-pie";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Pie Chart',
    component: RdsPieChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        radius: { control: 'number' }, 
    },
} satisfies Meta<typeof RdsPieChart>;

export default meta;
type Story = StoryObj<typeof RdsPieChart>;

export const PieChart: Story = {
    args: {
        id: "chart pie",
        radius: 100,
        labels: ["red", "Orange", "Yellow", "Green", "Blue"],
        options: {
            circumference: 360,
            maintainAspectRatio: false,
            animation: {
                animateRotate: false,
                animateScale: true,
            },
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    pointStyle: "line",
                    labels: {
                        pointStyleWidth: 13,
                        usePointStyle: true,
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 30,
                        height: 5,
                    },
                },
                title: {
                    display: true,
                    text: "Pie Chart",
                },
            },
        },
        dataSets: [
            {
                label: "Dataset1",
                data: [20, 10, 20, 40, 10],
                backgroundColor: [
                    "#ff6384",
                    "#ff9f40",
                    "#ffcd56",
                    "#4bc0c0",
                    "#059bff",
                ],
                borderColor: ["#fff"],
                borderWidth: 1,
            },
        ],
    },
};
