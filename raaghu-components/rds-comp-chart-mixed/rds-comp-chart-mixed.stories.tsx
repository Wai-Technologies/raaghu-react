import RdsCompMixedChart from "./rds-comp-chart-mixed";
import "./rds-comp-chart-mixed.scss";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Mixed Chart',
    component: RdsCompMixedChart,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
    component: 'The **Mixed Chart** element combines multiple chart types—such as bars and lines—into a single cohesive visualization. It supports flexible **datasets**, where each dataset can define its own chart type (e.g., bar or line), colors, and rendering order. The chart uses customizable **labels** to represent categories on the x-axis and provides extensive configuration options via the **options** property. These options include point styles (e.g., triangles), radius size, legends, tooltips, and responsiveness. This component is ideal for visualizing and comparing different types of data in a unified view, making it a powerful tool for dashboards and reports.'
 
}

        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompMixedChart>;

export default meta;
type Story = StoryObj<typeof RdsCompMixedChart>;


export const Default: Story = {
    args: {
        id: "mixed_chart",
        dataSets: [
            {
                type: "bar",
                label: "Bar Dataset",
                data: [0, 37, -3, 70, -25, 50, -24],
                backgroundColor: "rgb(248, 188, 198)",
                borderColor: "rgb(248, 188, 198)",
                order: 0
            },
            {
                type: "line",
                label: "Line Dataset",
                data: [25, 5, 90, 78, 17, 17, -98],
                borderColor: "blue",
                backgroundColor: "blue",
                order: 1
            }
        ],

        labels: ["January", "February", "March", "April", "May", "June", "July"],

        options: {
            radius: 10,
            pointStyle: "triangle",
            plugins: {
                legend: {
                    position: "top",
                    align: "center",
                    pointStyle: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                tooltip: {
                    usePointStyle: true,
                },
            },
            responsive: true,
            maintainAspectRatio: false,
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