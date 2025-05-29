import RdsToggle, {ToggleStyle, ToggleLayout, ToggleState} from "./rds-toggle";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Toggle",
    component: RdsToggle,
    parameters: {
        layout: "padded",
        docs:{
            description: {
  component: `The **Toggle** element is a highly customizable switch component used to represent and control binary states such as \`On\` and \`Off\`. It supports multiple **styles** (\`Style 1\` through \`Style 6\`) and flexible **layouts** including \`Switch + Label\`, \`Label + Switch\`, \`Top Label + Switch\`, and \`Bottom Label + Switch\` to fit different UI designs and user preferences. The toggle handles various **states** such as \`On\`, \`Off\`, \`Disabled On\`, and \`Disabled Off\`, ensuring accessibility and usability across scenarios. Additional options include showing or hiding labels and customizing label text. This component is ideal for settings, preferences, and feature toggles within dashboards and forms, aligning perfectly with your design system's look and feel.`
}
,
            source:{
                transform: (code: string) => {
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={ToggleState.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state:ToggleState ${p1.replace(/\s+/g, "")}`);
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={ToggleStyle.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style:ToggleStyle ${p1.replace(/\s+/g, "")}`);
                    // Transform layout enum - remove spaces and transform
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={ToggleLayout.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout:ToggleLayout ${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
    },
    tags: ["autodocs"],
    argTypes: {
        style: {
            options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6"],
            control: { type: "select" },
        },
        layout: {
            options: ["Switch + Label", "Label + Switch", "Top Label + Switch", "Bottom Label + Switch"],
            control: { type: "select" },
        },
        state: {
            options: ["On", "Off", "Disabled On", "Disabled Off"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsToggle>;

export default meta;
type Story = StoryObj<typeof RdsToggle>;

export const Default: Story = {
    args: {
        style: ToggleStyle.Style1,
        layout: ToggleLayout.SwitchLabel,
        state:ToggleState.On,
        showLabel:true,
        label:"Label"
    }
} satisfies Story;

Default.parameters = { controls: { include: [ "style", "layout", "state", "showLabel", "label"] } };
