import React from "react";
import { RdsAreaChart } from "../../rds-elements";
import { ScriptableContext } from "chart.js";

export const code_actual = () => {
    return (
        <RdsAreaChart
            id="areachartpa"
            height={250}
            width={650}
            labels={["Jan", "Mar", "May", "Jul", "Sep", "Nov"]}
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
                        labels: {
                            usePointStyle: true,
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
                        legend: {
                            labels: {
                                maxheight: 10,
                            },
                        },
                        grid: {
                            display: false,
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
                            color: "#666",
                        },
                        id: "y",
                        position: "left",
                    },
                    x: {
                        axis: "x",
                        grid: {
                            display: false,
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
                    data: [800, 425, 280, 700, 490, 200],
                    borderColor: "#4DCFFF",
                    pointBackgroundColor: "#4DCFFF",
                    fill: true,
                    pointRadius: 2,
                    // backgroundColor: ['rgba(25, 70, 186, 0.5)'],
                    backgroundColor: (context: ScriptableContext<"line">) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 25, 0, 210);
                        gradient.addColorStop(0.1, "rgba(25, 70, 186, 1)");
                        gradient.addColorStop(1, "rgba(25, 70, 186, 0.08)");
                        return gradient;
                    },
                    tension: 0.4,
                },
                {
                    label: "Revenue",
                    data: [400, 782.4, 490, 470, 750, 500],
                    borderColor: "#863BFF",
                    pointBackgroundColor: "#863BFF",
                    fill: true,
                    pointRadius: 2,
                    // backgroundColor:["rgba(48, 22, 194, 0.5)"],
                    backgroundColor: (context: ScriptableContext<"line">) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 25, 0, 210);
                        gradient.addColorStop(0.1, "rgba(48, 22, 194, 1)");
                        gradient.addColorStop(1, "rgba(48, 22, 194, 0.08)");
                        return gradient;
                    },
                    tension: 0.4,
                },
            ]}
            isGradient={false}
        />
    );
};

export default code_actual;
