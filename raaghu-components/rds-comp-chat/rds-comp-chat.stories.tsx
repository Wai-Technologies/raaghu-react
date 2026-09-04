import RdsCompChat from "./rds-comp-chat";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: "Components/Chat",
    component: RdsCompChat,
    parameters: {
            status: { type: 'stable' },
        layout: "padded",
        docs: {
    description: {
        component: 'The **Chat** element is a customizable chat interface component designed for displaying and managing real-time conversations between multiple users. It supports a user list with profile details, status indicators, avatars, and message history. Each user can have a series of comments, and the chat screen can be enabled or disabled as needed. The component allows for visual customization, including separate background and text colors for current user and other users’ messages, making it easy to match different design themes. It also provides hooks for handling new comments, enabling interactive and dynamic chat experiences suitable for messaging features in web applications.'
    }
}
    },
    tags: ["autodocs", 'stable']
} satisfies Meta<typeof RdsCompChat>;

export default meta;
type Story = StoryObj<typeof RdsCompChat>;

export const Default: Story = {
    args: {
        isChatScreenEnabled: true,
        userData: [
            {
                firstName: "Wai",
                lastName: "Technologies",
                activeDotButton: true,
                status: "Typing....",
                size: "medium",
                colorVariant: "primary",
                time: "13.00",
                profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
                profileType: "icon",
                withProfilePic: true,
                messageStatus: "",
                comments: [
                    {
                        firstName: "Alice",
                        lastName: "Smith",
                        comment: "Hi, How are you?",
                    },
                    {
                        firstName: "Alice",
                        lastName: "Smith",
                        comment: "This is sample message.",
                    }
                ]
            },
            {
                firstName: "John",
                lastName: "Doe",
                activeDotButton: false,
                status: "Developer",
                size: "medium",
                colorVariant: "primary",
                time: "13.00",
                profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m5Cy4lXCbuyG54L0vuo3i5-ALavHe9KmhWA_wDM&s",
                messageStatus: "",
                profileType: "icon",
                withProfilePic: true,
                comments: []
            },
            {
                firstName: "Smith",
                lastName: "Hense",
                activeDotButton: false,
                status: "Company Owner",
                size: "medium",
                colorVariant: "primary",
                time: "13.00",
                profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m5Cy4lXCbuyG54L0vuo3i5-ALavHe9KmhWA_wDM&s",
                messageStatus: "",
                profileType: "icon",
                withProfilePic: true,
                comments: []
            }
        ],
        currentUserCommentBgColor: "var(--rds-primary-main)",
        currentUserCommentTextColor: "var(--rds-primary-contrast-text, var(--rds-neutral-0))",
        otherUserCommentBgColor: "var(--rds-neutral-300)",
        OtherUserCommentTextColor: "var(--rds-text-primary)",
        handleAddComment: (comment) => {},
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
} satisfies Story;

Default.parameters = { controls: { include: ["isChatScreenEnabled", "userData", "currentUserCommentBgColor", "currentUserCommentTextColor", "otherUserCommentBgColor", "OtherUserCommentTextColor"] } };

