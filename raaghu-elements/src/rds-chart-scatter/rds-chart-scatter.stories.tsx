import React from "react";
import RdsScatterChart from "./rds-chart-scatter";
import "./rds-chart-scatter.css";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Scatter Chart',
    component: RdsScatterChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsScatterChart>;

export default meta;
type Story = StoryObj<typeof RdsScatterChart>;

export const ScatterChart: Story = {
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
                pointStyle: 'triangle', // Set pointStyle to triangle
                pointRadius: 8, // Set pointRadius to increase icon size
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
                    //pointStyle: "line",
                    labels: {
                        usePointStyle: true,
                       //  pointStyle: "triangle"
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
    }
};

export const ScatterChartWithMultiAxis: Story = {
    args: {
        id: "Scatter_Chart_Multi_Axis",
        dataSets: [
            {
                label: "Scatter Dataset 1",
                data: [
                    { x: -10, y: 0 },
                    { x: 0, y: 10 },
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
                        drawOnChartArea: false // only want the grid lines for one axis to show up
                    }
                }
            }
        }
    }
};
