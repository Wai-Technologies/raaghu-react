import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAccordion from './rds-accordion';
import RdsTypography from '../rds-typography/rds-typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

const meta: Meta<typeof RdsAccordion> = {
  title: 'Elements/Accordion',
  component: RdsAccordion,
  parameters: {
    layout: 'padded',
     controls: {
      exclude: ['disableGutters','expanded','TransitionComponent','TransitionProps','slots','slotProps','component','children','icon','classes','onChange','sx'],
    },
  },
  tags: ['autodocs'],
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
      description: 'Accordion size variant',
      defaultValue: 'medium',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'selected'],
      description: 'Accordion state variant',
      defaultValue: 'default',
    },
    accordionStyle: {
      name: 'style',
      control: { type: 'select' },
      options: ['border', 'bottomline', 'borderhide'],
      description: 'Accordion style variant - border: full border, bottomline: only bottom border, borderhide: no borders',
      defaultValue: 'border',
    },
  ShowLeftIcon: {
      control: { type: 'boolean' },
      description: 'Show expand/collapse icon in accordion header',
      defaultValue: true,
    },
    changeleftIcon: {
      control: 'select',
      options: ['Add', 'ExpandMore', 'ArrowDropDown', 'None'],
      mapping: {
        Add: <AddIcon />,
        ExpandMore: <ExpandMoreIcon />,
        ArrowDropDown: <ArrowDropDownIcon />,
        None: null,
      },
      description: 'Custom left icon for the accordion header',
      defaultValue: null,
    },
    children: {
      control: false,
      description: 'The content to display inside the accordion',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    size: 'medium',
    state: 'default',
    accordionStyle: 'bottomline',
    ShowLeftIcon: true,
    defaultExpanded: false,
    changeleftIcon: null,
  },
  render: ({ size, state, accordionStyle, ShowLeftIcon, defaultExpanded, changeleftIcon, title, disabled }) => {
    const [expanded1, setExpanded1] = useState(defaultExpanded);
    const [expanded2, setExpanded2] = useState(defaultExpanded);
    const [expanded3, setExpanded3] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded1(defaultExpanded);
      setExpanded2(defaultExpanded);
      setExpanded3(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <>
        <RdsAccordion 
          title={title} 
          size={size} 
          state={state} 
          accordionStyle={accordionStyle} 
          ShowLeftIcon={ShowLeftIcon} 
          disabled={disabled}
          expanded={expanded1}
          onChange={(_, isExpanded) => setExpanded1(isExpanded)}
          changeleftIcon={changeleftIcon}
        >
          <RdsTypography color="text.secondary">
            Replace with your content component
          </RdsTypography>
        </RdsAccordion>
        <RdsAccordion 
          title={title} 
          size={size} 
          state={state} 
          accordionStyle={accordionStyle} 
          ShowLeftIcon={ShowLeftIcon} 
          disabled={disabled}
          expanded={expanded2}
          onChange={(_, isExpanded) => setExpanded2(isExpanded)}
          changeleftIcon={changeleftIcon}
        >
          <RdsTypography color="text.secondary">
            Replace with your content component
          </RdsTypography>
        </RdsAccordion>
        <RdsAccordion 
          title={title} 
          size={size} 
          state={state} 
          accordionStyle={accordionStyle} 
          ShowLeftIcon={ShowLeftIcon} 
          disabled={disabled}
          expanded={expanded3}
          onChange={(_, isExpanded) => setExpanded3(isExpanded)}
          changeleftIcon={changeleftIcon}
        >
          <RdsTypography color="text.secondary">
            Replace with your content component
          </RdsTypography>
        </RdsAccordion>
      </>
    );
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Custom Icon Accordion',
    icon: <ArrowDropDownIcon />,
    defaultExpanded: false,
    accordionStyle: 'bottomline',
    ShowLeftIcon: true,
    state: 'default',
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, icon, size, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children, disabled, state }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion
        title={title}
        icon={icon}
        size={size}
        disabled={disabled}
        accordionStyle={accordionStyle}
        ShowLeftIcon={ShowLeftIcon}
        state={state}
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        changeleftIcon={changeleftIcon}
      >
        {children}
      </RdsAccordion>
    );
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    disabled: true,
    defaultExpanded: false,
    accordionStyle: 'border',
    ShowLeftIcon: true,
    state: 'default',
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, disabled, size, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children, state }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion
        title={title}
        size={size}
        accordionStyle={accordionStyle}
        ShowLeftIcon={ShowLeftIcon}
        disabled={disabled}
        state={state}
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        changeleftIcon={changeleftIcon}
      >
        {children}
      </RdsAccordion>
    );
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Accordion',
    defaultExpanded: true,
    accordionStyle: 'border',
    ShowLeftIcon: true,
    state: 'default',
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, size, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children, disabled, state }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion
        title={title}
        size={size}
        accordionStyle={accordionStyle}
        ShowLeftIcon={ShowLeftIcon}
        disabled={disabled}
        state={state}
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        changeleftIcon={changeleftIcon}
      >
        {children}
      </RdsAccordion>
    );
  },
};

export const LongContent: Story = {
  args: {
    title: 'Accordion with Long Content',
    defaultExpanded: false,
    accordionStyle: 'border',
    ShowLeftIcon: true,
    state: 'default',
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, size, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children, disabled, state }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion
        title={title}
        size={size}
        accordionStyle={accordionStyle}
        ShowLeftIcon={ShowLeftIcon}
        disabled={disabled}
        state={state}
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        changeleftIcon={changeleftIcon}
      >
        {children}
      </RdsAccordion>
    );
  },
};
