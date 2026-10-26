
import RdsCompPieChart from "./rds-comp-chart-pie";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Pie Chart',
    component: RdsCompPieChart,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs:{
            description: {
    component: 'The **Pie Chart** element is a **customizable** and **interactive** component designed to display data as proportional slices of a circle. It supports configuration of key properties like **radius**, **labels**, **animation**, and **legend styling**, making it ideal for dashboards and analytics. The component visualizes datasets with distinct colors and smooth transitions, providing clear and engaging data presentations that adapt responsively to different screen sizes.',
},
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the chart container.' },
        sx: { control: 'object', description: 'MUI system styles applied to the chart container.' },
        ref: { control: false, description: 'React ref to the chart container; assign it in code.' },
    },
} satisfies Meta<typeof RdsCompPieChart>;

export default meta;
type Story = StoryObj<typeof RdsCompPieChart>;

export const Default: Story = {
    args: {
        id: "chart pie",
        data: {
            labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
            datasets: [
                {
                    label: "Dataset1",
                    data: [20, 10, 20, 40, 10],
                    backgroundColor: [
                        "#ff6384",
                        "#ff9f40",
                        "#ffcd56",
                        "#4bc0c0",
                        "#059bff",
                    ],
                    borderColor: ["#fff"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            circumference: 360,
            radius: 100,
            maintainAspectRatio: false,
            animation: {
                animateRotate: false,
                animateScale: true,
            },
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        pointStyleWidth: 13,
                        usePointStyle: true,
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 30,
                    },
                },
                title: {
                    display: true,
                    text: "Pie Chart",
                },
            },
        },
    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole('img');
        await expect(chart).toBeInTheDocument();
    },
};
