import RdsCompGaugeChart from "./rds-comp-chart-gauge";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Charts/Gauge Chart',
    component: RdsCompGaugeChart,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'The **Gauge Chart** component displays data as a semicircular meter, ideal for showing progress, performance metrics, or KPIs. It supports customizable **labels**, **datasets**, titles, and subtitles with responsive design. The gauge provides clear visual feedback with configurable colors, legends, and center text for enhanced data presentation.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompGaugeChart>;

export default meta;
type Story = StoryObj<typeof RdsCompGaugeChart>;

export const Default: Story = {
    args: {
        id: "gaugeChart",
        titleText: "Title",
        subTitleText: "Subtitle",
        labels: ["Green", "Blue", "Yellow", "Orange", "Purple", "Red"],
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        dataSets: [
            {
                label: "Gauge Data",
                data: [15, 10, 25, 5, 15, 30],
                backgroundColor: [
                    "#28a745",
                    "#17a2b8", 
                    "#ffc107",
                    "#fd7e14",
                    "#6f42c1",
                    "#dc3545"
                ],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    }
} satisfies Story;

export const BlueYellowOrangePurpleRed: Story = {
    args: {
        id: "gaugeChart2",
        titleText: "Title",
        subTitleText: "Subtitle", 
        labels: ["Blue", "Yellow", "Orange", "Purple", "Red"],
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        dataSets: [
            {
                label: "Gauge Data",
                data: [20, 20, 20, 20, 20],
                backgroundColor: [
                    "#17a2b8",
                    "#ffc107", 
                    "#fd7e14",
                    "#6f42c1",
                    "#dc3545"
                ],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    }
} satisfies Story;

export const YellowOrangePurpleRed: Story = {
    args: {
        id: "gaugeChart3",
        titleText: "Title",
        subTitleText: "Subtitle",
        labels: ["Yellow", "Orange", "Purple", "Red"], 
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        dataSets: [
            {
                label: "Gauge Data",
                data: [25, 25, 25, 25],
                backgroundColor: [
                    "#ffc107",
                    "#fd7e14",
                    "#6f42c1", 
                    "#dc3545"
                ],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    }
} satisfies Story;

export const OrangePurpleRed: Story = {
    args: {
        id: "gaugeChart4",
        titleText: "Title",
        subTitleText: "Subtitle",
        labels: ["Orange", "Purple", "Red"],
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        dataSets: [
            {
                label: "Gauge Data", 
                data: [33.3, 33.3, 33.4],
                backgroundColor: [
                    "#fd7e14",
                    "#6f42c1",
                    "#dc3545"
                ],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    }
} satisfies Story;

export const PurpleRed: Story = {
    args: {
        id: "gaugeChart5",
        titleText: "Title", 
        subTitleText: "Subtitle",
        labels: ["Purple", "Red"],
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        dataSets: [
            {
                label: "Gauge Data",
                data: [50, 50],
                backgroundColor: [
                    "#6f42c1",
                    "#dc3545"
                ],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    }
} satisfies Story;

export const RedOnly: Story = {
    args: {
        id: "gaugeChart6",
        titleText: "Title",
        subTitleText: "Subtitle",
        labels: ["Red"],
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        dataSets: [
            {
                label: "Gauge Data",
                data: [100],
                backgroundColor: [
                    "#dc3545"
                ],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    }
} satisfies Story;