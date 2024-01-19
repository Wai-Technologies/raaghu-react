import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsMixedChart  from "./rds-chart-mixed";
import "./rds-chart-mixed.css";

export default {
    title: "Charts/Mixed Chart",
    component: RdsMixedChart,
} as ComponentMeta<typeof RdsMixedChart>;

const Template: ComponentStory<typeof RdsMixedChart> = (args) => <RdsMixedChart {...args} />;

export const MixedChart = Template.bind({});
MixedChart.args = {
    id:"mixed chart",
    height:300,
    width:300,
    dataSets: [
        {
            type: "bar",
            label: "Bar Dataset",
            data: [0,37, -12, 70, 35,-32,85,-24],
            backgroundColor: "rgb(248, 188, 198)",
            borderColor:"rgb(248, 188, 198)",
            order: 0
        },
        {
            type: "line",
            label: "Line Dataset",
            data: [-10,18, -60, -90, -44,-91,-83,46],
            borderColor: "blue",
            backgroundColor:"blue",
            order: 1
        }
    ],

    labels: ["January", "February", "March", "April","May","June"],

    options: {
        radius: 10,
        pointStyle: "triangle",
        plugins: {
            legend: {
                position: "top",
                align: "center",
                pointStyle: "bottom",
                labels: {
                    usePointStyle: true
                }
            },
            tooltip: {
                usePointStyle: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};
