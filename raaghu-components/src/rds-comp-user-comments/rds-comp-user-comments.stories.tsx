import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompUserComments from './rds-comp-user-comments';
const meta: Meta<typeof RdsCompUserComments> = {
    title: "Components/UserComments",
    component: RdsCompUserComments,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        allowDelete: { control: "boolean" },
      //  width: { control: "select", options: ["small", "medium", "large"] },
    },
} satisfies Meta<typeof RdsCompUserComments>;

export default meta;

type Story = StoryObj<typeof RdsCompUserComments>;

export const Default: Story = {
    args: {
        currentUser: {
            firstName: "John",
            lastName: "Doe",
            profilePic :"https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/honestproductreviews.com/wp-content/uploads/2018/08/Asset-5.png"
        },
        comments: [
            {
                username: "Alice Smith",
                profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
                date: new Date(),
                comment: "This is a great product!"
            },
            {
                username: "Maria Brown",
                profilePic: "https://www.educationworld.co.in/wp-content/uploads/2023/05/dummy-female.jpg",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
            {
                username: "Anup Mathew",
                profilePic: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
            {
                username: "Brown Mathew",
                profilePic: "",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
        ],
        allowDelete: false,
    },
};

export const WithDelete: Story = {
    args: {
        currentUser: {
            firstName: "Jane",
            lastName: "Doe",
            profilePic : ""
        },
        comments: [
            {
                username: "Alice Smith",
                profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
                date: new Date(),
                comment: "This is a great product!"
            },
            {
                username: "Maria Brown",
                profilePic: "https://www.educationworld.co.in/wp-content/uploads/2023/05/dummy-female.jpg",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
            {
                username: "Anup Mathew",
                profilePic: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
            {
                username: "Brown Mathew",
                profilePic: "",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
        ],
        allowDelete: true,
    },
};

export const LongComments: Story = {
    args: {
        currentUser: {
            firstName: "Max",
            lastName: "Parker",
            profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
        },
        comments: [
            {
                username: "Alice Smith",
                profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
                date: new Date(),
                comment: "This is a great product!"
            },
            {
                username: "Maria Brown",
                profilePic: "https://www.educationworld.co.in/wp-content/uploads/2023/05/dummy-female.jpg",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
            {
                username: "Anup Mathew",
                profilePic: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
            {
                username: "Brown Mathew",
                profilePic: "",
                date: new Date(),
                comment: "I had a wonderful experience."
            },
        ],
        allowDelete: true,
    },
};
