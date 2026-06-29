import RdsCompLineChart from "./rds-comp-chart-line";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Chart } from 'chart.js';

const meta: Meta = {
    title: 'Components/Charts/Line Chart',
    component: RdsCompLineChart,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs:{
            description: {
  component: 'The **Line Chart** element is designed to display continuous data trends over time or categories using connected points along a line. It supports customizable **labels** to define the x-axis, and multiple **datasets** for plotting different series of data. The chart offers extensive styling options such as point shapes (e.g., stars), radius size, line tension (curvature), colors, and fill behavior. It is fully **responsive** and allows configuration of legends, tooltips, titles, and interaction modes for precise user experience. This flexibility lets you tailor the chart’s appearance and behavior to fit various data visualization needs within dashboards, reports, or analytics tools.'
}

        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompLineChart>;

export default meta;
type Story = StoryObj<typeof RdsCompLineChart>;


export const Default: Story = {
    args: {        
        labels: ["January", "February", "March", "April", "May", "Jun", "July"],
        options: {
            pointStyle: "star",
            radius: 7,
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: "top",
                    align: "center",
                    pointStyle: "bottom",
                    labels: {
                        usePointStyle: true,
                        generateLabels: function (chart : any) {

                            const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            return original;
                        },
                    },

                },
                tooltip: {
                    usePointStyle: true,
                },
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: "Line Chart with boundries"
                }
            },
            interaction: {
                intersect: false,
            }
        },
        dataSets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 78, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                backgroundColor: "red"
            },
        ],
        id: "linechart",
    },
} satisfies Story;