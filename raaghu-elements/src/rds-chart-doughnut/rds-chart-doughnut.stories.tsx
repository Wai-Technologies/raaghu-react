import RdsDoughnutChart from "./rds-chart-doughnut";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Doughnut Chart',
    component: RdsDoughnutChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsDoughnutChart>;

export default meta;
type Story = StoryObj<typeof RdsDoughnutChart>;

export const DoughnutChart: Story = {
    args: {
        id: "myChart",
        titleText: "35 k",
        subTitleText: "deioj",
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
        options: {
            maintainAspectRatio: false,
            type: "doughnut",
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Chart.js Doughnut Chart"
                    },
                    subTitle: {
                        fontColor: "#fff",
                    }
                }
            }
        },
        dataSets: [
            {
                label: "Dataset 1",
                data: [20, 10, 20, 40, 10],
                backgroundColor: [
                    "#ff6384",
                    "#ff9f40",
                    "#ffcd56",
                    "#4bc0c0",
                    "#0000FF"
                ],
                borderColor: [
                    "#fff",
                ],
            }
        ],

       
    }
} satisfies Story;

export const advanced: Story = {
    args: {
        id: "doughnutchart",
        labels: ['Total Sales - 85%', 'Revenue - 25%', 'Expenses - 15%'],
        options: {
            animationEnabled: true,
            title: {
                fontColor: "#fff",
            },
            cutoutPercentage: 80,
            legend: {
                display: false,
            },
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
                    position: "top",
                    labels: {
                        boxWidth: 15,
                        padding: 15,
                    },
                },
                tooltip: { enabled: false },
            },
            scales: {},
        },
        dataSets: [
            {

                label: "Total Sales",
                data: [85, 0, 0, 15],
                backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                weight: 0.2,
                borderRadius: 20,
                borderColor: ["transparent"]
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
        ]
    }
};
