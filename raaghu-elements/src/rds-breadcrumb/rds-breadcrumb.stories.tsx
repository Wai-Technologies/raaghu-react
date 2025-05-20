import RdsBreadcrumb, { BreadcrumbLevel, BreadcrumbSeparator, BreadcrumbState, BreadcrumbStyle } from "./rds-breadcrumb";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Breadcrumb',
    component: RdsBreadcrumb,
    parameters: {
      layout: 'padded',
      docs: {
        source: {
            transform: (code: string) => {
                // Transform style enum - remove spaces and transform
                code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={BreadcrumbStyle.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: BreadcrumbStyle.${p1.replace(/\s+/g, '')}`);
                
                // Transform separator enum - map symbols to enum names
                const separatorMap: Record<string, string> = {
                    '>': 'GreaterThan',
                    '/': 'Slash',
                    '→': 'Arrow',
                    '⟫': 'DoubleArrow',
                    '|': 'Pipe',
                    '-': 'Dash',
                    '+': 'Plus'
                };
                code = code.replace(/separator="([^"]+)"/g, (match, p1) => `separator={BreadcrumbSeparator.${separatorMap[p1] || p1}}`);
                code = code.replace(/separator:\s*"([^"]+)"/g, (match, p1) => `separator: BreadcrumbSeparator.${separatorMap[p1] || p1}`);
                
                // Transform level enum - remove spaces and transform
                code = code.replace(/level="([^"]+)"/g, (match, p1) => `level={BreadcrumbLevel.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/level:\s*"([^"]+)"/g, (match, p1) => `level: BreadcrumbLevel.${p1.replace(/\s+/g, '')}`);
                
                // Transform state enum - remove spaces and transform
                code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={BreadcrumbState.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: BreadcrumbState.${p1.replace(/\s+/g, '')}`);
                
                return code;
            },
        },
    },
    },
    tags: ['autodocs'],
    argTypes: {
      style: {
        control: 'select',
        options: Object.values(BreadcrumbStyle),
      },
      separator: {
        control: 'select',
        options: Object.values(BreadcrumbSeparator),
      },
      level: {
        control: 'select',
        options: Object.values(BreadcrumbLevel),
      },
      state: {
        control: 'select',
        options: Object.values(BreadcrumbState),
      },
    },
  } satisfies Meta<typeof RdsBreadcrumb>;

export default meta;
type Story = StoryObj<typeof RdsBreadcrumb>;

const breadItems = [
    {
        id: 1,
        route: "#",
        disabled: false,
        iconFill: false,
        iconstroke: true,
        iconWidth: "15px",
        iconHeight: "15px",
        iconColor: "primary",
        active: false,
    },
    {
        id: 2,
        route: "#",
        disabled: false,
        iconFill: false,
        iconstroke: true,
        iconWidth: "15px",
        iconHeight: "15px",
        iconColor: "primary",
        active: false,
    },
    {
        id: 3,
        route: "#",
        disabled: false,
        iconFill: false,
        iconstroke: true,
        iconWidth: "15px",
        iconHeight: "15px",
        iconColor: "primary",
        active: false,
    },
    {
        id: 4,
        route: "#",
        disabled: false,
        iconFill: false,
        iconstroke: true,
        iconWidth: "15px",
        iconHeight: "15px",
        iconColor: "primary",
        active: false,
    },
    {
        id: 5,
        active: false,
        disabled: true,
        iconFill: false,
        iconstroke: true,
        iconWidth: "15px",
        iconHeight: "15px",
        iconColor: "primary",
    },
    
];

export const Default: Story = {
  args: {
    style: BreadcrumbStyle.PillBackground,
    level: BreadcrumbLevel.Level3,
    state: BreadcrumbState.Default,
    showIcon: true,
    icon: "home",
    title: "Home",
    separator: BreadcrumbSeparator.GreaterThan,
    breadcrumbItems: breadItems,
  },
};

// export const WithoutBackground: Story = {
//   args: {
//     style: BreadcrumbStyle.WithoutBackground,
//     level: BreadcrumbLevel.Level2,
//     state: BreadcrumbState.Default,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.Slash,
//     breadcrumbItems: breadItems,
//   },
// };

// export const SquareBackground: Story = {
//   args: {
//     style: BreadcrumbStyle.SquareBackground,
//     level: BreadcrumbLevel.Level4,
//     state: BreadcrumbState.Default,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.Arrow,
//     breadcrumbItems: breadItems,
//   },
// };

// export const WithDoubleArrow: Story = {
//   args: {
//     style: BreadcrumbStyle.PillBackground,
//     level: BreadcrumbLevel.Level5,
//     state: BreadcrumbState.Default,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.DoubleArrow,
//     breadcrumbItems: breadItems,
//   },
// };

// export const WithPipeSeparator: Story = {
//   args: {
//     style: BreadcrumbStyle.WithoutBackground,
//     level: BreadcrumbLevel.Level1,
//     state: BreadcrumbState.Default,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.Pipe,
//     breadcrumbItems: breadItems,
//   },
// };

// export const WithDashSeparator: Story = {
//   args: {
//     style: BreadcrumbStyle.SquareBackground,
//     level: BreadcrumbLevel.Level3,
//     state: BreadcrumbState.Default,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.Dash,
//     breadcrumbItems: breadItems,
//   },
// };

// export const WithPlusSeparator: Story = {
//   args: {
//     style: BreadcrumbStyle.PillBackground,
//     level: BreadcrumbLevel.Level2,
//     state: BreadcrumbState.Default,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.Plus,
//     breadcrumbItems: breadItems,
//   },
// };

// export const HoverState: Story = {
//   args: {
//     style: BreadcrumbStyle.PillBackground,
//     level: BreadcrumbLevel.Level3,
//     state: BreadcrumbState.Hover,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.GreaterThan,
//     breadcrumbItems: breadItems,
//   },
// };

// export const SelectedState: Story = {
//   args: {
//     style: BreadcrumbStyle.PillBackground,
//     level: BreadcrumbLevel.Level3,
//     state: BreadcrumbState.Selected,
//     showIcon: true,
//     icon: "home",
//     title: "Home",
//     separator: BreadcrumbSeparator.GreaterThan,
//     breadcrumbItems: breadItems,
//   },
// };

