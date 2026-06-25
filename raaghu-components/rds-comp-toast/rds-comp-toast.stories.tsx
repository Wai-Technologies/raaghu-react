import RdsCompToast from "./rds-comp-toast";
import { ToastLayout, ToastLeadingIcon, ToastPosition, ToastState } from "./rds-comp-toast.types";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta<typeof RdsCompToast> = {
    title: "Components/Toast",
    component: RdsCompToast,
    parameters: {
            status: { type: 'stable' },
        layout: "padded",
        controls: {
        exclude: ['delay', 'autohide', 'borderColor'],
        },
        docs: {
            story: {
                height: '100px'
            },
            source: {
                transform: (code: string) => {
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={ToastState.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: ToastState.${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={ToastLayout.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: ToastLayout.${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/leadingIcon="([^"]+)"/g, (match, p1) => `leadingIcon={ToastLeadingIcon.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/leadingIcon:\s*"([^"]+)"/g, (match, p1) => `leadingIcon: ToastLeadingIcon.${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/position="([^"]+)"/g, (match, p1) => `position={ToastPosition.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/position:\s*"([^"]+)"/g, (match, p1) => `position: ToastPosition.${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
    },
    
    tags: ["autodocs", 'stable'],
    argTypes: {
        state: {
            options: Object.values(ToastState), 
            control: { 
                type: "select",
                labels: {
                    [ToastState.Basic]: 'Basic',
                    [ToastState.Info]: 'Info',
                    [ToastState.Success]: 'Success',
                    [ToastState.Error]: 'Error'
                }
            },
            description: "State variant of the toast notification"
        },
        layout: {
            options: Object.values(ToastLayout), 
            control: { 
                type: "select",
                labels: {
                    [ToastLayout.Text]: 'Text',
                    [ToastLayout.Download]: 'Download',
                    [ToastLayout.Chat]: 'Chat',
                    [ToastLayout.Request]: 'Request'
                }
            },
            description: "Layout type of the toast"
        },
        leadingIcon: {
            options: Object.values(ToastLeadingIcon), 
            control: { 
                type: "select",
                labels: {
                    [ToastLeadingIcon.Circle]: 'Circle',
                    [ToastLeadingIcon.Plus]: 'Plus'
                }
            },
            description: "Leading icon type"
        },
        position: {
            options: Object.values(ToastPosition),
            control: { 
                type: "select",
                labels: {
                    [ToastPosition.TopLeft]: 'Top Left',
                    [ToastPosition.TopCenter]: 'Top Center', 
                    [ToastPosition.TopRight]: 'Top Right',
                    [ToastPosition.MiddleLeft]: 'Middle Left',
                    [ToastPosition.MiddleCenter]: 'Middle Center',
                    [ToastPosition.MiddleRight]: 'Middle Right',
                    [ToastPosition.BottomLeft]: 'Bottom Left',
                    [ToastPosition.BottomCenter]: 'Bottom Center',
                    [ToastPosition.BottomRight]: 'Bottom Right'
                }
            },
            description: "Position of the toast on screen"
        },
        headerText: {
            control: "text",
            description: "Header text of the toast"
        },
        subText: {
            control: "text", 
            description: "Subtitle or body text of the toast"
        },
        showHeader: {
            control: "boolean",
            description: "Show/hide the header section"
        },
        showSubText: {
            control: "boolean",
            description: "Show/hide the subtitle text"
        },
        showDismiss: {
            control: "boolean",
            description: "Show/hide the dismiss button"
        },
        showLeading: {
            control: "boolean",
            description: "Show/hide the leading icon"
        }
    },
} satisfies Meta<typeof RdsCompToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        state: ToastState.Basic,
        headerText: "Toast Headline",
        showSubText: true,
        subText: "This is a big sample placeholder text.",
        showHeader: true,
        showLeading: true,
        leadingIcon: ToastLeadingIcon.Circle,
        layout: ToastLayout.Text,
        position: ToastPosition.TopLeft,
        showDismiss: true,
        progressWidth: 40,
        filename: "Filename.txt",
        placeholder: "Placeholder Text",
        chatTime: "12:29 PM"
    },
    play: async ({ canvas }) => {
        const heading = await canvas.findByText('Toast Headline');
        await expect(heading).toBeInTheDocument();
    },
} satisfies Story;