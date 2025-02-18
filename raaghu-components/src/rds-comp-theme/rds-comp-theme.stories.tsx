import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTheme from "./rds-comp-theme";


const meta: Meta = { 
    title: "Components/Theme",
    component: RdsCompTheme,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTheme>;

export default meta;
type Story = StoryObj<typeof RdsCompTheme>;

export const Default: Story = {
    args: {
        StyleList: [{ option: "Style 1", value: "style 1" }, { option: "Style 2", value: "style 2" }],
        WebList: [{ option: "Public 1", value: "public 1" }, { option: "Public 2", value: "public 2" }],
        MenuList: [{ option: "Placement 1",value: "placement 1" }, { option: "Placement 2", value: "placement 2" }],
        StatusList: [{ option: "Status 1", value: "status 1" }, { option: "Status 2", value: "status 2" }],
    }
} satisfies Story;




