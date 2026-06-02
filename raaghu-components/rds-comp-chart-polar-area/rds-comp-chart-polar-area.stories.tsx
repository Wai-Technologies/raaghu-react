import RdsCompPolarAreaChart from "./rds-comp-chart-polar-area";
import "./rds-comp-chart-polar-area.scss";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Polar Area Chart',
    component: RdsCompPolarAreaChart,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 'The **Polar Area Chart** element is a circular chart that represents data as segments of a polar area. Each segment’s size is proportional to its value, making it ideal for comparing data across multiple categories in a radial layout. It supports customizable **datasets**, allowing users to define data values, colors, and labels for each segment. The chart also provides extensive configuration options via the **options** property, including animations (e.g., rotation and scaling), legends, tooltips, and responsiveness. This component is fully configurable and visually appealing, making it a great choice for dashboards and reports where radial data visualization is required.'
    }
}
        
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPolarAreaChart>;

export default meta;
type Story = StoryObj<typeof RdsCompPolarAreaChart>;

export const Default: Story = {
    args: {
        id: "Polar_Area_chart",
        radius: 300,
        dataSets: [
            {
                label: "Dataset 1",
                data: [100, 70, 80, 96, 87, 77],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(167, 145, 78, 0.5)"
                ],
                    borderColor: [
                        "#f8bbd0", 
                        "#90caf9", 
                        "#fff9c4", 
                        "#b2ebf2", 
                        "#ce93d8", 
                        "#ffe0b2"  
                    ],
                   borderWidth: 3,
            }
        ],
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        options: {
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: false
            },
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    pointStyle: "line",

                    labels: {

                        usePointStyle: true
                    }
                },
                tooltip: {
                    usePointStyle: true,
                },
                title: {
                    display: true,
                    text: "Polar Area Chart"
                }
            }
        },
    },
    parameters: {
        controls: {
            exclude: ['chartStyle'],
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole('img');
        await expect(chart).toBeInTheDocument();
    },
};