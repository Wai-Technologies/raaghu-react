import RdsCompAreaChart from "./rds-comp-chart-area";
import { ScriptableContext } from "chart.js";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';


const meta: Meta = {
    title: 'Components/Charts/Area Chart',
    component: RdsCompAreaChart,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
     component: 'The **Area Chart** element is a versatile and visually appealing chart designed to display quantitative data over time or categories. It features smooth curves with customizable **gradient fills**, multiple datasets, and detailed **tooltip support** for enhanced interactivity. The chart supports various styling options such as radius, point styles, axis grid configuration, and legend positioning. This makes it ideal for showcasing trends like sales or revenue data with clear, color-coded areas that adapt responsively to different screen sizes.',
},
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAreaChart>;

export default meta;
type Story = StoryObj<typeof RdsCompAreaChart>;


export const Default: Story = {
    args: {
        id: "area chart",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        options: {
            radius: 0,
            pointStyle: "circle",
            responsive: true,
            borderWidth: 2,
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
                tooltip: { enabled: true },
            },
            scales:
            {
                y: {
                    beginAtZero: true,
                    legend: {
                        labels: {
                            maxheight: 10
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
                    }
                },
                x: {
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
                    }
                },
            },
            tooltip: {
                display: true,
                usePointStyle: true,
            },
        },
        dataSets: [
            {
                label: "Sales",
                data: [450, 350, 750, 590, 280, 620, 100, 750, 250, 650, 380, 330],
                borderColor: "#4DCFFF",
                backgroundColor: (context: ScriptableContext<"line">) => {

                    const ctx = context.chart.ctx;

                    const gradient = ctx.createLinearGradient(0, 25, 0, 210);

                    gradient.addColorStop(0.1, "rgba(25, 70, 186, 1)");

                    gradient.addColorStop(1, "rgba(25, 70, 186, 0.08)");

                    return gradient;

                },
                fill: true,
                pointRadius: 2,
                tension: 0.4,
            },
            {
                label: "Revenue",
                data: [350, 380, 650, 150, 280, 480, 490, 570, 320, 480, 380, 440],
                borderColor: "#863BFF",
                pointBackgroundColor: "#863BFF",
                backgroundColor: (context: ScriptableContext<"line">) => {

                    const ctx = context.chart.ctx;

                    const gradient = ctx.createLinearGradient(0, 25, 0, 210);

                    gradient.addColorStop(0.1, "rgba(48, 22, 194, 1)");

                    gradient.addColorStop(1, "rgba(48, 22, 194, 0.08)");

                    return gradient;

                },

                fill: true,
                pointRadius: 2,
                tension: 0.4,
            }
        ],
        isGradient: true,
    },
     parameters: {
        controls: {
            exclude: [
                    'isGradient', 
            ],
        },
     },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole('img');
        await expect(chart).toBeInTheDocument();
    },
};

