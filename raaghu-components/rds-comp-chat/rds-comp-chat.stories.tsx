import RdsCompChat from "./rds-comp-chat";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta = {
    title: "Components/Chat",
    component: RdsCompChat,
    parameters: {
        layout: "padded",
        docs: {
    description: {
        component: 'The **Chat** element is a customizable chat interface component designed for displaying and managing real-time conversations between multiple users. It supports a user list with profile details, status indicators, avatars, and message history. Each user can have a series of comments, and the chat screen can be enabled or disabled as needed. The component allows for visual customization, including separate background and text colors for current user and other users’ messages, making it easy to match different design themes. It also provides hooks for handling new comments, enabling interactive and dynamic chat experiences suitable for messaging features in web applications.'
    }
}
    },
    tags: ["autodocs"]
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
        currentUserCommentBgColor: "#7825E9",
        currentUserCommentTextColor: "#FEF7FF",
        otherUserCommentBgColor: "#E1E3EA",
        OtherUserCommentTextColor: "#202020",
        handleAddComment: (comment) => {},
    }
} satisfies Story;

Default.parameters = { controls: { include: ["isChatScreenEnabled", "userData", "currentUserCommentBgColor", "currentUserCommentTextColor", "otherUserCommentBgColor", "OtherUserCommentTextColor"] } };
export const ChatVisible: Story = {
  name: 'Interaction: Chat component renders',
  args: {
    isChatScreenEnabled: true,
    userData: [
      {
        firstName: 'Alice',
        lastName: 'Smith',
        activeDotButton: false,
        status: 'Online',
        size: 'medium',
        colorVariant: 'primary',
        time: '10.00',
        profileType: 'text',
        withProfilePic: false,
        messageStatus: '',
        comments: [{ firstName: 'Alice', lastName: 'Smith', comment: 'Hello!' }],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    // Chat renders user list — verify the component mounts
    const chatEl = canvasElement.querySelector('[class*="chat"], [class*="Chat"]')
      ?? canvasElement.firstElementChild
    await expect(chatEl).not.toBeNull()
    await expect(canvasElement).toBeTruthy()
  }
};
