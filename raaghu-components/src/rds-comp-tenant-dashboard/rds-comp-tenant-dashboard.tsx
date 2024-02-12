import React from "react";
import { RdsTable, RdsWidget } from "../rds-elements";
import {
    RdsLineChart,
    RdsDoughnutChart,
    RdsBooleanChart,
    RdsBarChart
} from "../rds-elements";

const RdsCompTenantDashboard = () => {

    return (
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-6">
                    <RdsWidget
                        headerTitle={"Monthly Summary"}
                        isRefreshRequired={true}
                        class="card-stretch"
                        colorVariant="white"
                    >
                        <RdsLineChart
                            id="linechart"
                            height={250}
                            width={458}
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

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <RdsWidget
                                    headerTitle={"Sales"}
                                    isRefreshRequired={false}
                                    class="card-stretch-half"
                                    colorVariant="white"
                                    iconColor="success"
                                    subTitleColorVariant="success"
                                    subTitle="+$2203.00"
                                    iconFill={true}
                                    bigNumber="$3,32,230.00"
                                    iconWidth="12px"
                                    iconHeight="12px"
                                    icon="triangle_up"
                                    iconStroke={true}
                                ></RdsWidget>
                            </div>
                            <div>
                                <RdsWidget
                                    headerTitle={"Revenue"}
                                    isRefreshRequired={false}
                                    bigNumber={"$9,72,900"}
                                    colorVariant="primary"
                                    subTitle="-$1203.00"
                                    subTitleColorVariant="warning"
                                    icon={"triangle_down"}
                                    iconHeight={"12px"}
                                    iconStroke={false}
                                    iconFill={true}
                                    iconWidth={"12px"}
                                    iconColor={"warning"}
                                ></RdsWidget>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <RdsWidget
                                headerTitle={"Profit Share"}
                                isRefreshRequired={true}
                                colorVariant={"white"}
                                bigNumber={"$39,330.00"}
                            >
                                <div>
                                    <div className="col col-sm-12">
                                        <RdsDoughnutChart
                                            id="doughnutchart"
                                            titleText="45K"
                                            subTitleText="Profit"
                                            height={200}
                                            width={255}
                                            labels={[
                                                "Total Sales - 90%",
                                                "Revenue - 25%",
                                                "Expenses - 15%",
                                            ]}
                                            options={{
                                                cutoutPercentage: 40,
                                                legend: {
                                                    display: false,
                                                },
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                title: {
                                                    fontColor: "#fff",
                                                },
                                                subtitles: {
                                                    fontColor: "#fff",
                                                },
                                                plugins: {
                                                    series: {
                                                        label: {
                                                            position: "inside",
                                                            text: "total",
                                                            display: false,
                                                        },
                                                    },
                                                    title: {
                                                        fontColor: "#fff",
                                                    },
                                                    subtitles: {
                                                        fontColor: "#fff",
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
                                                        fontColor: "#fff",
                                                    },
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </RdsWidget>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <RdsWidget
                                    headerTitle={"call Overview"}
                                    isRefreshRequired={false}
                                    colorVariant={"white"}
                                >
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <RdsBooleanChart
                                                    centerIconName="headset"
                                                    id="Boolean1"
                                                    height={100}
                                                    width={100}
                                                    labels={["Total Connected calls", "Total calls"]}
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
                                                            fillStyle: "#E1E1E1",
                                                            fillRect: [200, 100, 40, 10],
                                                            backgroundColor: [
                                                                "--chartColor1",
                                                                "--chartColor7",
                                                            ],
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
                                                    chartStyle={""}
                                                ></RdsBooleanChart>
                                            </div>
                                            <div className="ms-2">
                                                <h5 className="custom-title">80%</h5>
                                                <p className="custom-desc mb-0">
                                                    Total Calls Connected
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mt-3">
                                            <div className="">
                                                <RdsBooleanChart
                                                    centerIconName="headset"
                                                    id="Boolean2"
                                                    height={100}
                                                    width={100}
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
                                                            backgroundColor: [
                                                                "--chartColor9",
                                                                "--chartColor7",
                                                            ],
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
                                                    chartStyle={""}
                                                ></RdsBooleanChart>
                                            </div>
                                            <div className="ms-2">
                                                <h5 className="custom-title">20%</h5>
                                                <p className="custom-desc mb-0">
                                                    "Total Clients Called"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </RdsWidget>
                            </div>
                            <div>
                                <RdsWidget
                                    headerTitle={"Sales"}
                                    isRefreshRequired={false}
                                    colorVariant={"white"}
                                    subTitle="-$2203.00"
                                    subTitleColorVariant="success"
                                    bigNumber={"$3,32,230.00"}
                                    icon={"triangle_up"}
                                    iconHeight={"12px"}
                                    iconStroke={false}
                                    iconFill={true}
                                    iconWidth={"12px"}
                                    iconColor={"success"}
                                ></RdsWidget>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <RdsWidget
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
                <div className="col-md-6">
                    <RdsWidget
                        headerTitle={"Member Activity"}
                        isRefreshRequired={true}
                        colorVariant={"white"}
                    >
                        <div className='table-responsive'>
                            <RdsTable
                                headerDatas={[
                                    { displayName: "Member", key: "member", dataType: "html" },
                                    { displayName: "Cases", key: "cases", dataType: "html" },
                                    { displayName: "Active", key: "active", dataType: "html" },
                                    { displayName: "Closed", key: "closed", dataType: "html" },
                                    { displayName: "Rate", key: "rate", dataType: "html" },
                                ]}
                                tableDatas={[
                                    {
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    {" "}
                                                    <img src="dashboard-data.png" width="40px" />
                                                </div>
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-0\">
                                                        <b>Brian</b>
                                                    </p>
                                                    <small className="text-muted\">
                                                        Software Developer{" "}
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 38 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="\HighRate d-flex align-items-center justify-content-center\">
                                                92%
                                            </div>
                                        ),
                                    },
                                    {
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 18 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center\">
                                                <div>
                                                    {" "}
                                                    <img src="dashboard-data.png" width="40px" />
                                                </div>
                                                <div className="ms-2 mt-2">
                                                    <p className="mb-0">
                                                        <b>Kim</b>
                                                    </p>
                                                    <small className="text-muted\">
                                                        Senior Developer{" "}
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 342 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 25 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="MidRate d-flex align-items-center justify-content-center\">
                                                42%
                                            </div>
                                        ),
                                    },
                                    {
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 7 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center\">
                                                <div>
                                                    {" "}
                                                    <img src="dashboard-data.png" width="40px\" />
                                                </div>
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-0\">
                                                        <b>Jane</b>
                                                    </p>
                                                    <small className="text-muted\">
                                                        Sales Executive{" "}
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 25 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 5 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="HighRate d-flex align-items-center justify-content-center\">
                                                96%
                                            </div>
                                        ),
                                    },
                                    {
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 14 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center\">
                                                <div>
                                                    {" "}
                                                    <img src="dashboard-data.png" width="40px\" />
                                                </div>
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-0\">
                                                        <b>Brian</b>
                                                    </p>
                                                    <small className="text-muted\">
                                                        Software Developer
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 42 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 42 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="LowRate d-flex align-items-center justify-content-center\">
                                                16%
                                            </div>
                                        ),
                                    },
                                    {
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 13 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center\">
                                                <div>
                                                    {" "}
                                                    <img src="dashboard-data.png" width="40px\" />
                                                </div>
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-0\">
                                                        <b>Kath</b>
                                                    </p>
                                                    <small className="text-muted\">Manager </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-center\">
                                                <div> 3 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="MidRate d-flex align-items-center justify-content-center\">
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
        </div>

    );
};

export default RdsCompTenantDashboard;
