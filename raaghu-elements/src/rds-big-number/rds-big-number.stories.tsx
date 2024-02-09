import React from "react";
import RdsBigNumber from "./rds-big-number";
import RdsLineChart from "../rds-chart-line";
import RdsIcon from "../rds-icon";
import RdsBarChart from "../rds-chart-bar";
import { Meta, StoryObj } from "@storybook/react";

const textAlignArgTypes = {
    textAlign: {
        options: ["text-start", "text-center", "text-end"],
        control: { type: "select" },
    },
};

const meta: Meta = {
    title: 'Elements/BigNumber',
    component: RdsBigNumber,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        subTitleColorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        bigNumberColor: {
            options: [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "light",
                "white"
            ],
            control: { type: "select" },
        },
        chartHeight: {
            control: { type: "number" },
        },
        chartWidth: {
            control: { type: "number" },
        },
    },
} satisfies Meta<typeof RdsBigNumber>;

export default meta;
type Story = StoryObj<typeof RdsBigNumber>;


export const Default: Story = {
    args: {
        bigNumber: "$13,20,21",
        bigNumberColor: "dark",
        textAlign: "text-start",
    }
} satisfies Story;

Default.argTypes = textAlignArgTypes;

export const standard: Story = {
    args: {
        subTitleColorVariant: "primary",
        subTitle: "Visitors",
        bigNumber: "2,236",
        children: <></>
    }
} satisfies Story;


export const delta: Story = {
    args: {
        subTitleColorVariant: "primary",
        subTitle: "Visitors",
        bigNumber: "2,236",
        children: (
            <>
                <RdsIcon
                    name="triangle_up"
                    fill={true}
                    stroke={true}
                    width="15px"
                    height="15px"
                    colorVariant="primary"
                />

                <label className="ps-2 text-primary fs-5">75%</label>
            </>
        ),
    }
} satisfies Story;



export const histogram: Story = {
    args: {
        subTitleColorVariant: "primary",
        subTitle: "Average Numbers Of Visitors",
        bigNumber: "2,236",
        chartHeight: 50,
        chartWidth: 50,
        children: (
            <RdsBarChart
                id="histogram"
                dataSets={[
                    {
                        label: "Sales Growth",
                        data: [15, 67, 34, 78, 45, 87, 76, 32, 50, 14, 35, 22],
                        backgroundColor: "rgba(54, 162, 235, 1)",
                        borderColor: "rgba(54, 162, 245, 1)",
                        borderWidth: 1,
                        borderRadius: 10,
                        barThickness: 4,
                        borderSkipped: false,
                    },
                ]}
                labels={["10k", "20k", "25k", "30k", "40k", "50k", "60k"]}
                options={{
                    indexAxis: "x",
                    elements: {
                        bar: {
                            borderWidth: 0,
                            width: 1,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false, // <-- this option disables tooltips
                        },
                    },
                    scales: {
                        y: {
                            display: false,
                        },
                        x: {
                            display: false,
                        },
                    },
                }}
            />
        ),
    }
} satisfies Story;


export const sparkLine: Story = {
    args: {
        subTitleColorVariant: "primary",
        subTitle: "Visitors",
        bigNumber: "2,236",
        chartHeight: 50,
        chartWidth: 50,
        children: (
            <RdsLineChart
                id="linechart"
                labels={["Jan", "Feb", "Mar", "Apr"]}
                options={{
                    radius: 0,
                    pointStyle: "circle",
                    responsive: true,
                    borderWidth: 1,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: { enabled: false },
                    },
                    scales: {
                        y: {
                            display: false,
                        },
                        x: {
                            display: false,
                        },
                    },
                    tooltip: {
                        display: false,
                        usePointStyle: true,
                    },
                }}
                dataSets={[
                    {
                        label: "",
                        data: [0, 3, -3, 3],
                        borderColor: "#4DCFFF",
                        fill: false,
                        pointRadius: 2,
                        cubicInterpolationMode: "monotone",
                        tension: 0.4,
                    },
                ]}
            />
        ),
    }
} satisfies Story;


export const icon: Story = {
    args: {
        subTitleColorVariant: "primary",
        subTitle: "Visitors",
        bigNumber: "2,236",
        children: (
            <RdsIcon
                name="users"
                fill={false}
                stroke={true}
                width="50px"
                height="50px"
                colorVariant="primary"
            />
        ),
    }
} satisfies Story;

