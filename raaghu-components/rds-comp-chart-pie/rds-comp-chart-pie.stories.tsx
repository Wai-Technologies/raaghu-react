
import RdsCompPieChart from "./rds-comp-chart-pie";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Pie Chart',
    component: RdsCompPieChart,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
    component: 'The **Pie Chart** element is a **customizable** and **interactive** component designed to display data as proportional slices of a circle. It supports configuration of key properties like **radius**, **labels**, **animation**, and **legend styling**, making it ideal for dashboards and analytics. The component visualizes datasets with distinct colors and smooth transitions, providing clear and engaging data presentations that adapt responsively to different screen sizes.',
},
        }
    },
    tags: ['autodocs'],
    argTypes: {
        radius: { control: 'number' }, 
    },
} satisfies Meta<typeof RdsCompPieChart>;

export default meta;
type Story = StoryObj<typeof RdsCompPieChart>;

export const Default: Story = {
    args: {
        id: "chart pie",
        radius: 100,
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
        options: {
            circumference: 360,
            maintainAspectRatio: false,
            animation: {
                animateRotate: false,
                animateScale: true,
            },
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    pointStyle: "line",
                    labels: {
                        pointStyleWidth: 13,
                        usePointStyle: true,
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 30,
                        height: 5,
                    },
                },
                title: {
                    display: true,
                    text: "Pie Chart",
                },
            },
        },
        dataSets: [
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
};

export const ChartRenders: Story = {
  name: 'Interaction: Pie chart renders canvas',
  args: {
    id: 'test-pie',
    labels: ['A', 'B', 'C'],
    options: { maintainAspectRatio: false },
    dataSets: [{ data: [33, 33, 34], backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'] }],
  },
  play: async ({ canvasElement }) => {
    const chart = canvasElement.querySelector('canvas')
    await expect(chart).not.toBeNull()
    await expect(chart).toBeVisible()
  }
};
