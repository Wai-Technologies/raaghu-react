import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsWidget from "./rds-widget";
import RdsLineChart from "../rds-chart-line";
import RdsBarChart from "../rds-chart-bar";
import RdsDoughnutChart from "../rds-chart-doughnut";
import RdsBigNumber from "../rds-big-number/rds-big-number";
import { ScriptableContext } from "chart.js/auto";

const meta: Meta = {
    title: "Components/Widget",
    component: RdsWidget,
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
                "white",
                "gradient-primary",
                "transparent",
            ],
            control: { type: "select" },
        },
        iconTooltipPosition: {
            options: ["top", "bottom", "left", "right"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsWidget>;

export default meta;
type Story = StoryObj<typeof RdsWidget>;

export const Default: Story = {
    args: {
        colorVariant: "gradient-primary",
        headerTitle: "Widget",
        isRefreshRequired: true,
        iconName: "refresh",
        iconTooltipLabel: "Refresh",
        iconTooltipPosition: "top",
        border: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['colorVariant', 'headerTitle', 'isRefreshRequired', 'iconName', 'iconTooltipLabel', 'iconTooltipPosition', 'border'] } };

export const WidgetWithLineChart: Story = {
    args: {
        colorVariant: "white",
        isRefreshRequired: true,
        iconName: "refresh",
        iconTooltipLabel: "Refresh",
        iconTooltipPosition: "top",
        headerTitle: "Monthly Summary",
        children: (
            <RdsLineChart
                id="linechart"
                labels={["12am", "4am", "8am", "12pm", "4pm", "8pm"]}
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
                            position: "top",
                            align: "end",
                            pointStyle: "circle",
                            boxWidth: "10",
                            boxHeight: "10",
                            labels: {
                                usePointStyle: true,
                                pointStyleWidth: 13,
                                boxWidth: 10,
                                boxHeight: 10,
                                padding: 30,
                                height: 5,
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    scales: {
                        y: {
                            axis: "y",
                            beginAtZero: true,
                            grid: {
                                color: "#ccc", // Change color to gray
                            },
                            type: "linear",
                            ticks: {
                                minRotation: 0,
                                maxRotation: 50,
                                mirror: false,
                                textStrokeWidth: 0,
                                textStrokeColor: "",
                                padding: 3,
                                display: true,
                                autoSkip: true,
                                autoSkipPadding: 3,
                                labelOffset: 0,
                                minor: {},
                                major: {},
                                align: "center",
                                crossAlign: "near",
                                showLabelBackdrop: false,
                                backdropColor: "rgba(255, 255, 255, 0.75)",
                                backdropPadding: 2,
                                color: "#666",
                            },
                            display: true,
                            offset: false,
                            reverse: false,
                            bounds: "ticks",
                            grace: 0,
                            title: {
                                display: false,
                                text: "",
                                padding: {
                                    top: 4,
                                    bottom: 4,
                                },
                                color: "#B3B3B3",
                            },
                            id: "y",
                            position: "left",
                        },
                        x: {
                            axis: "x",
                            grid: {
                                display: false,
                            },
                            type: "category",
                            ticks: {
                                minRotation: 0,
                                maxRotation: 50,
                                mirror: false,
                                textStrokeWidth: 0,
                                textStrokeColor: "",
                                padding: 3,
                                display: true,
                                autoSkip: true,
                                autoSkipPadding: 3,
                                labelOffset: 0,
                                minor: {},
                                major: {},
                                align: "center",
                                crossAlign: "near",
                                showLabelBackdrop: false,
                                backdropColor: "rgba(255, 255, 255, 0.75)",
                                backdropPadding: 2,
                                color: "#666",
                            },
                            display: true,
                            offset: false,
                            reverse: false,
                            beginAtZero: false,
                            bounds: "ticks",
                            grace: 0,
                            title: {
                                display: false,
                                text: "",
                                padding: {
                                    top: 4,
                                    bottom: 4,
                                },
                                color: "#666",
                            },
                            id: "x",
                            position: "bottom",
                        },
                    },
                    tooltip: {
                        display: true,
                        usePointStyle: true,
                    },
                }}
                dataSets={[
                    {
                        label: "Sales",
                        data: [4.4, 3.7, 8.2, 1.2, 7.5, 2.7, 9.6, 3.5, 4.2, 5.8, 2.2, 4.7],
                        borderColor: "#7E2EEF",
                        pointBackgroundColor: "#7E2EEF",
                        fill: true,
                        pointRadius: 4,
                        backgroundColor: (context: ScriptableContext<"line">) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 25, 0, 210);
                            gradient.addColorStop(0.1, "rgba(25, 70, 186, 1)");
                            gradient.addColorStop(1, "rgba(25, 70, 186, 0.4)");
                            return gradient;
                        },
                        tension: 0.4,
                    },
                    {
                        label: "Revenue",
                        data: [4.4, 8.7, 3.2, 2.2, 9.5, 3.4, 6.7, 8.5, 4.2, 9.2, 1.2, 4.7],
                        borderColor: "#4DCFFF",
                        pointBackgroundColor: "#4DCFFF",
                        fill: true,
                        pointRadius: 4,
                        backgroundColor: (context: ScriptableContext<"line">) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 25, 0, 210);
                            gradient.addColorStop(0.1, "rgba(94, 211, 255, 1)");
                            gradient.addColorStop(1, "rgba(94, 211, 255, 0.4)");
                            return gradient;
                        },
                        tension: 0.4,
                    },
                ]}
            />
        ),
    }
} satisfies Story;
WidgetWithLineChart.parameters = { controls: { include: ['colorVariant', 'headerTitle', 'isRefreshRequired', 'iconName', 'iconTooltipLabel', 'iconTooltipPosition', 'children'] } };

