
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsCompLayout from './rds-comp-layout';

const meta: Meta<typeof RdsCompLayout> = {
  title: 'Layouts',
  component: RdsCompLayout,
  parameters: {
    layout: 'padded',
    controls: {
      include: ['displayType', 'hasShadow'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    spacing: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Spacing between layout items',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Flex direction of the layout',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether items should wrap',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content alignment',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Align items alignment',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether layout should take full height',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether layout should take full width',
    },
    displayType: {
      control: 'select',
      options: ['Basic', 'Board','Boxify','Cardify','Collage','Gridify', 'Highlight', 'Matrix','Mosaic','Nexus','Pinboard','Sections','Snapshots','Splitz', 'Spotlight', 'Stacks','Dashboard','Relaxed'],
      description: 'Type of layout display style',
    },
    hasShadow: {
      control: 'boolean',
      description: 'Whether the layout has a shadow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayType: 'Basic',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard',
  },
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.rds-comp-layout-wrapper_basic');
    expect(wrapper).toBeInTheDocument();
  },
};

export const Board: Story = {
  args: {
    displayType: 'Board',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};

export const Boxify: Story = {
  args: {
    displayType: 'Boxify',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};

export const Cardify: Story = {
  args: {
    displayType: 'Cardify',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard',
  }
};

export const Collage: Story = {
  args: {
    displayType: 'Collage',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};

export const Gridify: Story = {
  args: {
    displayType: 'Gridify',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};

export const Highlight: Story = {
  args: {
    displayType: 'Highlight',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};

export const Matrix: Story = {
  args: {
    displayType: 'Matrix',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};

export const Mosaic: Story = {
  args: {
    displayType: 'Mosaic',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Nexus: Story = {
  args: {
    displayType: 'Nexus',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Pinboard: Story = {
  args: {
    displayType: 'Pinboard',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Sections: Story = {
  args: {
    displayType: 'Sections',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Snapshots: Story = {
  args: {
    displayType: 'Snapshots',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Splitz: Story = {
  args: {
    displayType: 'Splitz',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Spotlight: Story = {
  args: {
    displayType: 'Spotlight',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Stacks: Story = {
  args: {
    displayType: 'Stacks',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Dashboard: Story = {
  args: {
    displayType: 'Dashboard',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};
export const Relaxed: Story = {
  args: {
    displayType: 'Relaxed',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    mode: 'standard', 
  }
};


