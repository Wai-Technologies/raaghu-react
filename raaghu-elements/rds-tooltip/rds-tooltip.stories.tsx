import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import RdsTooltip from './rds-tooltip';
import { Delete } from '@mui/icons-material';
import RdsButton from '../rds-button/rds-button';
import HelpIcon from '@mui/icons-material/Help';

const meta: Meta<typeof RdsTooltip> = {
  title: 'Elements/Tooltip',
  component: RdsTooltip,
  parameters: {
    layout: 'centered',
    controls: {
    exclude: ['ref', 'slots', 'slotProps'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Tooltip text content',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show arrow',
    },
    style: {
      control: 'select',
      options: [
        'top', 'bottom', 'left', 'right',
        'top-start', 'top-end',
        'bottom-start', 'bottom-end',
        'left-start', 'left-end',
        'right-start', 'right-end',
      ],
      description: 'Placement of the tooltip',
    },

  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'This is a tooltip',
    children:<RdsButton
    color="primary"
    layout="text-only"
    shape="rectangle"
    showLeftIcon
    size="medium"
    state="default"
    style="filled"
    text="Hover me"
    textCase="unset"
    />,
    style: 'top',
    arrow : false,
    wrapper: true,
  },
};
Default.parameters = { 
  controls: { 
    include: ['label', 'style', 'arrow', 'wrapper'] 
  } 
};

export const OnIconButton: Story = {
  args: {
    label: 'Delete item',
    children:<RdsButton
      changeLeftIcon={<Delete />}
      changeRightIcon="save"
      color="primary"
      layout="icon-only"
      shape="rectangle"
      showLeftIcon
      size="medium"
      state="default"
      style="transparent"
      text="Top"
      textCase="uppercase"
    />,
    style: 'top',
    wrapper: true,
  },
};
OnIconButton.parameters = { 
  controls: { 
    include: ['label', 'style', 'arrow', 'wrapper'] 
  } 
};

export const WithArrow: Story = {
  args: {
    label: 'Tooltip with arrow',
    arrow: true,
    children:<RdsButton
      color="primary"
      layout="text-only"
      shape="rectangle"
      showLeftIcon
      size="medium"
      state="default"
      style="outlined"
      text="Arrow tooltip"
      textCase="unset"
    />,
    style: 'top',
    wrapper: true,
  },
};
WithArrow.parameters = { 
  controls: { 
    include: ['label', 'style', 'arrow', 'wrapper'] 
  } 
};

export const Different_Placements: Story = {
  args: {
    label: 'Top placement',
    style: 'top',
    children:<RdsButton
      color="primary"
      layout="text-only"
      shape="rectangle"
      showLeftIcon
      size="medium"
      state="default"
      style="transparent"
      text="Top"
      textCase="unset"
    />,
    wrapper: true
  },
};
Different_Placements.parameters = { 
  controls: { 
    include: ['label', 'style', 'arrow', 'wrapper'] 
  } 
};

export const LongText: Story = {
  args: {
    label: 'This is a very long tooltip text that might wrap to multiple lines depending on the screen size',
    children:<RdsButton
      changeLeftIcon={<HelpIcon />}
      changeRightIcon="save"
      color="primary"
      layout="icon-only"
      shape="rectangle"
      showLeftIcon
      size="medium"
      state="default"
      style="transparent"
      text="Top"
      textCase="uppercase"
    />,
    style: 'top',
    wrapper: true
  },
};
LongText.parameters = { 
  controls: { 
    include: ['label', 'style', 'arrow', 'wrapper'] 
  } 
};

export const HoverTooltip: Story = {
  name: 'Interaction: Hover shows tooltip',
  args: {
    label: 'Tooltip text',
    children: <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" text="Hover me" textCase="unset" />,
    style: 'top',
    arrow: false,
    wrapper: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /hover me/i })
    await expect(trigger).toBeVisible()
    await userEvent.hover(trigger)
    // MUI Tooltip renders content in a portal with role="tooltip"
    await waitFor(
      () => expect(document.querySelector('[role="tooltip"]')).not.toBeNull(),
      { timeout: 2000 }
    )
  }
};
