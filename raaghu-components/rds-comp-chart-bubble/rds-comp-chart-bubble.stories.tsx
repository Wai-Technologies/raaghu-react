import RdsCompBubbleChart from "./rds-comp-chart-bubble";
import "./rds-comp-chart-bubble.scss";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Bubble Chart',
    component: RdsCompBubbleChart,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
      component: 'The **Bubble Chart** element is a visual component in the design system used to display multi-dimensional data where each point represents three values: `x`, `y`, and `radius`. It is ideal for illustrating relationships, patterns, and outliers within complex datasets. This chart supports multiple datasets with customizable styling options including colors, border width, and point shapes. Features include tooltip interaction, dynamic legends, and optional titles for better data interpretation. The component is fully responsive and can be integrated into dashboards, analytics tools, or reporting views to enhance visual storytelling and decision-making based on data clusters or distributions.'
      }
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompBubbleChart>;

export default meta;
type Story = StoryObj<typeof RdsCompBubbleChart>;

export const Default: Story = {
    args: {
        id: "bubblecha",
        labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        dataSets: [
            {
                label: "Dataset 1",
                data: [90, 97, 20, 30, 40, 50, 60, 70],
                borderColor: ["red"],
                backgroundColor: ["rgba(255, 99, 132)"],
            },
            {
                label: "Dataset 2",
                data: [90, 80, 70, 60, 50, 40, 30, 90, 98],
                borderColor: ["orange"],
                backgroundColor: ["rgba(255, 206, 86)"],
            }
        ],


        options: {
            responsive: true,
            radius: 10,
            maintainAspectRatio: false,
            pointStyle: "triangle",
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
                    text: "Bubble Chart"
                }
            },

        },
    },
    parameters: {
        controls: {
            exclude: ['chartWidth', 'chartStyle',],
        },
    },
};
export const ChartRenders: Story = {
  name: 'Interaction: Bubble chart renders canvas',
  args: {
    id: 'test-bubble',
    labels: [10, 20, 30],
    dataSets: [{ label: 'D', data: [10, 20, 15], backgroundColor: 'rgba(75,192,192,0.6)' }],
    options: { responsive: true, maintainAspectRatio: false },
  },
  play: async ({ canvasElement }) => {
    const chart = canvasElement.querySelector('canvas')
    await expect(chart).not.toBeNull()
    await expect(chart).toBeVisible()
  }
};
