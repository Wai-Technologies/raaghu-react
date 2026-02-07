import RdsCompBooleanChart from "./rds-comp-chart-boolean";
import "./rds-comp-chart-boolean.scss";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Charts/Boolean Chart',
    component: RdsCompBooleanChart,
    parameters: {
        layout: 'padded',
        docs: {
           description: {
  component: 'The **Boolean Chart** element is part of our design system, designed to display binary or proportional data in a clear and intuitive doughnut chart format. It supports customizable center icons, labels, and color schemes, making it ideal for representing metrics like completion rates or binary comparisons. Fully responsive and configurable, this element adapts seamlessly to different layouts and enhances data comprehension.',
},

        },
    },
    tags: ['autodocs'],
    argTypes: {
        centerIconName: {
            options: ["users", "headset", "circle"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCompBooleanChart>;

export default meta;
type Story = StoryObj<typeof RdsCompBooleanChart>;

export const Default: Story = {
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
                    text: "50%"
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
                        text: "total",
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
    },
    parameters: {
        controls: {
            exclude: [
                    'chartStyle', 
            ],
        },
     }, 
};