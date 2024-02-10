import React from "react";
import { ComponentStory, ComponentMeta, StoryObj, Meta } from "@storybook/react";
import RdsBarChart from "./rds-chart-bar";
import "./rds-chart-bar.css";

const meta: Meta = {
    title: 'Charts/Bar Chart',
    component: RdsBarChart,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsBarChart>;

export default meta;
type Story = StoryObj<typeof RdsBarChart>;



export const HorizontalBarChart: Story = {
    args: {
        id: 1,
        height: 300,
        width: 300,
        dataSets: [
            {
                label: "Dataset 1",
                data: [20, 30, 50, 80, 98, 95, 55],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)"
            },
            {
                label: "Dataset 2",
                data: [15, 67, 34, 78, 45, 87, 76],
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
                label: "Dataset 3",
                data: [31, 52, 43, 91, 74, 93, 76],
                backgroundColor: "rgba(255, 159, 64, 1)",
            }
        ],
        labels: ["January", "February", "March", "April", "May", "June", "July"],

        options: {
            responsive: true,
            aspectRatio: 2,
            maintainAspectRatio: false,
            indexAxis: "y",
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            layout: {
                padding: 3
            },
            plugins: {
                legend: {
                    position: "top",
                    pointStyle: "line",

                    labels: {

                        usePointStyle: true,
                        pointStyleWidth: 13,
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 30,
                        height: 5,
                    }
                },
                tooltip: {
                    usePointStyle: true,
                },
                title: {
                    display: true,
                    text: "Horizontal Bar Chart"
                }
            }
        },
    }
} satisfies Story;


export const VerticalBarChart: Story = {
    args: {
        id: 1,
        height: 300,
        width: 300,
        dataSets: [
            {
                label: "Dataset 1",
                data: [20, 30, 50, 80, 98, 95, 55],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)"
            },
            {
                label: "Dataset 2",
                data: [15, 67, 34, 78, 45, 87, 76],
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
                label: "Dataset 3",
                data: [31, 52, 43, 91, 74, 93, 76],
                backgroundColor: "rgba(255, 159, 64, 1)",
            }
        ],
        labels: ["January", "February", "March", "April", "May", "June", "July"],

        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Vertical Bar Chart"
                }
            }
        }
    }
} satisfies Story;

export const StackedBarChart :Story={
    args:{
        id: 1,
        height: 300,
        width: 300,
        dataSets: [
            {
                label: "Dataset 1",
                data: [20, 30, 50, 80, 98, 95, 55],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)"
            },
            {
                label: "Dataset 2",
                data: [15, 67, 34, 78, 45, 87, 76],
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
                label: "Dataset 3",
                data: [31, 52, 43, 91, 74, 93, 76],
                backgroundColor: "rgba(255, 159, 64, 1)",
            }
        ],
        labels: ["January", "February", "March", "April", "May", "June", "July"],

        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Stacked Bar Chart"
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    }
} satisfies Story;


export const BarChartWithBorderRadius:Story={
    args:{
        id: 1,
        height: 300,
        width: 300,
        dataSets: [
            {
                label: "Fully Rounded",
                data: [20, 30, 50, 80, 98, 95, 55],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                borderRadius: Number.MAX_VALUE,
                borderSkipped: false,
            },
            {
                label: "Small Radius",
                data: [15, 67, 34, 78, 45, 87, 76],
                backgroundColor: "rgba(54, 162, 235, 1)",
                borderColor: "rgba(54, 162, 245, 1)",
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
            }
        ],
        labels: ["January", "February", "March", "April", "May", "June", "July"],

        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Border Radius Bar Chart"
                }
            }
        }
    }
} satisfies Story;
