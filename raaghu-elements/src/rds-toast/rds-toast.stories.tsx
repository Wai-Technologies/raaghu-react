import RdsToast, {ToastLayout, ToastState, ToastPosition, ToastLeadingIcon} from "./rds-toast";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: "Elements/Toast",
    component: RdsToast,
    parameters: {
        layout: "padded",
        docs: {
            description: {
  component: `The **Toast** element is a versatile and customizable notification component designed to deliver brief messages to users. It supports multiple **states** such as \`basic\`, \`info\`, \`success\`, and \`error\` to visually indicate the type of notification. The component offers different **layouts** including \`text\`, \`download\`, \`chat\`, and \`request\` to accommodate various content formats. Additional features include configurable **leading icons**, flexible **positions** across the viewport, optional headers and subtexts, and dismiss controls for user interaction. This component enhances user experience by providing timely feedback and alerts within your application’s interface, while maintaining consistency with your design system.`
}
,
            source: {
                transform: (code: string) => {
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={ToastState.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state:ToastState ${p1.replace(/\s+/g, "")}`);
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={ToastLayout.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout:ToastLayout ${p1.replace(/\s+/g, "")}`);
                    //Transform leadingIcon enum - remove spaces and transform
                    code = code.replace(/leadingIcon="([^"]+)"/g, (match, p1) => `leadingIcon={ToastLeadingIcon.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/leadingIcon:\s*"([^"]+)"/g, (match, p1) => `leadingIcon:ToastLeadingIcon ${p1.replace(/\s+/g, "")}`);
                    //Transform position enum - remove spaces and transform
                    code = code.replace(/position="([^"]+)"/g, (match, p1) => `position={ToastPosition.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/position:\s*"([^"]+)"/g, (match, p1) => `position:ToastPosition ${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
    },
    tags: ["autodocs"],
    argTypes: {
        state: {
            options: ["basic", "info", "success", "error"], control: { type: "select" },
        },
        layout: {
            options: ["text", "download", "chat", "request"], control: { type: "select" },
        },
        leadingIcon: {
            options: ["circle", "plus"], control: { type: "select" },
        },
        position: {
            options: [
                "topLeft",
                "topCenter",
                "topRight",
                "middleLeft",
                "middleCenter",
                "middleRight",
                "bottomLeft",
                "bottomCenter",
                "bottomRight",
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsToast>;

export default meta;
type Story = StoryObj<typeof RdsToast>;

export const Standard: Story = {
    args: {
        state: ToastState.Basic,
        headerText: "Toast Headline",
        showSubText: true,
        subText: "This is a big sample placeholder text.",
        colorVariant: "light",
        showHeader: true,
        showLeading: true,
        leadingIcon: ToastLeadingIcon.Circle,
        borderColor: "primary",
        layout: ToastLayout.Text,
        position: ToastPosition.TopLeft,
        progressWidth: 40,
        filename: "Filename.txt",
        placeholder: "Placeholder Text",
        showDismiss: true,
        chatTime: "12.29 PM"
    }
} satisfies Story;
Standard.parameters = { controls: { include: ["layout", "state", "headerText", "showSubText", "subText", "showHeader", "showDismiss", "leadingIcon", "showLeading"] } };
