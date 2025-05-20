import { Meta, StoryObj } from "@storybook/react";
import RdsPaymentSummary from "./rds-payment-summary";


const meta: Meta = {
    title: "Components/Payment Summary",
    component: RdsPaymentSummary,
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof RdsPaymentSummary>;

export default meta;
type Story = StoryObj<typeof RdsPaymentSummary>;

export const Default: Story = {
    args: {
      summaryDetailsList : 
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
Default.parameters = { controls: { include: ['summaryDetailsList'] } };
