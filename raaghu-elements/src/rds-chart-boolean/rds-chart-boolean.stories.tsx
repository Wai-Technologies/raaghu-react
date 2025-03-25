import RdsBooleanChart from "./rds-chart-boolean";
import "./rds-chart-boolean.css";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Charts/Boolean Chart',
    component: RdsBooleanChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        centerIconName: {
            options: ["users", "headset", "circle"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsBooleanChart>;

export default meta;
type Story = StoryObj<typeof RdsBooleanChart>;

export const BooleanChart: Story = {
    args: {
        id: "BooleanId",
        centerIconName: "users",
        dataSets: [
            {
                label: "Dataset 1",
                data: [20, 10],
                fillStyle: "blue",
                fillRect: [200, 100, 40, 10],
                backgroundColor: [
                    "#01AE9D",
                    "#E1E1E1"

                ],
                borderColor: [
                    "#fff",
                ],
                borderWidth: 1,
                cutout: "90%",
                title: {
                    text: "Doughnut Chart",
                    verticalAlign: "center",
                    dockInsidePlotArea: true
                },
            }
        ],
        labels: ["green", "grey"],

        options: {
            maintainAspectRatio: false,
            elements: {
                center: {
                    text: "50%"  //set as you wish
                }
            },
            cutoutPercentage: 75,
            legend: {

                display: false
            },
            responsive: true,
            plugins: {

                series: {
                    label: {
                        position: "inside",
                        text: "total", // or "inside" | "outside"
                        display: false
                    }
                },
                doughnutlabel: {
                    labels: [{
                        text: "550",
                        font: {
                            size: 20,
                            weight: "bold"
                        }
                    }, {
                        text: "total"
                    }
                    ]
                },

                legend: {
                    display: false,
                    align: "center",
                    position: "top",

                },


            }
        },
    }
};



