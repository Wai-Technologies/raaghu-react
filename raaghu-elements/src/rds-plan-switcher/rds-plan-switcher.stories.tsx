  import type { Meta, StoryObj } from '@storybook/react';
  import RdsPlanSwitcher from "./rds-plan-switcher";

  const meta: Meta = {
    title: "Components/AI ChatBox/Plan Switcher",
    component: RdsPlanSwitcher,
    parameters: {
      layout: 'padded',
      docs:{
        description: {
  component: `The **Plan Switcher** component is a toggle button that allows users to switch between two subscription plans or modes, commonly labeled as \`Free\` and \`Premium\`. It requires two text props, \`button1Text\` and \`button2Text\`, to define the labels for each option. The component also accepts a callback function, \`setIsPlanFree\`, which is called with a boolean value indicating the current selected plan (\`true\` for Free, \`false\` for Premium). This component is ideal for UI designs where users need an intuitive way to select between different subscription levels or feature tiers.`
}

      }
    },
    tags: ['autodocs'],
    argTypes: {
    },
  } satisfies Meta<typeof RdsPlanSwitcher>;

  export default meta;
  type Story = StoryObj<typeof RdsPlanSwitcher>;

  export const Default: Story = {
    args: {
      button1Text: "Free",
      button2Text: "Premium",
    }
  } satisfies Story;