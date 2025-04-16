import RdsMultilevelMenu, {MenuSize, MenuType, MenuState } from "./rds-multilevel-menu";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Multilevel Menu",
    component: RdsMultilevelMenu,
    parameters: {
        layout: "padded",
        docs: {
            source: {
                transform: (code: string) => {
                    // Transform boolean props to show without ={true}
                    code = code.replace(/="true"/g, '');
                    
                    // Transform enum values to show in curly braces
                    code = code.replace(/size="([^"]+)"/g, (match, p1) => `size={MenuSize.${p1}}`);
                    code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={MenuType.${p1}}`);
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={MenuState.${p1}}`);
                    
                    return code;
                }
            }
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            options: ["Default", "Large"],
            control: { type: "select" },
        },
        type: {
            options: ["Selectable", "Expandable"],
            control: { type: "select" },
        },
        state: {
            options: ["Default", "Hover", "Selected"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsMultilevelMenu>;

export default meta;
type Story = StoryObj<typeof RdsMultilevelMenu>;

export const Default: Story = {
    args: {
        type: MenuType.Expandable,
        state: MenuState.Default,
        size: MenuSize.Default,
    }
} satisfies Story;

Default.parameters = {controls: {include: ['size', 'type', 'state']}};
