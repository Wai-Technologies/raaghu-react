import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsWidget from "./rds-widget";
import RdsLineChart from "../rds-chart-line";
import RdsBarChart from "../rds-chart-bar";
import RdsDoughnutChart from "../rds-chart-doughnut";

export default {
    title: "Elements/Widget",
    component: RdsWidget,
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
    },
} as ComponentMeta<typeof RdsWidget>;

const Template: ComponentStory<typeof RdsWidget> = (args) => (
    <RdsWidget {...args}>{args.children}</RdsWidget>
);

export const Default = Template.bind({});
Default.args = {
    colorVariant: "gradient-primary",
    subTitleColorVariant: "primary",
    headerTitle: "Widget",
    isRefreshRequired: true,
    border: true,
};

export const WidgetWithLineChart = Template.bind({});
WidgetWithLineChart.args = {
    colorVariant: "white",
    subTitleColorVariant: "primary",
    headerTitle: "Monthly Summary",
    isRefreshRequired: true,
    children: (
        <RdsLineChart
            id="linechart"
            height={250}
            width={650}
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
                    data: [190, 200, 133, 231, 112, 125, 135, 135.7, 266, 224, 122, 125],
                    borderColor: "#4DCFFF",
                    pointBackgroundColor: "#4DCFFF",
                    fill: true,
                    pointRadius: 3,
                    tension: 0.4,
                },
                {
                    label: "Revenue",
                    data: [290, 262, 205, 162, 150, 180, 206, 220, 240, 190, 275, 211],
                    borderColor: "#863BFF",
                    pointBackgroundColor: "#863BFF",
                    fill: true,
                    pointRadius: 3,
                    tension: 0.4,
                },
            ]}
        />
    ),
};

export const WidgetWithDoughnutChart = Template.bind({});
WidgetWithDoughnutChart.args = {
    colorVariant: "white",
    subTitleColorVariant: "primary",
    bigNumber: "$13,20,21",
    headerTitle: "Profit Share",
    isRefreshRequired: true,
    children: (
        <RdsDoughnutChart
            id="doughnutchart"
            height={200}
            width={255}
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
    ),
};

export const WidgetWithBarChart = Template.bind({});
WidgetWithBarChart.args = {
    colorVariant: "white",
    subTitleColorVariant: "primary",
    iconFill: true,
    iconStroke: true,
    iconHeight: "15px",
    iconWidth: "15px",
    bigNumber: "$13,20,21",
    subTitle: "+$1,203",
    icon: "triangle_up",
    headerTitle: "Daily Sales Growth",
    isRefreshRequired: true,
    children: (
        <RdsBarChart
            id="barchart"
            height={300}
            width={300}
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
};

// export const WidgetWithBooleanChart = Template.bind({})
// WidgetWithBooleanChart.args ={
//   colorVariant: 'white',
//   subTitleColorVariant: 'primary',
//   headerTitle: "Call Overview",
//   isRefreshRequired: true,
//   children: <RdsBooleanChart id="Booleanchart"
//   height={200}
//   width={200}
//   labels={[
//     "Total Client calls connected",
//   "Total Client calls disconnected"
//   ]}
//   options={ {
//     "elements": {
//       "center": {
//         "text": "50%"
//       }
//     },
//     "cutoutPercentage": 75,
//     "legend": {
//       "display": false
//     },
//     "responsive": true,
//     "maintainAspectRatio": false,
//     "plugins": {
//       "series": {
//         "label": {
//           "position": "inside",
//           "text": "total",
//           "display": true
//         }
//       },
//       "doughnutlabel": {
//         "labels": [
//           {
//             "text": "550",
//             "font": {
//               "size": 20,
//               "weight": "bold"
//             }
//           },
//           {
//             "text": "total"
//           }
//         ]
//       },
//       "legend": {
//         "display": false,
//         "align": "start",
//         "position": "right",
//         "fontSize": 20
//       },
//       "tooltip": {
//         "enabled": false
//       }
//     },
//     "scales": {}
//   }}
//   dataSets ={[
//     {
//       "label": "Dataset 1",
//       "data": [
//         65,
//         35
//       ],
//       "fillStyle": "#D0D7DD",
//       "fillRect": [
//         200,
//         100,
//         40,
//         10
//       ],
//       "backgroundColor": [
//         "green",
//         "white"
//       ],
//       "borderColor": [
//         "#fff"
//       ],
//       "borderWidth": 1,
//       "cutout": "80%",
//       "title": {
//         "text": "Doughnut Chart",
//         "verticalAlign": "center",
//         "dockInsidePlotArea": true
//       }
//     }
//   ]}/>
// };