export const WidgetWithDoughnutChart: Story = {
    args: {
        colorVariant: "white",
        headerTitle: "Profit Share",
        isRefreshRequired: true,
        iconName: "refresh",
        iconTooltipLabel: "Refresh",
        iconTooltipPosition: "top",
        children: (
            <>
                <RdsBigNumber bigNumber="$39,330"></RdsBigNumber>
                <RdsDoughnutChart
                    id="doughnutchart"
                    labels={["Total Sales - 60%", "Revenue - 25%", "Expenses - 15%"]}
                    options={{
                        cutoutPercentage: 40,
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            series: {
                                label: {
                                    position: "inside",
                                    text: "total",
                                    display: false,
                                },
                            },
                            doughnutlabel: {
                                labels: [
                                    {
                                        text: "550",
                                        font: {
                                            size: 20,
                                            weight: "bold",
                                        },
                                    },
                                    {
                                        text: "total",
                                    },
                                ],
                            },
                            legend: {
                                display: true,
                                align: "middle",
                                position: "right",
                                labels: {
                                    boxWidth: 15,
                                    padding: 15,
                                },
                            },
                        },
                        scales: {},
                    }}
                    dataSets={[
                        {
                            label: "Dataset 1",
                            data: [60, 25, 15],
                            backgroundColor: ["#ff6384", "#BF00BB", "#4bc0c0"],
                            fillStyle: "blue",
                            fillRect: [200, 100, 140, 100],
                            borderColor: ["#fff"],
                            borderWidth: 1,
                            cutout: "80%",
                            title: {
                                text: "Doughnut Chart",
                                verticalAlign: "center",
                                dockInsidePlotArea: true,
                            },
                        },
                    ]}
                />
            </>

        ),
    }
} satisfies Story;
WidgetWithDoughnutChart.parameters = { controls: { include: ['colorVariant', 'headerTitle', 'isRefreshRequired', 'iconName', 'iconTooltipLabel', 'iconTooltipPosition', 'children'] } };

