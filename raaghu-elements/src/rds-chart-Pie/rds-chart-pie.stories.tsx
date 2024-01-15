import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPieChart from "./rds-chart-pie";


export default {
    title: "Charts/Pie Chart",
    component: RdsPieChart,
} as ComponentMeta<typeof RdsPieChart>;

const Template: ComponentStory<typeof RdsPieChart> = (args) => <RdsPieChart {...args} />;

export const PieChart = Template.bind({});
PieChart.args = {
    id:"chart pie",
    width:300,
    height:300,
    labels: ["red", "Orange", "Yellow", "Green", "Blue"],
    options: {
        circumference: 360,
        radius: 100,
        maintainAspectRatio:false,
        animation: {
            animateRotate: false,
            animateScale: true
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
                }
            },
            title: {
                display: true,
                text: "Pie Chart"
            }
        }
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
            borderColor: [
                "#fff",
            ],
            borderWidth: 1
        }
    ],
  

};
