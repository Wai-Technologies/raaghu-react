import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsBarChart  from "./rds-chart-bar";
import "./rds-chart-bar.css";

export default {
    title: "Charts/Bar Chart",
    component: RdsBarChart,
} as ComponentMeta<typeof RdsBarChart>;

const Template: ComponentStory<typeof RdsBarChart> = (args) => <RdsBarChart {...args} />;

export const HorizontalBarChart = Template.bind({});
HorizontalBarChart.args = {
    id:1,
    height:300,
    width:300,
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
        layout:{
            padding:3
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
};

export const VerticalBarChart = Template.bind({});
VerticalBarChart.args = {
    id:1,
    height:300,
    width:300,
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
};
export const StackedBarChart = Template.bind({});
StackedBarChart.args = {
    id:1,
    height:300,
    width:300,
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
};
export const BarChartWithBorderRadius = Template.bind({});
BarChartWithBorderRadius.args = {
    id:1,
    height:300,
    width:300,
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
};