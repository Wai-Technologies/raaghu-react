import React, { useState } from "react";
import {
    RdsProgressBar,
    RdsWidget,
    RdsLineChart,
    RdsBigNumber,
    RdsDoughnutChart,
    RdsBooleanChart,
    RdsBarChart,
    RdsTable,
    RdsIcon,
    RdsMap
} from "../rds-elements";
import { ScriptableContext } from "chart.js";
export interface RdsCompAdminDashboardProps {
    user: string,
}
const RdsCompAdminDashboard = (props: RdsCompAdminDashboardProps) => {
    const [headerTitle, setHeaderTitle] = useState('Daily Summary');
    const [isDayChart, setDayChart] = useState(true);
    const [isWeeklyChart, setWeeklyChart] = useState(false);
    const [isMonthlyChart, setMonthlyChart] = useState(false);
    const [isInnerClass, setInnerClass] = useState("innerCardFront");
    const monthlySummaryChartOptions = () => {
        return;
    };

    const buttonGroupList = [{
        id: 'radio1',
        label: "Day",
        name: 'btnradio',
        checked: isDayChart,

    },
    {
        id: 'radio2',
        label: "Week",
        name: 'btnradio',
        checked: isWeeklyChart,
    },
    {
        id: 'radio3',
        label: "Month",
        name: 'btnradio',
        checked: isMonthlyChart
    }
    ];

    const handleButtonClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const clickedButtonId = (event.target as HTMLInputElement).id;
        if (clickedButtonId == 'radio1') {
            setHeaderTitle("Daily Summary");
            setDayChart(true);
            setMonthlyChart(false);
            setWeeklyChart(false);
        }

        else if (clickedButtonId == 'radio2') {
            setHeaderTitle("Weekly Summary");
            setWeeklyChart(true);
            setDayChart(false);
            setMonthlyChart(false);
        }

        else if (clickedButtonId == 'radio3') {
            setHeaderTitle("Monthly Summary");
            setMonthlyChart(true);
            setDayChart(false);
            setWeeklyChart(false);
        }
    }

    const mapList = [
        { country: "cn", value: 1389618778 }, // china
        { country: "in", value: 1311559204 }, // india
        { country: "us", value: 331883986 },  // united states
        { country: "id", value: 264935824 },  // indonesia
        { country: "pk", value: 210797836 },  // pakistan
        { country: "br", value: 210301591 },  // brazil
        { country: "ng", value: 208679114 },  // nigeria
        { country: "bd", value: 161062905 },  // bangladesh
        { country: "ru", value: 141944641 },  // russia
        { country: "mx", value: 127318112 }   // mexico
    ];

    const onBackSide = () => {
        setInnerClass("innerCardBack");
    }

    const onFrontSide = () => {
        setInnerClass("innerCardFront");
    }

    return (

        <div className="dark dashboard bg-grey p-4">
            <div className="row">
                <div className="col-xl-6  col-lg-6 col-md-12 d-cus-none">
                <RdsWidget
                        headerTitle={headerTitle}
                        isRefreshRequired={false}
                        isButtonGroupRequired={true}
                        buttonGroupList={buttonGroupList}
                        handleButtonClick={handleButtonClick}
                        isCardStretch={true}
                    >

                        {isDayChart == true && (

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
                                        x: {
                                            display: true,
                                            grid: {
                                                display: false
                                            }
                                        },
                                        y: {
                                            grid: {
                                                drawTicks: true,
                                                drawBorder: true,
                                                borderWidth: 1,
                                                borderDash: [5, 5],
                                                borderDashOffset: 2,
                                                tickBorderDash: [5, 5],
                                                color: 'rgba(218, 221, 224, 0.8)',
                                                // color: 'rgba(255, 255, 255, 0.5)',
                                                // lineWidth: ctx => ctx.index % 5 ? 1 : 0
                                            },
                                            border: {
                                                dash: [3, 3]
                                            },
                                        }
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

                        )

                        }

                        {isWeeklyChart == true && (

                            <RdsLineChart

                                id="linechart"

                                labels={["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"]}

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

                                                pointStyleWidth: 13,

                                                boxWidth: 10,

                                                boxHeight: 10,

                                                padding: 20,

                                                height: 5,

                                            },

                                        },

                                        tooltip: {

                                            enabled: true,

                                        },

                                    },

                                    scales: {
                                        x: {
                                            display: true,
                                            grid: {
                                                display: false
                                            }
                                        },
                                        y: {
                                            grid: {
                                                drawTicks: true,
                                                drawBorder: true,
                                                borderWidth: 1,
                                                borderDash: [5, 5],
                                                borderDashOffset: 2,
                                                tickBorderDash: [5, 5],
                                                color: 'rgba(218, 221, 224, 0.8)',
                                                // color: 'rgba(255, 255, 255, 0.5)',
                                                // lineWidth: ctx => ctx.index % 5 ? 1 : 0
                                            },
                                            border: {
                                                dash: [3, 3]
                                            },
                                        }
                                    },

                                    tooltip: {

                                        display: true,

                                        usePointStyle: true,

                                    },

                                }}

                                dataSets={[

                                    {

                                        label: "Sales",

                                        data: [5, 6, 2.2, 5.2, 8.5, 9, 3.6, 4.5, 6.2, 8, 10.3, 6.7],

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

                                        data: [5, 6, 3.2, 8.2, 3.5, 2.7, 6.6, 8.5, 9.2, 10.4, 3.2, 6.7],

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

                        )}

                        {isMonthlyChart == true && (

                            <RdsLineChart

                                id="linechart"

                                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}

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
                                        x: {
                                            display: true,
                                            grid: {
                                                display: false
                                            }
                                        },
                                        y: {
                                            grid: {
                                                drawTicks: true,
                                                drawBorder: true,
                                                borderWidth: 1,
                                                borderDash: [5, 5],
                                                borderDashOffset: 2,
                                                tickBorderDash: [5, 5],
                                                color: 'rgba(218, 221, 224, 0.8)',
                                                // color: 'rgba(255, 255, 255, 0.5)',
                                                // lineWidth: ctx => ctx.index % 5 ? 1 : 0
                                            },
                                            border: {
                                                dash: [3, 3]
                                            },
                                        }
                                    },
                                    tooltip: {

                                        display: true,

                                        usePointStyle: true,

                                    },

                                }}

                                dataSets={[

                                    {

                                        label: "Sales",

                                        data: [4, 3, 6.2, 4.2, 7.5, 2, 8.6, 6.5, 7.2, 3, 7.2, 4],

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

                                        tension: 0.6,

                                    },

                                    {

                                        label: "Revenue",
                                        data: [4, 1, 5.5, 4.9, 9, 3.9, 10, 5, 8.1, 0.8, 6.7, 4],
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

                                        tension: 0.6,

                                    },

                                ]}
                            />
                        )}
                    </RdsWidget>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                    <div className="FlipCard">
                        <div className={`innerCard ${isInnerClass}`}>
                            <div className="frontSide">
                                <RdsWidget
                                    headerTitle="Sales"
                                    isRefreshRequired={true}
                                    border={false}
                                    isIcon={false}
                                    iconName="flip_back"
                                    iconTooltipLabel={"Flip"}
                                    iconTooltipPosition={"top"}
                                    iconColor="success"
                                    isBignumberIcon={true}
                                    isCardStretch={true}
                                    bigNumberLabel="$632,230"
                                    iconLabel="$27,203"
                                    onIconClick={onBackSide}>
                                    <div className="pt-xxl-3 pt-xl-3 pt-lg-3 pt-md-5 pt-3 mt-lg-0 mt-md-5 mt-0 map-container">
                                        
                                        <RdsMap
                                            color="purple"
                                            mapList={mapList}></RdsMap>
                                    </div>
                                </RdsWidget>
                            </div>
                            <div className="backSide">
                                <RdsWidget
                                    headerTitle="Revenue"
                                    isRefreshRequired={true}
                                    isIcon={false}
                                    isButton={true}
                                    iconName="flip_front"
                                    iconTooltipLabel={"Flip"}
                                    iconTooltipPosition={"top"}
                                    iconColor="danger"
                                    isBignumberIcon={true}
                                    isCardStretch={true}
                                    bigNumberLabel="$49,361"
                                    iconLabel="$9,543"
                                    onIconClick={onFrontSide}>
                                    <div className="pt-xxl-3 pt-xl-3 pt-lg-3 pt-md-5 pt-3 mt-lg-0 mt-md-5 mt-0 map-container">
                                        <RdsMap
                                            color="#A478E6"
                                            mapList={mapList}></RdsMap>
                                    </div>
                                </RdsWidget>
                            </div>
                        </div>
                    </div>
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
                                headerTitle="Daily Sales Growth"
                                isRefreshRequired={true}
                                isCardStretch={true}
                            >
                                <div>
                                    <RdsBigNumber
                                        bigNumber="$373,960"
                                        icon={"triangle_down"}
                                        iconHeight={"12px"}
                                        subTitle="-$5850"
                                        iconStroke={false}
                                        iconFill={true}
                                        iconWidth={"12px"}
                                        subTitleColorVariant="danger"
                                    ></RdsBigNumber>
                                    <div className="d-flex align-items-center fw-normal my-2 mb-4">
                                        <span>
                                            <RdsIcon
                                                name="triangle_up"
                                                height="14px"
                                                width="14px"
                                                colorVariant="danger"
                                                fill={true}
                                                stroke={false} />
                                        </span>
                                        <span className={'fs-6 fw-medium text-danger'}>$5850</span>
                                    </div>
                                    <RdsBarChart
                                        id="barchart"
                                        labels={[
                                            "Day4",
                                            "Day8",
                                            "Day12",
                                            "Day16",
                                            "Day20",
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
                                                    grid: {
                                                        drawTicks: true,
                                                        drawBorder: true,
                                                        borderWidth: 1,
                                                        borderDash: [5, 5],
                                                        borderDashOffset: 2,
                                                        tickBorderDash: [5, 5],
                                                        color: 'rgba(218, 221, 224, 0.8)',
                                                    },
                                                    border: {
                                                        dash: [3, 3]
                                                    },
                                                },
                                                y: {
                                                    display: true,
                                                    grid: {
                                                        display: false
                                                    }
                                                }
                                            },
                                        }}
                                        dataSets={[
                                            {
                                                label: "Sales Growth",
                                                data: [
                                                    15, 18, 67, 34, 78, 45, 87, 76, 32, 50, 14, 35, 22,
                                                ],
                                                backgroundColor: (
                                                    context: ScriptableContext<"line">
                                                ) => {
                                                    const ctx = context.chart.ctx;
                                                    const gradient = ctx.createLinearGradient(
                                                        0,
                                                        50,
                                                        0,
                                                        300
                                                    );
                                                    gradient.addColorStop(0, "rgba(54, 162, 235, 1)");
                                                    gradient.addColorStop(
                                                        1,
                                                        "rgba(54, 162, 235, 0.08)"
                                                    );
                                                    return gradient;
                                                },
                                                borderColor: "#666666",
                                                borderWidth: 0,
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
                        headerTitle="Member Activity"
                        isRefreshRequired={true}  
                        isCardStretch={true}
                        >
                        <div className="table-responsive">
                            <div className="tableheigthMemberActivity">
                            <RdsTable
                                headerDatas={[
                                    {
                                        displayName: "Members",
                                        key: "member",
                                        dataType: "html",
                                    },
                                    { displayName: "Cases", key: "cases", dataType: "html" },
                                    {
                                        displayName: "Active",
                                        key: "active",
                                        dataType: "html",
                                    },
                                    {
                                        displayName: "Closed",
                                        key: "closed",
                                        dataType: "html",
                                    },
                                    { displayName: "Rate", key: "rate", dataType: "html" },
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
                                // tableHeightForScroll="356px"
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

export default RdsCompAdminDashboard;