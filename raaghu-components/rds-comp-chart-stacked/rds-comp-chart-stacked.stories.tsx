import React from "react";
import RdsCompStackedChart from "./rds-comp-chart-stacked";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Stacked Chart',
    component: RdsCompStackedChart,
    parameters: {
        layout: 'padded',
        docs: {
  description: {
    component: 'The **Stacked Chart** element is a layered bar or line chart that visualizes multiple datasets stacked on top of each other, allowing users to easily compare parts of a whole across categories such as time, geography, or other dimensions. It is particularly useful for showing cumulative data trends while still preserving the visibility of individual dataset contributions. This chart accepts multiple **datasets**, each customizable with unique labels, colors, and fill options. The **labels** property defines category markers (e.g., months), while the **options** property enables extensive configuration, including stacked axes, responsive behavior, interaction modes, titles, legends, tooltips, and grid styling. The chart is visually informative and highly customizable, making it ideal for dashboards, reports, and analytics tools that require comparative and aggregate data visualization.'
  }
}

    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompStackedChart>;

export default meta;
type Story = StoryObj<typeof RdsCompStackedChart>;


export const Default: Story = {
    args: {
        id: "Stacked_Chart",
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        options: {
            "radius": 3,
            "pointStyle": "triangle",
                        "stepSize": 50,
            "plugins": {
                "title": {
                    "display": true,
                    "text": "Chart.js Line Chart - stacked"
                },
                "tooltip": {
                    "mode": "index"
                },
                "legend": {
                    "pointStyle": "circle",
                    "labels": {
                        "usePointStyle": true
                    },
                    "tooltip": {
                        "usePointStyle": true
                    }
                }
            },
            "interaction": {
                "mode": "nearest",
                "axis": "x",
                "intersect": false
            },
            "scales": {
                "x": {
                    "axis": "x",
                    "title": {
                        "display": true,
                        "text": "Month",
                        "padding": {
                            "top": 4,
                            "bottom": 4
                        },
                        "color": "#666"
                    },
                    "type": "category",
                    "ticks": {
                        "minRotation": 0,
                        "maxRotation": 50,
                        "mirror": false,
                        "textStrokeWidth": 0,
                        "textStrokeColor": "",
                        "padding": 3,
                        "display": true,
                        "autoSkip": true,
                        "autoSkipPadding": 3,
                        "labelOffset": 0,
                        "minor": {},
                        "major": {},
                        "align": "center",
                        "crossAlign": "near",
                        "showLabelBackdrop": false,
                                "stepSize": 50,
                        "backdropColor": "rgba(255, 255, 255, 0.75)",
                        "backdropPadding": 2,
                        "color": "#666"
                    },
                    "display": true,
                    "offset": false,
                    "reverse": false,
                    "beginAtZero": false,
                    "bounds": "ticks",
                    "grace": 0,
                    "grid": {
                        "display": true,
                        "lineWidth": 1,
                        "drawBorder": true,
                        "drawOnChartArea": true,
                        "drawTicks": true,
                        "tickLength": 8,
                        "offset": false,
                        "borderDash": [],
                        "borderDashOffset": 0,
                        "borderWidth": 1,
                        "color": "rgba(0,0,0,0.1)",
                        "borderColor": "rgba(0,0,0,0.1)"
                    },
                    "id": "x",
                    "position": "bottom"
                },
                "y": {
                    "axis": "y",
                    "stacked": true,
                    "title": {
                        "display": true,
                        "text": "Value",
                        "padding": {
                            "top": 4,
                            "bottom": 4
                        },
                        "color": "#666"
                    },
                    "type": "linear",
                    "ticks": {
                        "minRotation": 0,
                        "maxRotation": 50,
                        "mirror": false,
                        "textStrokeWidth": 0,
                        "textStrokeColor": "",
                        "padding": 3,
                        "display": true,
                        "autoSkip": true,
                        "autoSkipPadding": 3,
                        "labelOffset": 0,
                        "minor": {},
                        "major": {},
                        "align": "center",
                        "crossAlign": "near",
                        "showLabelBackdrop": false,
                            "backdropColor": "rgba(255, 255, 255, 0.75)",
                            "backdropPadding": 2,
                            "color": "#666",
                            "stepSize": 50,
                    },
                    "display": true,
                    "offset": false,
                    "reverse": false,
                    "beginAtZero": false,
                    "bounds": "ticks",
                    "grace": 0,
                    "grid": {
                        "display": true,
                        "lineWidth": 1,
                        "drawBorder": true,
                        "drawOnChartArea": true,
                        "drawTicks": true,
                        "tickLength": 8,
                        "offset": false,
                        "borderDash": [],
                        "borderDashOffset": 0,
                        "borderWidth": 1,
                        "color": "rgba(0,0,0,0.1)",
                        "borderColor": "rgba(0,0,0,0.1)"
                    },
                    "id": "y",
                    "position": "left"
                }
            }
        },
        dataSets: [
            {
                "label": "My Second dataset",
                "data": [
                    140,
                    140,
                    170,
                    235,
                    125,
                    125,
                    110,
                    140,
                    140,
                    170,
                    230,
                    80
                ],
                "borderColor": "white",
                "backgroundColor": "#62D5D9",
                "fill": true
            },
            {
                "label": "My Third dataset",
                "data": [
                    90,
                    185,
                    110,
                    90,
                    230,
                    75,
                    230,
                    80,
                    180,
                    185,
                    185,
                    330
                ],
                "borderColor": "white",
                "backgroundColor": "#928AE0",
                "fill": true
            },
            {
                "label": "My Fourth dataset",
                "data": [
                    150,
                    201,
                    160,
                    203,
                    151,
                    205,
                    206,
                    207,
                    208,
                    209,
                    210,
                    211
                ],
                "borderColor": "white",
                "backgroundColor": "#EDB371",
                "fill": true
            }
        ],


    }
};
export const ChartRenders: Story = {
  name: 'Interaction: Stacked chart renders canvas',
  args: {
    id: 'test-stacked',
    labels: ['A', 'B', 'C'],
    dataSets: [
      { label: 'S1', data: [10, 20, 30], backgroundColor: 'rgba(75,192,192,0.6)' },
      { label: 'S2', data: [5, 15, 25], backgroundColor: 'rgba(255,99,132,0.6)' },
    ],
    options: { responsive: true, maintainAspectRatio: false },
  },
  play: async ({ canvasElement }) => {
    const chart = canvasElement.querySelector('canvas')
    await expect(chart).not.toBeNull()
    await expect(chart).toBeVisible()
  }
};
