import RdsCompRadarChart from "./rds-comp-chart-radar";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Charts/Radar Chart',
    component: RdsCompRadarChart,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs: {
    description: {
        component: 'The **Radar Chart** element is a versatile data visualization component that displays multivariate data across multiple axes arranged radially around a central point. Each axis represents a distinct category or dimension, and the data values are plotted as points connected by lines, forming a web-like or spider mesh pattern. This makes it ideal for comparing multiple datasets on the same scale, highlighting strengths and weaknesses across different variables in a compact and intuitive radial layout. The chart supports multiple customizable **datasets**, allowing control over colors, fills, point styles, and labels. Extensive configuration options are available through the **options** property, including axis scaling, grid line styles, tooltips, legends, animations, and responsiveness. The Radar Chart is a powerful and visually appealing tool suited for dashboards, performance metrics, skill analysis, and any context where multidimensional data comparison is needed.'
    }
}

    },
    tags: ['autodocs', 'stable'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompRadarChart>;

export default meta;
type Story = StoryObj<typeof RdsCompRadarChart>;


export const Default: Story = {
    args: {
        id: "Radar_Chart",
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July"
        ],
        options: {
            "responsive": false,
            "chartArea": {
                "backgroundColor": "rgba(251, 85, 85, 0.4)"
            },
            "plugins": {
                "title": {
                    "display": true,
                    "text": "Radar Chart"
                },
                "legend": {
                    "position": "left",
                    "align": "start",
                    "pointStyle": "rectRot",
                    "pointRadius": 5,
                    "labels": {
                        "usePointStyle": true,
                        "pointStyle": "circle",
                        "pointStyleWidth": 8,
                        "boxWidth": 8,
                        "boxHeight": 8,
                        "padding": 20,
                        "height": 5,
                        "font": {
                            "size": 12,
                            "weight": "500"
                        },
                        "color": "#333333"
                    }
                },
                "tooltip": {
                    "usePointStyle": true
                },
                "scale": {
                    "type": "line",
                    "angleLines": {
                        "display": true
                    }
                }
            },
            "scales": {
                "r": {
                    "axis": "r",
                    "type": "radialLinear",
                    "display": true,
                    "animate": true,
                    "position": "chartArea",
                    "angleLines": {
                        "display": true,
                        "lineWidth": 1,
                        "borderDash": [],
                        "borderDashOffset": 0,
                        "color": "rgba(0,0,0,0.1)"
                    },
                    "grid": {
                        "circular": false,
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
                    "startAngle": 0,
                    "ticks": {
                        "showLabelBackdrop": true,
                        "color": "#666",
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
                        "backdropColor": "rgba(255, 255, 255, 0.75)",
                        "backdropPadding": 2
                    },
                    "pointLabels": {
                        "backdropPadding": 2,
                        "display": true,
                        "font": {
                            "size": 10
                        },
                        "padding": 5,
                        "centerPointLabels": false,
                        "color": "#666"
                    },
                    "offset": false,
                    "reverse": false,
                    "beginAtZero": false,
                    "bounds": "ticks",
                    "grace": 0,
                    "title": {
                        "display": false,
                        "text": "",
                        "padding": {
                            "top": 4,
                            "bottom": 4
                        },
                        "color": "#666"
                    },
                    "id": "r"
                }
            }
        },
        dataSets: [
            {
                "label": "Dataset 1",
                "data": [
                    0.5,
                    0.8,
                    0.4,
                    0.6,
                    0.7,
                    0.2,
                    0.9
                ],
                "borderColor": [
                    "#ff9f40"
                ],
                "backgroundColor": [
                    "rgba(255, 99, 132, 0.2)"
                ],
                "fill": false,
                "pointStyle": "circle",
                "pointRadius": 2
            },
            {
                "label": "Dataset 2",
                "data": [
                    0.9,
                    0.3,
                    0.8,
                    0.9,
                    0.1,
                    0.7,
                    0.2
                ],
                "borderColor": [
                    "#ff6384"
                ],
                "backgroundColor": [
                    "rgba(255, 206, 86, 0.2)"
                ],
                "fill": true,
                "pointStyle": "circle",
                "pointRadius": 2
            },
            {
                "label": "Dataset 3",
                "data": [
                    0.7,
                    0.2,
                    0.1,
                    0.9,
                    0.8,
                    0.4,
                    0.7
                ],
                "borderColor": [
                    "#83BE5A"
                ],
                "backgroundColor": [
                    "rgba(255, 240, 204, 0.2)"
                ],
                "fill": false,
                "pointStyle": "circle",
                "pointRadius": 2
            }
        ],


    },
    play: async ({ canvas }) => {
        const chart = await canvas.findByRole('img');
        await expect(chart).toBeInTheDocument();
    },
};

