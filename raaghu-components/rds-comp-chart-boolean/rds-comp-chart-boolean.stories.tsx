
import RdsCompBooleanChart from "./rds-comp-chart-boolean";
import "./rds-comp-chart-boolean.scss";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Charts/Boolean Chart",
  component: RdsCompBooleanChart,
  parameters: {
    status: { type: "stable" },
    layout: "padded",
    docs: {
      description: {
        component:
          "The Boolean Chart displays binary or proportional data in a doughnut chart. It supports a customizable center icon, labels, and color schemes for representing completion rates and binary comparisons.",
      },
    },
  },
  tags: ["autodocs", "stable"],
  argTypes: {
    data: {
        control: "object",
        description: "Chart.js data containing labels and datasets.",
    },
    options: {
        control: "object",
        description: "Chart.js configuration options.",
    },
    centerIcon: {
        control: false,
        description: "React node displayed in the center of the chart.",
    },
    height: {
        control: "text",
        description: "Height of the chart.",
    },
    width: {
        control: "text",
        description: "Width of the chart.",
    },

    // Hide deprecated aliases from Storybook documentation.
    labels: {
        control: false,
        table: { disable: true },
    },
    dataSets: {
        control: false,
        table: { disable: true },
    },
    centerIconName: {
        control: false,
        table: { disable: true },
    },
    chartLabel: {
        control: false,
        table: { disable: true },
    },
    chartStyle: {
        control: false,
        table: { disable: true },
    },
},
} satisfies Meta<typeof RdsCompBooleanChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "BooleanId",
    centerIcon: <PeopleOutline fontSize="small" />,
    data: {
      labels: ["green", "grey"],
      datasets: [
        {
          label: "Dataset 1",
          data: [20, 10],
          backgroundColor: ["#01AE9D", "#E1E1E1"],
          borderColor: ["#fff"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutout: "90%",
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Boolean Chart",
        },
        legend: {
          display: false,
          position: "top",
        },
      },
    },
  },
  play: async ({ canvas }) => {
    const chart = await canvas.findByRole("img");
    await expect(chart).toBeInTheDocument();
  },
};
