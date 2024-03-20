import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFeatureManagement from "./rds-comp-feature-management";


const meta: Meta = {
  title: "Components/Feature Management",
  component: RdsCompFeatureManagement,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompFeatureManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompFeatureManagement>;

export const Default: Story = {
  args: {
    featureManagementData: {
      id: 1,
      name: "AnotherIdentity",
      displayName: "Another Identity",
      features: [
        { id: 0, name: "AnotherFeature", displayName: "Another feature", value: "Mandatory" },
        { id: 1, name: "AnotherFeature2", displayName: "Another feature 2", value: "Optional"},
        { id: 2, name: "AnotherFeature3", displayName: "Another feature 3", value: "Mandatory"},
        { id: 3, name: "AnotherFeature4", displayName: "Another feature 4", value: "Optional"},
        { id: 4, name: "AnotherFeature5", displayName: "Another feature 5", value: "Mandatory"}
      ]
    }
  }
} satisfies Story;




