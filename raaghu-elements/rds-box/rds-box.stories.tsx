import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsBox from './rds-box';
import {Typography } from '@mui/material';
import RdsButton from '../rds-button/rds-button';

const meta: Meta<typeof RdsBox> = {
  title: 'Elements/Box',
  component: RdsBox,
  parameters: {
    layout: 'centered',
    controls: { include: ['children'] },
    docs: {
      story: {
        inline: true
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: { 
      control: { type: 'text' },
      description: 'Content to display inside the box'
    },
    className: { table: { disable: true }, control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a Box component',
  },
  render: (args) => <RdsBox {...args} className="rds-box--default" />,
  parameters: {
    docs: {
      source: {
        code: `<RdsBox>
        This is a Box component
        </RdsBox>`
      }
    }
  }
};

export const WithPadding: Story = {
  args: {
    children: 'Box with padding',
  },
  render: (args) => <RdsBox {...args} className="rds-box--with-padding" />,
  parameters: {
    docs: {
      source: {
        code: `<RdsBox>
        Box with padding
        </RdsBox>`
      }
    }
  }
};

export const WithMargin: Story = {
  args: {
    children: 'Box with margin',
  },
  render: (args) => <RdsBox {...args} className="rds-box--with-margin" />,
  parameters: {
    docs: {
      source: {
        code: `<RdsBox>
        Box with margin
        </RdsBox>`
      }
    }
  }
};

export const FlexContainer: Story = {
  args: {
    children: [
  <RdsButton
  key="1"
  color="primary"
  layout="text-only"
  shape="rectangle"
  size="medium"
  state="default"
  style="filled"
  text="Button 1"
  textCase="capitalize"
/>,
 <RdsButton
  key="2"
  color="primary"
  layout="text-only"
  shape="rectangle"
  size="medium"
  state="default"
  style="outlined"
  text="Button 2"
  textCase="capitalize"
/>,
 <RdsButton
  key="3"
  color="primary"
  layout="text-only"
  shape="rectangle"
  size="medium"
  state="default"
  style="transparent"
  text="Button 3"
  textCase="capitalize"
/>
    ],
  },
    argTypes: {
    children: { control: false },
  },
  render: (args) => <RdsBox {...args} className="rds-box--flex-container" />,
  parameters: {
    docs: {
      source: {
        code: `<RdsBox>
  <RdsButton
    color="primary"
    layout="text-only"
    shape="rectangle"
    size="medium"
    state="default"
    style="filled"
    text="Button 1"
    textCase="capitalize"
  />
  <RdsButton
    color="primary"
    layout="text-only"
    shape="rectangle"
    size="medium"
    state="default"
    style="outlined"
    text="Button 2"
    textCase="capitalize"
  />
  <RdsButton
    color="primary"
    layout="text-only"
    shape="rectangle"
    size="medium"
    state="default"
    style="transparent"
    text="Button 3"
    textCase="capitalize"
  />
</RdsBox>`
      }
    }
  }
};

export const GridContainer: Story = {
  args: {
    children: (
      <>
        <Typography>Item 1</Typography>
        <Typography>Item 2</Typography>
        <Typography>Item 3</Typography>
        <Typography>Item 4</Typography>
      </>
    ),
  },
    argTypes: {
    children: { control: false },
  },
  render: (args) => <RdsBox {...args} className="rds-box--grid-container" />,
  parameters: {
    docs: {
      source: {
        code: `<RdsBox>
        <Typography>Item 1</Typography>
        <Typography>Item 2</Typography>
        <Typography>Item 3</Typography>
        <Typography>Item 4</Typography>
        </RdsBox>`
      }
    }
  }
};

export const CustomComponent: Story = {
  args: {
    component: 'section',
    children: 'This Box renders as a section element',
  },
  render: (args) => <RdsBox {...args} className="rds-box--custom-component" />,
  parameters: {
    docs: {
      source: {
        code: `<RdsBox component="section">
        This Box renders as a section element
        </RdsBox>`
      }
    }
  }
};
