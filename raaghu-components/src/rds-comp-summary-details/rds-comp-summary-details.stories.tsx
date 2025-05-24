import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSummaryDetails from "./rds-comp-summary-details";


const meta: Meta = {
  title: "Components/Summary Details",
  component: RdsCompSummaryDetails,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Summary Details** component is a customizable UI element designed to display detailed summaries of pricing and plan information within your application. It provides a structured interface for showcasing details such as plan name, license tenure, license price, additional developer counts and pricing, tax percentage, discounts, and total net price. This component is ideal for subscription-based platforms, e-commerce applications, or any system requiring a clear and user-friendly summary of pricing and plan details. Fully customizable, the Summary Details component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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




