import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompBarChart from "./rds-comp-chart-bar";
import "./rds-comp-chart-bar.scss";

const meta: Meta = {
    title: 'Components/Charts/Bar Chart',
    component: RdsCompBarChart,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
      component: 'The **Bar Chart** element is a flexible and highly customizable data visualization tool designed for our design system. It supports both **horizontal** and **vertical** orientations, enabling clear representation of single or multiple datasets. Key features include **stacked bars** for comparative insights, **border radius customization** for refined aesthetics, and full responsiveness to adapt across devices. The component integrates options for axis configuration, layout padding, and rich plugin support such as legends, tooltips, and titles. Use this component to visualize performance metrics, trends, and comparisons effectively within your applications.'

},
        }
    },
    tags: ['autodocs'],
    argTypes: {
        height: {
            control: 'text',
            description: 'Height of the chart (e.g., "400px", "50vh", or number for pixels)',
        },
    },
} satisfies Meta<typeof RdsCompBarChart>;

export default meta;
type Story = StoryObj<typeof RdsCompBarChart>;



export const BorderRadius: Story = {
    args: {
        id: 1,
        dataSets: [
            {
                label: "Fully Radius",
                data: [48, 45, 65, 48, 55, 80, 92],
                backgroundColor: "var(--rds-comp-chart-bar-ds1-bg, rgba(75, 192, 192, 1))",
                borderColor: "var(--rds-comp-chart-bar-ds1-border, rgba(75, 192, 192, 1))",
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
            },
            {
                label: "Small Radius",
                data: [48, 55, 65, 90, 45, 65, 65],
                backgroundColor: "var(--rds-comp-chart-bar-ds2-bg, rgba(54, 162, 235, 1))",
                borderColor: "var(--rds-comp-chart-bar-ds2-border, rgba(54, 162, 245, 1))",
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
    },
     parameters: {
        controls: {
            exclude: [
                    'height', 
            ],
        },
     },

} satisfies Story;
export const Horizontal: Story = {
    args: {
        id: 1,
        height: "400px",
        dataSets: [
            {
                label: "Dataset 1",
                data: [20, 30, 50, 80, 98, 95, 55],
                backgroundColor: "var(--rds-comp-chart-bar-ds1-bg, rgba(75, 192, 192, 1))",
                
            },
            {
                label: "Dataset 2",
                data: [15, 67, 34, 78, 45, 87, 76],
                backgroundColor: "var(--rds-comp-chart-bar-ds2-bg, rgba(54, 162, 235, 1))",
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
                    borderWidth: 0,
                        categoryPercentage: 0.5,
                        barPercentage: 0.3,
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


export const PerformanceStacked: Story = {
    args: {
        id: 1,
        dataSets: [
            {
                label: "Productive",
                data: [15, 30, 30, 15, 60, 15, 65, 35, 65, 27, 50, 15, 20, 69],
                backgroundColor: "rgba(111, 206, 250, 1)",
            },
            {
                label: "Unproductive",
                data: [10, 27, 27, 10, 20, 45, 15, 15, 20, 8, 38, 30, 57, 8],
                backgroundColor: "rgba(243, 123, 135, 1)",
            },
            {
                label: "Neutral",
                data: [25, 12, 12, 5, 10, 10, 10, 10, 10, 43, 21, 15, 8, 18],
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
    },
    parameters: {
        controls: {
            exclude: [
                    'height', 
            ],
        },
     },
} satisfies Story;

export const Stacked: Story = {
    args: {
        id: 1,
        dataSets: [
            {
                label: "Dataset 1",
                data: [50, 80, 80, 50, 175, 60, 220],
                backgroundColor: "var(--rds-comp-chart-bar-ds1-bg, rgba(75, 192, 192, 1))",
                borderColor: "rgba(75, 192, 192, 1)"
            },
            {
                label: "Dataset 2",
                data: [20, 80, 80, 30, 100, 125, 35],
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
                label: "Dataset 3",
                data: [80, 50, 50, 20, 50, 25, 20],
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
    },
    parameters: {
        controls: {
            exclude: [
                    'height', 
            ],
        },
     },
} satisfies Story;

export const Vertical: Story = {
    args: {
        id: 1,
        dataSets: [
            {
                label: "Dataset 1",
                data: [80, 50, 75, 70, 80, 90, 100],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)"
            },
            {
                label: "Dataset 2",
                data: [40, 67, 55, 100, 45, 70, 76],
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
                label: "Dataset 3",
                data: [100, 92, 30, 70, 68, 50, 100],
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
    },
    parameters: {
        controls: {
            exclude: [
                    'height', 
            ],
        },
     },
} satisfies Story;