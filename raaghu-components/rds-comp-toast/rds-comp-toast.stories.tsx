import RdsCompToast from "./rds-comp-toast";
import { ToastLayout, ToastLeadingIcon, ToastPosition, ToastSeverity } from "./rds-comp-toast.types";
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
                    code = code.replace(/severity="([^"]+)"/g, (match, p1) => `severity={ToastSeverity.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/severity:\s*"([^"]+)"/g, (match, p1) => `severity: ToastSeverity.${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={ToastLayout.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: ToastLayout.${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/icon="([^"]+)"/g, (match, p1) => `icon={ToastLeadingIcon.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/icon:\s*"([^"]+)"/g, (match, p1) => `icon: ToastLeadingIcon.${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/position="([^"]+)"/g, (match, p1) => `position={ToastPosition.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/position:\s*"([^"]+)"/g, (match, p1) => `position: ToastPosition.${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
    },

    tags: ["autodocs", 'stable'],
    argTypes: {
        severity: {
            options: Object.values(ToastSeverity),
            control: {
                type: "select",
                labels: {
                    [ToastSeverity.Basic]: 'Basic',
                    [ToastSeverity.Info]: 'Info',
                    [ToastSeverity.Success]: 'Success',
                    [ToastSeverity.Error]: 'Error'
                }
            },
            description: "Severity of the toast notification"
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
        icon: {
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
        title: {
            control: "text",
            description: "Header text of the toast"
        },
        message: {
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
        severity: ToastSeverity.Basic,
        title: "Toast Headline",
        showSubText: true,
        message: "This is a big sample placeholder text.",
        showHeader: true,
        showLeading: true,
        icon: ToastLeadingIcon.Circle,
        layout: ToastLayout.Text,
        position: ToastPosition.TopLeft,
        showDismiss: true,
        progress: 40,
        filename: "Filename.txt",
        placeholder: "Placeholder Text",
        chatTime: "12:29 PM"
    },
    play: async ({ canvas }) => {
        const heading = await canvas.findByText('Toast Headline');
        await expect(heading).toBeInTheDocument();
    },
} satisfies Story;