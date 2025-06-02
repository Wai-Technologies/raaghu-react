import { Meta, StoryObj } from "@storybook/react";
import RdsPaymentSummary from "./rds-payment-summary";


const meta: Meta = {
    title: "Components/Payment Summary",
    component: RdsPaymentSummary,
    parameters:{
        docs:{
            description: {
  component: `The **Payment Summary** component presents a detailed breakdown of pricing information for a selected plan or purchase. The \`summaryDetailsList\` prop is an object that holds key financial details, including \`planName\` (the selected subscription or product plan), \`licenseTenureName\` (duration of the license), and \`licensePrice\` (base cost of the license). It also includes fields like \`additionalDevelopersCount\`, \`additionalDevelopersPrice\`, and \`additionalDevelopersTotalPrice\` to account for added user licenses. Tax and discount fields—\`taxPercentage\`, \`taxPrice\`, \`discountPercentage\`, and \`discountPrice\`—are used to calculate the final payable amount, which is represented by \`totalNetPrice\`. This component is ideal for checkout pages, invoices, or any place where transparent pricing details need to be shown to users.`
}

        }
    },
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
