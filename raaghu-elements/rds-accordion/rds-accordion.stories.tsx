import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAccordion, { RdsAccordionGroup } from './rds-accordion';
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
    size: 'medium',
    state: 'default',
    accordionStyle: 'bottomline',
    ShowLeftIcon: true,
    defaultExpanded: false,
    changeleftIcon: null,
  },
  render: ({ size, state, accordionStyle, ShowLeftIcon, defaultExpanded, changeleftIcon }) => {
    const [expanded1, setExpanded1] = useState(defaultExpanded);
    const [expanded2, setExpanded2] = useState(defaultExpanded);
    const [expanded3, setExpanded3] = useState(defaultExpanded);

    // Update state when defaultExpanded control changes
    React.useEffect(() => {
      setExpanded1(defaultExpanded);
      setExpanded2(defaultExpanded);
      setExpanded3(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <>
        <RdsAccordion 
          title="Accordion Title " 
          size={size} 
          state={state} 
          accordionStyle={accordionStyle} 
          ShowLeftIcon={ShowLeftIcon} 
          expanded={expanded1}
          onChange={(_, isExpanded) => setExpanded1(isExpanded)}
          changeleftIcon={changeleftIcon}
        >
          <RdsTypography color="text.secondary">
            Replace with your content component
          </RdsTypography>
        </RdsAccordion>
        <RdsAccordion 
          title="Accordion Title " 
          size={size} 
          state={state} 
          accordionStyle={accordionStyle} 
          ShowLeftIcon={ShowLeftIcon} 
          expanded={expanded2}
          onChange={(_, isExpanded) => setExpanded2(isExpanded)}
          changeleftIcon={changeleftIcon}
        >
          <RdsTypography color="text.secondary">
            Replace with your content component
          </RdsTypography>
        </RdsAccordion>
        <RdsAccordion 
          title="Accordion Title " 
          size={size} 
          state={state} 
          accordionStyle={accordionStyle} 
          ShowLeftIcon={ShowLeftIcon} 
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
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, icon, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion
        title={title}
        icon={icon}
        accordionStyle={accordionStyle}
        ShowLeftIcon={ShowLeftIcon}
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
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, disabled, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion 
        title={title} 
        accordionStyle={accordionStyle} 
        ShowLeftIcon={ShowLeftIcon} 
        disabled={disabled} 
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
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion 
        title={title} 
        accordionStyle={accordionStyle} 
        ShowLeftIcon={ShowLeftIcon} 
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
    changeleftIcon: null,
    children: (
      <RdsTypography color="text.secondary">
        Replace with your content component
      </RdsTypography>
    ),
  },
  render: ({ title, defaultExpanded, accordionStyle, ShowLeftIcon, changeleftIcon, children }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    React.useEffect(() => {
      setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
      <RdsAccordion 
        title={title} 
        accordionStyle={accordionStyle} 
        ShowLeftIcon={ShowLeftIcon} 
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        changeleftIcon={changeleftIcon}
      >
        {children}
      </RdsAccordion>
    );
  },
};
