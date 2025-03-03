import RdsBubbleChart from "./rds-chart-bubble";
import "./rds-chart-bubble.css";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Bubble Chart',
    component: RdsBubbleChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsBubbleChart>;

export default meta;
type Story = StoryObj<typeof RdsBubbleChart>;

export const BubbleChart: Story = {
    args: {
        id: "bubblecha",
        labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        dataSets: [
            {
                label: "Dataset 1",
                data: [90, 97, 20, 30, 40, 50, 60, 70],
                borderColor: ["red"],
                backgroundColor: ["rgba(255, 99, 132)"],
            },
            {
                label: "Dataset 2",
                data: [90, 80, 70, 60, 50, 40, 30, 90, 98],
                borderColor: ["orange"],
                backgroundColor: ["rgba(255, 206, 86)"],
            }
        ],


        options: {
            responsive: true,
            radius: 10,
            maintainAspectRatio: false,
            pointStyle: "triangle",
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
                    text: "Bubble Chart"
                }
            },

        },
    }
};
