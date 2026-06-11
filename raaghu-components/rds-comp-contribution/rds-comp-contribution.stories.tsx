import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from 'dayjs';
import RdsCompContribution from "./rds-comp-contribution";
import { expect } from 'storybook/test';
const meta: Meta<typeof RdsCompContribution> = {
  title: "Components/Contribution",
  component: RdsCompContribution,
  parameters: {
        status: { type: 'stable' },
    layout: "padded",
    docs: {
      description: {
        component: 'The Contribution component displays activity levels over time in a heatmap visualization similar to GitHub\'s contribution graph.'
      }
    }
  },
  tags: ["autodocs", 'stable'],
  argTypes: {
    showMonthLabels: {
      description: 'Whether to show month labels at the top of the contribution graph',
      control: { type: "boolean" },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  },
} satisfies Meta<typeof RdsCompContribution>;

export default meta;
type Story = StoryObj<typeof RdsCompContribution>;
const generateValues = () => {
  const values: { [date: string]: number } = {};
  const startDate = dayjs('2023-01-01');
  const endDate = dayjs('2023-12-31');

  let currentDate = startDate;
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    const dayOfWeek = currentDate.day();
    const weekOfMonth = Math.floor(currentDate.date() / 7);
    const month = currentDate.month();
    
    let randomValue;
    if (month % 3 === 0 && dayOfWeek === 3 && weekOfMonth === 2) {
      
      randomValue = Math.floor(Math.random() * 2) + 3;
    } else if ((dayOfWeek === 1 || dayOfWeek === 4) && Math.random() > 0.7) {
      
      randomValue = Math.floor(Math.random() * 2) + 2;
    } else if (Math.random() > 0.6) {
      
      randomValue = Math.floor(Math.random() * 2) + 1;
    } else {
      
      randomValue = Math.floor(Math.random() * 1.2);
    }
    
    values[currentDate.format('YYYY-MM-DD')] = randomValue;
    currentDate = currentDate.add(1, 'day');
  }

  return values;
};

export const Default: Story = {
  args: {
    weekNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    panelColors: ["#F0F6FF", "#D9E8FF", "#A3C8FF", "#6FA7FF", "#4589FF"],
    dateFormat: "YYYY-MM-DD",
    values: generateValues(),
    until: "2023-12-31",
    monthLabelHeight: 28,
    weekLabelWidth: 24,
    panelSize: 12,
    panelMargin: 2,
    showMonthLabels: true,
  },
  parameters: {
    controls: {
      include: ["showMonthLabels"]
    },
    docs: {
      description: {
        story: 'The default configuration for the contribution chart displays a full year of activity data with customizable colors.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
};


