import React from "react";
import RdsCompScatterChart from "./rds-comp-chart-scatter";
import "./rds-comp-chart-scatter.scss";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Charts/Scatter Chart',
    component: RdsCompScatterChart,
    parameters: {
        layout: 'padded',
      docs: {
  description: {
    component: 'The **Scatter Chart** element visualizes data points plotted on a Cartesian coordinate system, displaying relationships or distributions between two variables. Each point represents a data item defined by X and Y coordinates, making it ideal for identifying correlations, clusters, or trends within datasets. This chart supports multiple customizable **datasets**, enabling varied styling such as colors, shapes, and sizes for each point. The **labels** property provides contextual information for each data point. Extensive configuration is available via the **options** property, including responsive layout, axis scaling, multi-axis support, tooltips, legends, and animations. The **chartStyle** property allows further style customization to fit various design needs. The Scatter Chart is a flexible and insightful visualization tool commonly used in analytics dashboards, scientific data representation, and statistical analysis.'
  }
}


    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompScatterChart>;

export default meta;
type Story = StoryObj<typeof RdsCompScatterChart>;

export const Default: Story = {
    args: {
        id: "Scatter_Chart",
        dataSets: [
            {
                type: "scatter",
                label: "Scatter Dataset",
                data: [
                    { x: -10, y: 0 },
                    { x: -8, y: 3 },
                    { x: -5, y: 5 },
                    { x: 0, y: 9 },
                    { x: 4, y: 3 },
                    { x: 9, y: 5 },
                    { x: 0.5, y: 5.5 }
                ],
                backgroundColor: "rgb(255, 99, 132)",
                pointStyle: 'triangle',
                pointRadius: 8,
            }
        ],
        labels: ["January", "February", "March", "April"],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    align: "center",
                    labels: {
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    usePointStyle: true,
                },
            },
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                },
            },
        },
    },
    parameters: {
        controls: {
            exclude: [
                    'chartStyle', 
            ],
        },
     },
};

export const WithMultiAxis: Story = {
    args: {
        id: "Scatter_Chart_Multi_Axis",
        dataSets: [
            {
                label: "Scatter Dataset 1",
                data: [
                    { x: -10, y: 0 },
                    { x: -3, y: 7 },
                    { x: 9, y: 5 },
                    { x: 0.5, y: 5.5 }
                ],
                backgroundColor: "rgb(255, 99, 132)",
                yAxisID: "y",
            },
            {
                label: "Scatter Dataset 2",
                data: [
                    { x: -20, y: 9 },
                    { x: 10, y: -10 },
                    { x: 20, y: 15 },
                    { x: 1.5, y: 15.5 }
                ],
                backgroundColor: "rgb(155, 99, 132)",
                yAxisID: "y",
            }
        ],
        labels: ["January", "February", "March", "April"],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Scatter Multi Axis Chart"
                }
            },
            scales: {
                y: {
                    type: "linear",
                    position: "left",
                    ticks: {
                        color: "red"
                    }
                },
                y2: {
                    type: "linear",
                    position: "right",
                    reverse: true,
                    ticks: {
                        color: "blue"
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    },
    parameters: {
        controls: {
            exclude: [
                    'chartStyle', 
            ],
        },
     },
};

