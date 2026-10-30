
import RdsCompRadarChart from "./rds-comp-chart-radar";
import figma from "@figma/code-connect";

figma.connect(
    RdsCompRadarChart,
    "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=10004-2478",
    {
        example: () => (
            <RdsCompRadarChart
                data={{
                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "June",
                        "July",
                    ],
                    datasets: [
                        {
                            label: "Dataset 1",
                            data: [0.5, 0.8, 0.4, 0.6, 0.7, 0.2, 0.9],
                            borderColor: ["var(--rds-chart-series-5)"],
                            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                            fill: false,
                            pointRadius: 2,
                            pointStyle: "circle",
                        },
                        {
                            label: "Dataset 2",
                            data: [0.9, 0.3, 0.8, 0.9, 0.1, 0.7, 0.2],
                            borderColor: ["var(--rds-chart-series-1)"],
                            backgroundColor: ["rgba(255, 206, 86, 0.2)"],
                            fill: true,
                            pointRadius: 2,
                            pointStyle: "circle",
                        },
                        {
                            label: "Dataset 3",
                            data: [0.7, 0.2, 0.1, 0.9, 0.8, 0.4, 0.7],
                            borderColor: ["var(--rds-chart-named-green-soft)"],
                            backgroundColor: ["rgba(255, 240, 204, 0.2)"],
                            fill: false,
                            pointRadius: 2,
                            pointStyle: "circle",
                        },
                    ],
                }}
                id="Radar_Chart"
                ariaLabel="Radar chart comparing three datasets"
                options={{
                    responsive: false,
                    plugins: {
                        legend: {
                            align: "start",
                            position: "top",
                            labels: {
                                boxHeight: 8,
                                boxWidth: 8,
                                padding: 20,
                                pointStyle: "circle",
                                usePointStyle: true,
                            },
                        },
                        title: {
                            display: true,
                            text: "Radar Chart",
                        },
                        tooltip: {
                            usePointStyle: true,
                        },
                    },
                    scales: {
                        r: {
                            type: "radialLinear",
                            display: true,
                            startAngle: 0,
                            beginAtZero: false,
                            angleLines: {
                                display: true,
                                lineWidth: 1,
                                color: "rgba(0, 0, 0, 0.1)",
                            },
                            grid: {
                                circular: false,
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)",
                            },
                            ticks: {
                                showLabelBackdrop: true,
                                color: "var(--rds-chart-axis)",
                                padding: 3,
                                backdropColor: "rgba(255, 255, 255, 0.75)",
                                backdropPadding: 2,
                            },
                            pointLabels: {
                                display: true,
                                font: {
                                    size: 10,
                                },
                                padding: 5,
                                centerPointLabels: false,
                                color: "var(--rds-chart-axis)",
                            },
                        },
                    },
                }}
            />
        ),
    },
);
