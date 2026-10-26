
import RdsCompAreaChart from "./rds-comp-chart-area";
import { ScriptableContext } from "chart.js";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Charts/Area Chart",
  component: RdsCompAreaChart,
  parameters: {
    status: { type: "stable" },
    layout: "padded",
    docs: {
      description: {
        component:
          "The Area Chart displays quantitative data over time or categories. It supports multiple datasets, gradient fills, tooltips, point styles, axis grid configuration, and legend positioning.",
      },
    },
  },
  tags: ["autodocs", "stable"],
   argTypes: {
    data: {
      description:
        "Chart data containing labels and datasets. Edit labels and dataset values inside this object.",
      control: "object",
    },
    options: {
      description: "Chart.js configuration options.",
      control: "object",
    },

    // Hide deprecated props from Storybook documentation.
    labels: { control: false, table: { disable: true } },
    dataSets: { control: false, table: { disable: true } },
    isGradient: { control: false, table: { disable: true } },
    chartLabel: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof RdsCompAreaChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "area-chart",
    ariaLabel: "Monthly sales and revenue area chart",
    data: {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      datasets: [
        {
          label: "Sales",
          data: [450, 350, 750, 590, 280, 620, 100, 750, 250, 650, 380, 330],
          borderColor: "#4DCFFF",
           borderWidth: 2,
          pointStyle: "circle",
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
           borderWidth: 2,
          pointStyle: "circle",
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
        },
      ],
    },
    options: {
      responsive: true,
    
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
        },
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyleWidth: 13,
            boxWidth: 10,
            boxHeight: 10,
            padding: 30,
          },
        },
        tooltip: {
          enabled: true,
          usePointStyle: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
            lineWidth: 1,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            offset: false,
            color: "rgba(0,0,0,0.1)",
          },
        },
        x: {
          grid: {
            display: false,
            lineWidth: 1,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            offset: false,
            color: "rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
  play: async ({ canvas }) => {
    const chart = await canvas.findByRole("img");
    await expect(chart).toBeInTheDocument();
  },
};
