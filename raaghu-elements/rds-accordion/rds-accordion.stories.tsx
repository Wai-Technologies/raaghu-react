import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAccordion, { type RdsAccordionProps } from './rds-accordion';
import RdsTypography from '../rds-typography/rds-typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

const meta: Meta<typeof RdsAccordion> = {
  title: 'Elements/Accordion',
  component: RdsAccordion,
  parameters: {
    status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: [
        'disableGutters', 'expanded', 'TransitionComponent', 'TransitionProps', 'slots', 'slotProps',
        'component', 'children', 'classes', 'onChange', 'sx', 'expandIcon',
        // Deprecated props that have a direct replacement control (variant, startIcon)
        'ShowLeftIcon', 'changeleftIcon', 'icon', 'accordionStyle',
      ],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the accordion header',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the accordion is expanded by default',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Accordion size',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'underline', 'plain'],
      description: 'outlined: full border, underline: bottom border only, plain: no borders',
    },
    selected: {
      control: 'boolean',
      description: 'Highlights the accordion as selected. Takes priority over `state`.',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'selected'],
      description: 'Visual state: default, hover (hover style while the pointer is over it) or selected.',
    },
    startIcon: {
      control: 'select',
      options: ['Default', 'Add', 'ExpandMore', 'ArrowDropDown', 'None'],
      mapping: {
        Default: undefined,
        Add: <AddIcon />,
        ExpandMore: <ExpandMoreIcon />,
        ArrowDropDown: <ArrowDropDownIcon />,
        None: null,
      },
      description: 'Icon before the title; `null` hides it',
    },
    children: {
      control: false,
      description: 'The content to display inside the accordion',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <RdsTypography color="text.secondary">
    Replace with your content component
  </RdsTypography>
);

// Keeps the story controlled so toggling `defaultExpanded` in the controls panel takes effect.
const ControlledAccordion = ({ defaultExpanded = false, ...args }: RdsAccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  useEffect(() => setExpanded(defaultExpanded), [defaultExpanded]);
  return (
    <RdsAccordion {...args} expanded={expanded} onChange={(_, isExpanded) => setExpanded(isExpanded)} />
  );
};

const baseArgs = {
  size: 'medium',
  variant: 'outlined',
  state: 'default',
  defaultExpanded: false,
  startIcon: null,
  children: content,
} satisfies Partial<RdsAccordionProps>;

export const Default: Story = {
  args: { ...baseArgs, title: 'Accordion Title', variant: 'underline' },
  render: (args) => (
    <>
      <ControlledAccordion {...args} />
      <ControlledAccordion {...args} />
      <ControlledAccordion {...args} />
    </>
  ),
};

export const CustomIcon: Story = {
  args: { ...baseArgs, title: 'Custom Icon Accordion', variant: 'underline', startIcon: <ArrowDropDownIcon /> },
  render: (args) => <ControlledAccordion {...args} />,
};

export const Disabled: Story = {
  args: { ...baseArgs, title: 'Disabled Accordion', disabled: true },
  render: (args) => <ControlledAccordion {...args} />,
};

export const Expanded: Story = {
  args: { ...baseArgs, title: 'Expanded Accordion', defaultExpanded: true },
  render: (args) => <ControlledAccordion {...args} />,
};

export const LongContent: Story = {
  args: { ...baseArgs, title: 'Accordion with Long Content' },
  render: (args) => <ControlledAccordion {...args} />,
};
