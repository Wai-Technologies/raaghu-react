import RdsLineChart from "./rds-chart-line";
import * as Chart from "chart.js";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Line Chart',
    component: RdsLineChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsLineChart>;

export default meta;
type Story = StoryObj<typeof RdsLineChart>;


export const LineChart: Story = {
    args: {        
        labels: ["January", "February", "March", "April", "May", "Jun", "July"],
        options: {
            pointStyle: "star",
            radius: 7,
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: "top",
                    align: "center",
                    pointStyle: "bottom",
                    labels: {
                        usePointStyle: true,
                        generateLabels: function (chart : any) {

                            const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            original.forEach(label => {
                                // label.pointStyle = 'custom-legend-point';
                            });

                            return original;
                        },
                    },

                },
                tooltip: {
                    usePointStyle: true,
                },
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: "Line Chart with boundries"
                }
            },
            interaction: {
                intersect: false,
            }
        },
        dataSets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                backgroundColor: "red"
            },
        ],
        // isGradient: true,
        id: "linechart",
    }
} satisfies Story;

