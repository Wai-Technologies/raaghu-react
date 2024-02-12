import type { Meta, StoryObj } from '@storybook/react';
import RdsCompThemeNew from "./rds-comp-theme-new";


const meta: Meta = { 
    title: "Components/Theme New",
    component: RdsCompThemeNew,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompThemeNew>;

export default meta;
type Story = StoryObj<typeof RdsCompThemeNew>;

export const Default: Story = {
    args: {
          StyleList: [{ option: "Style 1", value: "style 1" }, { option: "Style 2", value: "style 1" }],
  WebList: [{ option: "Public 1", value: "style 1" }, { option: "Public 2", value: "style 1" }],
  MenuList: [{ option: "Placement 1",value: "style 1" }, { option: "Placement 2", value: "style 1" }],
  StatusList: [{ option: "Status 1", value: "style 1" }, { option: "Status 2", value: "style 1" }],
    }
} satisfies Story;




