import { StoryObj, Meta } from "@storybook/react";
import RdsBarChart from "./rds-chart-bar";
import "./rds-chart-bar.css";

const meta: Meta = {
    title: 'Components/Charts/Bar Chart',
    component: RdsBarChart,
    parameters: {
        layout: 'padded',
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

export const StackedBarChart: Story = {
    args: {
        id: 1,
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


export const PerformanceStackedBarChart: Story = {
    args: {
        id: 1,
        dataSets: [
            {
                label: "Productive",
                data: [20, 30, 10, 15, 98, 45, 15, 20, 0, 20, 50, 98, 85, 35],
                backgroundColor: "rgba(111, 206, 250, 1)",
                // borderColor: "rgba(75, 192, 192, 1)"
            },
            {
                label: "Unproductive",
                data: [15, 47, 34, 78, 45, 17, 46, 15, 0, 34, 38, 45, 57, 26],
                backgroundColor: "rgba(243, 123, 135, 1)",
            },
            {
                label: "Neutral",
                data: [31, 52, 43, 91, 14, 23, 36, 31, 0, 43, 21, 74, 23, 46],
                backgroundColor: "rgba(228, 228, 228, 1)",
            }
        ],
        labels: ["9 AM",
            "10 AM",
            "11 AM",
            "12 PM",
            "1 PM",
            "2 PM",
            "3 PM",
            "4 PM",
            "5 PM",
            "6 PM",
            "7 PM",
            "8 PM",
            "9 PM"],

        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Performance Stacked Bar Chart"
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25
                    }
                }
            }
        }
    }
} satisfies Story;

export const BarChartWithBorderRadius: Story = {
    args: {
        id: 1,
        dataSets: [
            {
                label: "Fully Radius",
                data: [20, 30, 50, 80, 98, 95, 55],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                borderRadius: 5,
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
