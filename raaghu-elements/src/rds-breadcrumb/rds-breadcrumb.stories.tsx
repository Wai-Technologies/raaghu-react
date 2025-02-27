import RdsBreadcrumb, { BreadcrumbLevel, BreadcrumbSeparator, BreadcrumbState, BreadcrumbStyle } from "./rds-breadcrumb";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Breadcrumb',
    component: RdsBreadcrumb,
    parameters: {
      layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
      style: {
        control: 'select',
        options: ['Pill Background', 'Without Background', 'Square Background'], // Updated to include new style options
      },
      separator: {
        control: 'select',
        options: ['>', '/', '→', '»', '|', '-'],
      },
      level: {
        control: 'select',
        options: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'], // Add level options
      },
      state: {
        control: 'select',
        options: ['Default', 'Hover', 'Selected'],
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
    title:"Home",
    separator: BreadcrumbSeparator.Slash,
    breadcrumbItems: breadItems,

  },
};
// export const WithoutBackground: Story = {
//     args: {
//       title:"Home",
//       level: "Level 3",
//       separator: "/",
//       icon: "home",
//       showIcon: true,
//       style: "Without Background", // Set default style
//       breadcrumbItems: breadItems,
  
//     },
//   };
//   export const SquareBackground: Story = {
//     args: {
//       title:"Home",
//       level: "Level 3",
//       separator: "/",
//       icon: "home",
//       showIcon: true,
//       style: "Square Background", // Set default style
//       breadcrumbItems: breadItems,
  
//     },
//   };

