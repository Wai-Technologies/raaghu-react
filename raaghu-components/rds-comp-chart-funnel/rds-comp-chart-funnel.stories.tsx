import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompFunnelChart from "./rds-comp-chart-funnel";

const meta: Meta = {
  title: "Components/Charts/Funnel Chart",
  component: RdsCompFunnelChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Funnel Chart component uses MUI X Pro FunnelChart to visualize stage-wise drop-off across conversion journeys. It supports direct MUI funnel series input with curve, variant, and gap controls.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: "number",
      description: "Pixel gap between funnel stages",
    },
  },
} satisfies Meta<typeof RdsCompFunnelChart>;

export default meta;
type Story = StoryObj<typeof RdsCompFunnelChart>;

const createSeries = (items: { label: string; value: number; color: string }[]) => [
  {
    curve: "bump",
    variant: "filled",
    data: items,
  },
];

export const Default: Story = {
  args: {
    id: "funnel-default",
    gap: 0,
    series: createSeries([
      { label: "Visitors", value: 1400, color: "#8ecae6" },
      { label: "Leads", value: 860, color: "#219ebc" },
      { label: "Qualified", value: 470, color: "#126782" },
      { label: "Proposal", value: 210, color: "#023047" },
      { label: "Won", value: 102, color: "#001219" },
    ]),
  },
};

export const WebsiteSignup: Story = {
  args: {
    ...Default.args,
    id: "funnel-website-signup",
    series: createSeries([
      { label: "Landing", value: 6000, color: "#c7f9cc" },
      { label: "Sign Up Click", value: 3200, color: "#80ed99" },
      { label: "Form Start", value: 2100, color: "#57cc99" },
      { label: "Form Submit", value: 1320, color: "#38a3a5" },
      { label: "Activated", value: 910, color: "#22577a" },
    ]),
  },
};

export const SalesPipeline: Story = {
  args: {
    ...Default.args,
    id: "funnel-sales-pipeline",
    series: createSeries([
      { label: "Prospects", value: 420, color: "#fde68a" },
      { label: "Discovery", value: 260, color: "#fbbf24" },
      { label: "Demo", value: 140, color: "#f59e0b" },
      { label: "Negotiation", value: 72, color: "#d97706" },
      { label: "Closed Won", value: 31, color: "#92400e" },
    ]),
  },
};

export const EcommerceCheckout: Story = {
  args: {
    ...Default.args,
    id: "funnel-ecommerce-checkout",
    series: createSeries([
      { label: "Product View", value: 5200, color: "#fbcfe8" },
      { label: "Add to Cart", value: 2900, color: "#f9a8d4" },
      { label: "Checkout", value: 1450, color: "#f472b6" },
      { label: "Payment", value: 980, color: "#db2777" },
      { label: "Order Complete", value: 870, color: "#9d174d" },
    ]),
  },
};

export const LeadQualification: Story = {
  args: {
    ...Default.args,
    id: "funnel-lead-qualification",
    series: createSeries([
      { label: "Raw Leads", value: 1800, color: "#ddd6fe" },
      { label: "MQL", value: 950, color: "#c4b5fd" },
      { label: "SQL", value: 530, color: "#a78bfa" },
      { label: "Opportunity", value: 210, color: "#8b5cf6" },
      { label: "Converted", value: 125, color: "#6d28d9" },
    ]),
  },
};

export const CompactWidget: Story = {
  args: {
    ...Default.args,
    id: "funnel-compact-widget",
    gap: 4,
    series: createSeries([
      { label: "Visit", value: 1000, color: "#bae6fd" },
      { label: "Lead", value: 510, color: "#7dd3fc" },
      { label: "Demo", value: 220, color: "#38bdf8" },
      { label: "Won", value: 88, color: "#0369a1" },
    ]),
  },
};