export const WidgetWithBarChart: Story = {
    args: {
        colorVariant: "white",
        headerTitle: "Daily Sales Growth",
        isRefreshRequired: true,
        iconName: "refresh",
        iconTooltipLabel: "Refresh",
        iconTooltipPosition: "top",
        children: (
            <RdsBarChart
                id="barchart"
                labels={[
                    "10k",
                    "20k",
                    "25k",
                    "30k",
                    "40k",
                    "50k",
                    "60k",
                    "70k",
                    "75k",
                    "80k",
                    "90k",
                    "95k",
                ]}
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
                            position: "",
                            pointStyle: "line",
                            labels: {
                                usePointStyle: true,
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                        tooltip: {
                            usePointStyle: true,
                        },
                        title: {
                            display: false,
                            text: "Daily Sales Growth",
                        },
                    },
                    scales: {
                        x: {
                            axis: "x",
                            type: "category",
                            offset: true,
                            grid: {
                                offset: true,
                                display: true,
                                lineWidth: 1,
                                drawBorder: true,
                                drawOnChartArea: true,
                                drawTicks: true,
                                tickLength: 8,
                                borderDash: [],
                                borderDashOffset: 0,
                                borderWidth: 1,
                                color: "rgba(0,0,0,0.1)",
                                borderColor: "rgba(0,0,0,0.1)",
                            },
                            ticks: {
                                minRotation: 0,
                                maxRotation: 50,
                                mirror: false,
                                textStrokeWidth: 0,
                                textStrokeColor: "",
                                padding: 3,
                                display: true,
                                autoSkip: true,
                                autoSkipPadding: 3,
                                labelOffset: 0,
                                minor: {},
                                major: {},
                                align: "center",
                                crossAlign: "near",
                                showLabelBackdrop: false,
                                backdropColor: "rgba(255, 255, 255, 0.75)",
                                backdropPadding: 2,
                                color: "#666",
                            },
                            display: true,
                            reverse: false,
                            beginAtZero: false,
                            bounds: "ticks",
                            grace: 0,
                            title: {
                                display: false,
                                text: "",
                                padding: {
                                    top: 4,
                                    bottom: 4,
                                },
                                color: "#666",
                            },
                            id: "x",
                            position: "bottom",
                        },
                        y: {
                            axis: "y",
                            type: "linear",
                            beginAtZero: true,
                            ticks: {
                                minRotation: 0,
                                maxRotation: 50,
                                mirror: false,
                                textStrokeWidth: 0,
                                textStrokeColor: "",
                                padding: 3,
                                display: true,
                                autoSkip: true,
                                autoSkipPadding: 3,
                                labelOffset: 0,
                                minor: {},
                                major: {},
                                align: "center",
                                crossAlign: "near",
                                showLabelBackdrop: false,
                                backdropColor: "rgba(255, 255, 255, 0.75)",
                                backdropPadding: 2,
                                color: "#666",
                            },
                            display: true,
                            offset: false,
                            reverse: false,
                            bounds: "ticks",
                            grace: 0,
                            grid: {
                                display: true,
                                lineWidth: 1,
                                drawBorder: true,
                                drawOnChartArea: true,
                                drawTicks: true,
                                tickLength: 8,
                                offset: false,
                                borderDash: [],
                                borderDashOffset: 0,
                                borderWidth: 1,
                                color: "rgba(0,0,0,0.1)",
                                borderColor: "rgba(0,0,0,0.1)",
                            },
                            title: {
                                display: false,
                                text: "",
                                padding: {
                                    top: 4,
                                    bottom: 4,
                                },
                                color: "#666",
                            },
                            id: "y",
                            position: "left",
                        },
                    },
                }}
                dataSets={[
                    {
                        label: "Sales Growth",
                        data: [15, 67, 34, 78, 45, 87, 76, 32, 50, 14, 35, 22],
                        backgroundColor: "rgba(54, 162, 235, 1)",
                        borderColor: "rgba(54, 162, 245, 1)",
                        borderWidth: 1,
                        borderRadius: 10,
                        barThickness: 7,
                        borderSkipped: false,
                    },
                ]}
            />
        ),
    }
} satisfies Story;
WidgetWithBarChart.parameters = { controls: { include: ['colorVariant', 'headerTitle', 'isRefreshRequired', 'iconName', 'iconTooltipLabel', 'iconTooltipPosition', 'children'] } };