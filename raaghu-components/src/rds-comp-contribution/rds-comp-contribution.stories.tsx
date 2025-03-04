import type { Meta, StoryObj } from "@storybook/react";
import RdsCompContribution from "./rds-comp-contribution";
import dayjs from 'dayjs';
const meta: Meta = {
  title: "Elements/Contribution",
  component: RdsCompContribution,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    showMonthLabels: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof RdsCompContribution>;

export default meta;
type Story = StoryObj<typeof RdsCompContribution>;

const generateValues = () => {
  const values: { [date: string]: number } = {};
  const startDate = dayjs('2016-01-01');
  const endDate = dayjs('2016-12-31');
  const panelColors = ["#FEF7FF", "#EBDCFF", "#D4BBFF", "#7825E9", "#19003E"];

  let currentDate = startDate;
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    const randomValue = Math.floor(Math.random() * panelColors.length);
    values[currentDate.format('YYYY-MM-DD')] = randomValue;
    currentDate = currentDate.add(1, 'day');
  }

  return values;
};

export const Default: Story = {
  args: {
    weekNames: ['', 'M', '', 'W', '', 'F', ''],
    monthNames: [
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
      "Dec",
    ],
    panelColors: ["#FEF7FF", "#EBDCFF", "#D4BBFF", "#7825E9", "#19003E"],
    dateFormat: "YYYY-MM-DD",
    values: generateValues(),
    until:"2016-12-31",
    monthLabelHeight: 15,
    weekLabelWidth: 15,
    panelSize: 12,
    panelMargin: 2,
    showMonthLabels: true, 
  },
} satisfies Story;
Default.parameters = {
  controls: {
    include: [
      // "weekNames",
      // "MonthNames",
      // "panelColors",
      // "dateFormat",
      // "values",
      // "until",
      // "monthLabelHeight",
      // "weekLabelWidth",
      // "panelSize",
      // "panelMargin",
      "showMonthLabels",
    ],
  },
};


// export const WithAttribute: Story = {
//   args: {
//     weekNames: ['', 'M', '', 'W', '', 'F', ''],
//     monthNames: [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ],
//     panelColors: ['#E7E1F0', '#CBB1F0', '#9E65F0', '#7E2EEF'],
//     dateFormat: 'YYYY-MM-DD',
//     values :{
//       '2016-06-23': 1,
//       '2016-06-26': 2,
//       '2016-06-27': 3,
//       '2016-06-28': 4,
//       '2016-06-29': 4
//     },
//     until : '2016-06-30',
//     monthLabelAttributes : {
//       'style': {
//         'text-decoration': 'underline',
//         'font-size': 10,
//         'alignment-baseline': 'central',
//         'fill': '#AAA'
//       }
//     },
//     weekLabelAttributes : {'rotate': 20},
//     panelAttributes :  { 'rx': 6, 'ry': 6 } ,
//     monthLabelHeight: 15,
//     weekLabelWidth: 15,
//     panelSize: 12,
//     panelMargin: 2,
//     showMonthLabels: true, 
//   }
// } satisfies Story;
// WithAttribute.parameters = { controls: { include: ['weekNames','MonthNames', 'panelColors','dateFormat','values', 'until','monthLabelAttributes','weekLabelAttributes','panelAttributes', 'monthLabelHeight', 'weekLabelWidth', 'panelSize', 'panelMargin' , 'showMonthLabels'] } }
