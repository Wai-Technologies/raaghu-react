import React, { useState } from "react";
import { RdsBigNumber, RdsProgressBar, RdsRadarChart, RdsTable, RdsWidget } from "../rds-elements";
import {
    RdsLineChart,
    RdsDoughnutChart,
    RdsBooleanChart,
    RdsBarChart
} from "../rds-elements";
import { ScriptableContext } from "chart.js";

const RdsCompTenantDashboard = () => {

    return (
        <div className="dark dashboard bg-grey p-4">
            <div className="row">
                <div className="col-xl-6  col-lg-6 col-md-12 d-cus-none">
                    <RdsWidget
                        headerTitle={"Monthly Summary"}
                        isRefreshRequired={true}
                        class="card-stretch"
                        colorVariant="white"
                        isCardStretch={true}
                    >
                        <RdsLineChart
                            id="linechart"
                            labels={[
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ]}
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
                                            boxWidth: 8,
                                            padding: 30,
                                            height: 10,
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
                                    data: [
                                        190, 200, 133, 231, 112, 125, 135, 135.7, 266, 224, 122,
                                        125,
                                    ],
                                    borderColor: "#4DCFFF",
                                    pointBackgroundColor: "#4DCFFF",
                                    fill: true,
                                    pointRadius: 0,
                                    tension: 0.4,
                                },
                                {
                                    label: "Revenue",
                                    data: [
                                        290, 262, 205, 162, 150, 180, 206, 220, 240, 190, 275,
                                        211,
                                    ],
                                    borderColor: "#863BFF",
                                    pointBackgroundColor: "#863BFF",
                                    fill: true,
                                    pointRadius: 0,
                                    tension: 0.4,
                                },
                            ]}
                        />
                    </RdsWidget>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                    <RdsWidget
                        headerTitle="License"
                        isCardStretch={true}>
                        <RdsBigNumber bigNumber="10"></RdsBigNumber>
                        <RdsRadarChart
                            id="newRadar"
                            labels={["Jan", "Feb", "Mar", "Apr", "May", "June", "July"]}
                            options={{
                                animation : false,
                                responsive: false,
                                chartArea: {
                                    backgroundColor: "rgba(251, 85, 85, 0.4)",
                                },
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                        align: "center",
                                        pointStyle: "rectRot",
                                        pointRadius: 5,
                                        labels: {
                                            usePointStyle: true,
                                        }
                                    },
                                    
                                    tooltip: {
                                        usePointStyle: true,
                                    },
                                    scale: {
                                        type: "line",
                                        angleLines: {
                                            display: true,
                                        },
                                    },
                                },
                                scales: {
                                    r: {
                                        axis: "r",
                                        type: "radialLinear",
                                        display: true,
                                        animate: true,
                                        position: "chartArea",
                                        angleLines: {
                                            display: true,
                                            lineWidth: 1,
                                        },
                                        grid: {
                                            circular: false,
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
                                        startAngle: 0,
                                        ticks: {
                                            showLabelBackdrop: true,
                                            color: "#666",
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
                                            backdropColor: "rgba(0,0,0,0.01)",
                                            backdropPadding: 2,
                                        },
                                        pointLabels: {
                                            backdropPadding: 2,
                                            display: true,
                                            font: {
                                                size: 10,
                                            },
                                            padding: 5,
                                            centerPointLabels: false,
                                            color: "#666",
                                        },
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
                                        id: "r",
                                    },
                                },
                            }}
                            dataSets={[
                                {
                                    label: "Team",
                                    data: [0.5, 0.8, 0.4, 0.6, 0.7, 0.2, 0.9],
                                    borderColor: "rgba(255, 99, 132, 1)",
                                    backgroundColor: "rgba(255, 99, 132, 1)",
                                    fill: false,
                                    pointStyle: "circle",
                                    pointRadius: 2,
                                },
                                {
                                    label: "Business",
                                    data: [0.9, 0.3, 0.8, 0.9, 0.1, 0.7, 0.2],
                                    borderColor: "rgba(191, 0, 187, 1)",
                                    backgroundColor: "rgba(191, 0, 187, 1)",
                                    fill: false,
                                    pointStyle: "circle",
                                    pointRadius: 2,
                                },
                                {
                                    label: "Enterprise",
                                    data: [0.7, 0.2, 0.1, 0.9, 0.8, 0.4, 0.7],
                                    borderColor: "rgba(126, 46, 239, 1)",
                                    backgroundColor: "rgba(126, 46, 239, 1)",
                                    fill: false,
                                    pointStyle: "circle",
                                    pointRadius: 2,
                                },
                            ]}
                        />
                    </RdsWidget>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                    <RdsWidget
                        headerTitle="Profit Share"
                        isRefreshRequired={true}
                        iconName="refresh"
                        iconTooltipLabel="Refresh"
                        iconTooltipPosition="top"
                        isCardStretch={true}
                    >
                        <div>
                            <RdsBigNumber bigNumber="$39,330"></RdsBigNumber>
                            <div className="col col-sm-12">
                                <RdsDoughnutChart
                                    id="doughnutchart"

                                    labels={['Total Sales - 85%', 'Revenue - 25%', 'Expenses - 15%']}


                                    options={{
                                        animationEnabled: true,
                                        title: {
                                            fontColor: "#fff",
                                        },
                                        cutoutPercentage: 80,

                                        responsive: true,

                                        subtitles: {
                                            fontColor: "#fff",
                                            verticalAlign: "center",
                                        },
                                        maintainAspectRatio: false,
                                        plugins: {
                                            series: {
                                                label: {
                                                    position: "inside",
                                                    text: "total",
                                                    display: false,
                                                    font: {
                                                        size: 12,
                                                        weight: "regular",
                                                    },
                                                },
                                            },
                                            doughnutlabel: {
                                                labels: [
                                                    {
                                                        text: "550",
                                                        font: {
                                                            size: 8,
                                                            weight: "bold",
                                                        },
                                                    },
                                                    {
                                                        text: "total",
                                                    },
                                                ],
                                            }, title: {
                                                text: 'title sample',
                                                font: {
                                                    size: 12,

                                                }
                                            },
                                            legend: {
                                                display: true,
                                                align: "middle",
                                                position: "right",
                                                color: "#fff",
                                                labels: {
                                                    boxWidth: 15,
                                                    padding: 15,
                                                },
                                            },
                                            tooltip: { enabled: false },
                                        },
                                        scales: {},
                                    }}
                                    dataSets={[
                                        {

                                            label: "Total Sales",
                                            data: [85, 0, 0, 15],
                                            backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                                            weight: 0.2,
                                            borderRadius: 20,
                                            borderColor: ["transparent"],

                                        },
                                        {
                                            weight: 0.2
                                        },
                                        {
                                            label: "Revenue",
                                            data: [0, 75, 0, 25],
                                            backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                                            weight: 0.2,
                                            borderRadius: 20,
                                            borderColor: ["transparent"]
                                        },
                                        {
                                            weight: 0.2
                                        },
                                        {
                                            label: "Expenses",
                                            data: [0, 0, 55, 45],
                                            backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                                            weight: 0.2,
                                            borderRadius: 20,
                                            borderColor: ["transparent"]
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </RdsWidget>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <RdsWidget
                                    headerTitle="Call Overview"
                                    isRefreshRequired={false}
                                    isCardStretch={true}
                                    height="auto"
                                >
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <RdsBooleanChart
                                                    centerIconName="headset"
                                                    id="Boolean1"
                                                    
                                                    labels={[
                                                        "Total Calls Connected",
                                                        "Total Clients Called",
                                                    ]}
                                                    options={{
                                                        elements: {
                                                            center: {
                                                                text: "50%", //set as you wish
                                                            },
                                                        },
                                                        cutoutPercentage: 75,
                                                        legend: {
                                                            display: false,
                                                        },
                                                        maintainAspectRatio: false,
                                                        responsive: true,
                                                        plugins: {
                                                            series: {
                                                                label: {
                                                                    position: "inside",
                                                                    text: "total", // or "inside" | "outside"
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
                                                                display: false,
                                                                align: "start",
                                                                position: "right",
                                                            },
                                                            tooltip: { enabled: false },
                                                        },
                                                    }}
                                                    dataSets={[
                                                        {
                                                            label: "Dataset 1",
                                                            data: [80, 100 - 80],
                                                            fillStyle: "#d9c9ef33",
                                                            fillRect: [200, 100, 40, 10],
                                                            borderColor: ["transparent"],

                                                            backgroundColor: ["#01AE9D", "#d9c9ef33"],
                                                            cutout: "80%",
                                                            title: {
                                                                text: "Doughnut Chart",
                                                                verticalAlign: "center",
                                                                dockInsidePlotArea: true,
                                                            },
                                                        },
                                                    ]}
                                                    chartStyle={""}
                                                ></RdsBooleanChart>
                                            </div>
                                            <div className="ms-2">
                                                <h3 className="custom-title">80%</h3>
                                                <p className="custom-desc mb-0">
                                                    Total Calls Connected
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mt-3">
                                            <div className="">
                                                <RdsBooleanChart
                                                    centerIconName="users"
                                                    id="Boolean2"
                                                    labels={[
                                                        "Total Client calls connected",
                                                        "Total Client calls disconnected",
                                                    ]}
                                                    options={{
                                                        elements: {
                                                            center: {
                                                                text: "50%", //set as you wish
                                                            },
                                                        },
                                                        cutoutPercentage: 75,
                                                        legend: {
                                                            display: false,
                                                        },
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            series: {
                                                                label: {
                                                                    position: "inside",
                                                                    text: "total", // or "inside" | "outside"
                                                                    display: true,
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
                                                                display: false,
                                                                align: "start",
                                                                position: "right",
                                                                fontSize: 20,
                                                            },
                                                            tooltip: { enabled: false },
                                                        },
                                                    }}
                                                    dataSets={[
                                                        {
                                                            label: "Dataset 1",
                                                            data: [65, 100 - 65],
                                                            fillStyle: "#D0D7DD",
                                                            fillRect: [200, 100, 40, 10],
                                                            backgroundColor: ["#F3AB19", "#d9c9ef33"],
                                                            borderColor: ["transparent"],
                                                            cutout: "80%",
                                                            title: {
                                                                text: "Doughnut Chart",
                                                                verticalAlign: "center",
                                                                dockInsidePlotArea: true,
                                                            },
                                                        },
                                                    ]}
                                                    chartStyle={""}
                                                ></RdsBooleanChart>
                                            </div>
                                            <div className="ms-2">
                                                <h3 className="custom-title">20%</h3>
                                                <p className="custom-desc mb-0">
                                                    Total Clients Called
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </RdsWidget>
                            </div>
                            <div>
                                <RdsWidget
                                    headerTitle="Maximum Profit"
                                    isRefreshRequired={false}
                                    isCardStretch={true}
                                    height="auto"
                                   

                                >
                                    <RdsBigNumber bigNumber="$8,425"></RdsBigNumber>
                                    <RdsLineChart

                                        id="linechart1"

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
                                                    display: false,
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

                                                    enabled: false,

                                                },

                                            },

                                            scales: {

                                                y: {

                                                    axis: "y",

                                                    beginAtZero: true,
                                                    min: 0,
                                                    legend: {
                                                        display: false,
                                                        labels: {

                                                            maxheight: 9,

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



                                                        borderDashOffset: 0,

                                                        borderWidth: 1,
                                                        borderDash: [1, 1],

                                                        color: "#c7c7c7",

                                                        borderColor: "#c7c7c7",


                                                    },

                                                    type: "linear",

                                                    ticks: {

                                                        minRotation: 0,

                                                        maxRotation: 50,

                                                        mirror: false,

                                                        textStrokeWidth: 0,

                                                        textStrokeColor: "",

                                                        padding: 3,

                                                        display: false,

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

                                                    display: false,

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

                                                        drawOnChartArea: false,

                                                        drawTicks: true,

                                                        tickLength: 8,

                                                        offset: false,

                                                        borderDash: [1, 1],

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

                                                        display: false,

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

                                                    display: false,

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

                                                display: false,



                                            },

                                        }}

                                        dataSets={[

                                            {

                                                data: [2.4, 4.7, 2.2, 4.2, 4.5, 2.7, 3.6,],
                                                borderColor: "#4DCFFF",

                                                pointBackgroundColor: "#4DCFFF",

                                                fill: true,

                                                pointRadius: 0,

                                                backgroundColor: (context: ScriptableContext<"line">) => {

                                                    const ctx = context.chart.ctx;

                                                    const gradient = ctx.createLinearGradient(0, 0, 0, 210);

                                                    gradient.addColorStop(0.1, "rgba(77,207,255, 0.8)");

                                                    gradient.addColorStop(0.25, "rgba(77,207,255, 0.1)");

                                                    return gradient;

                                                },

                                                tension: 0.3,

                                            }

                                        ]}

                                    />

                                </RdsWidget>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <RdsWidget
                                isCardStretch={true}
                                headerTitle={"Daily Sales Growth"}
                                isRefreshRequired={true}
                                colorVariant={"white"}
                                class="border-0"
                                bigNumber={"$3,73,960.412"}
                                subTitle="-$5850.75"
                                subTitleColorVariant="danger"
                                icon={"triangle_down"}
                                iconHeight={"12px"}
                                iconStroke={false}
                                iconFill={true}
                                iconWidth={"12px"}
                                iconColor={"danger"}
                            >
                                <div>
                                    <RdsBarChart
                                        id="barchart1"
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
                                                data: [
                                                    15, 67, 34, 78, 45, 87, 76, 32, 50, 14, 35, 22,
                                                ],
                                                backgroundColor: "rgba(54, 162, 235, 1)",
                                                borderColor: "rgba(54, 162, 245, 1)",
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                barThickness: 7,
                                                borderSkipped: false,
                                            },
                                        ]}
                                    />
                                </div>
                            </RdsWidget>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                                    <RdsWidget
                                        headerTitle={"Member Activity"}
                                        isRefreshRequired={true}
                                        isCardStretch={true}
                                    >
                                        <div className="table-responsive">
                                            <RdsTable
                                                tableHeightForScroll="356px"
                
                                                headerDatas={[
                                                    {
                                                        displayName: ("Members"),
                                                        key: "member",
                                                        dataType: "html",
                                                    },
                                                    { displayName: ("Cases"), key: "cases", dataType: "html" },
                                                    {
                                                        displayName: ("Active"),
                                                        key: "active",
                                                        dataType: "html",
                                                    },
                                                    {
                                                        displayName: ("Closed"),
                                                        key: "closed",
                                                        dataType: "html",
                                                    },
                                                    { displayName: ("Rate"), key: "rate", dataType: "html" },
                                                ]}
                                                tableDatas={[
                                                    {
                                                        id: 12,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Brian</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Software Developer{" "}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 38 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="HighRate d-flex align-items-center justify-content-start ">
                                                                92%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 23,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 18 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Kim</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Senior Developer{" "}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 342 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 25 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                                42%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 22,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 7 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Jane</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Sales Executive{" "}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 25 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 5 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="HighRate d-flex align-items-center justify-content-start">
                                                                96%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 11,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 14 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Brian</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Software Developer
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 42 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 42 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="LowRate d-flex align-items-center justify-content-start">
                                                                16%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 19,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 13 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Kath</b>
                                                                    </p>
                                                                    <small>Manager </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 3 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                                52%
                                                            </div>
                                                        ),
                                                    },
                                                    ,
                                                    {
                                                        id: 20,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 13 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Kath</b>
                                                                    </p>
                                                                    <small>Manager </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 3 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                                52%
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                            ></RdsTable>
                                        </div>
                                    </RdsWidget>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <RdsWidget
                        headerTitle="To do List"
                        isRefreshRequired={true}
                        isCardStretch={true}
                    >
                        <div className="table-responsive">
                            <RdsTable id="sortable"

                                headerDatas={[
                                    {
                                        displayName: "Project",
                                        key: "project",
                                        dataType: "html",
                                    },
                                    { displayName: "Issue", key: "issue", dataType: "html" },

                                    {
                                        displayName: "Progress",
                                        key: "progress",
                                        dataType: "html",
                                    },
                                ]}
                                tableDatas={[
                                    {
                                        id: 1,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Activate your account with others intil June 2023
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small >Website </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <div>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        width={"245px"}
                                                        displayPercentage={false}
                                                        colorVariant={"primary"}
                                                        progressWidth={40}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small >Due in two days</small>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Your Order @22345678 has been confirmed
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>ABP Framework</b>
                                                    </p>
                                                    <small>Modules</small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"danger"}
                                                        progressWidth={20}
                                                        role={"single"}
                                                        width={"245px"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small>Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Create a new page for CMS
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>ASPNET Zero</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Payment Module
                                                    </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"success"}
                                                        progressWidth={80}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div className="custom-desc">
                                                    <div>Payment Module</div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small className="custom-desc">ABP framework</small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"warning"}
                                                        progressWidth={80}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Activate your account with others intil June 2023
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small className="custom-desc">Website </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"primary"}
                                                        progressWidth={40}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                ]}
                            ></RdsTable>
                        </div>
                    </RdsWidget>
                </div>
            </div>
        </div>

    );
};

export default RdsCompTenantDashboard;
