import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSummaryDetails from "./rds-comp-summary-details";


const meta: Meta = {
  title: "Components/Summary Details",
  component: RdsCompSummaryDetails,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompSummaryDetails>;

export default meta;
type Story = StoryObj<typeof RdsCompSummaryDetails>;

export const Default: Story = {
  args: {
    summaryDetailsList:
    {
      planName: "Teams",
      licenseTenureName: "1 Year",
      licensePrice: "799.00",
      additionalDevelopersCount: "15",
      additionalDevelopersPrice: "149",
      additionalDevelopersTotalPrice: "2235.00",
      totalPrice: "3034.00",
      taxPercentage: "18",
      taxPrice: "546.12",
      discountPercentage: "0",
      discountPrice: "$00.00",
      totalNetPrice: "$3580.12"
    }
  }
} satisfies Story;




