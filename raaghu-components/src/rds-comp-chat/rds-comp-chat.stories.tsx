import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompUserComments from './rds-comp-chat';
import { RdsColorPicker } from "../rds-elements";

const meta: Meta<typeof RdsCompUserComments> = {
    title: "Components/Chatbot",
    component: RdsCompUserComments,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        allowDelete: { control: "boolean" },
        isEmojiPicker: { control: "boolean" },
        isFilepload: { control: "boolean" },
        dateFormat: {
            options: ["dd/mm/yyyy", "mm/dd/yyyy", "Default-with-time"],
            control: { type: "select" },
        },
        currentUserCommentBgColor: RdsColorPicker,
        currentUserCommentTextColor: RdsColorPicker,
        otherUserCommentBgColor: RdsColorPicker,
        OtherUserCommentTextColor: RdsColorPicker,

    },
} satisfies Meta<typeof RdsCompUserComments>;

export default meta;

type Story = StoryObj<typeof RdsCompUserComments>;

const handleCommentCountChange = (newCount: number) => {
    console.log("Updated comment count:", newCount);
};

export const Default: Story = {
    args: {
        currentUser: {
            firstName: "Max",
            lastName: "Kevin",
            profilePic: "https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/honestproductreviews.com/wp-content/uploads/2018/08/Asset-5.png"
        },
        comments: [
            {
                firstName: "Alice",
                lastName: "Smith",
                profilePic: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-women-avatar-wearing-suit-with-long-black-hair-png-image_6102781.png",
                date: new Date().toLocaleDateString('en-US'),
                comment: "Description is missing in the current version.",
                addedTime: Date.now(), // Example timestamp
            },
            {
                firstName: "Maria",
                lastName: "Brown",
                profilePic: "https://www.educationworld.co.in/wp-content/uploads/2023/05/dummy-female.jpg",
                date: new Date().toLocaleDateString('en-US'),
                comment: "Refer ISO 21.5 for the same.",
                addedTime: Date.now(),
            },
            {
                firstName: "Ann",
                lastName: "Augustine",
                profilePic: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience.",
                addedTime: Date.now(),
            },
            {
                firstName: "David",
                lastName: "Brown",
                profilePic: "",
                date: new Date().toLocaleDateString('en-US'),
                comment: "I had a wonderful experience.",
                addedTime: Date.now(),
            },
        ],
        allowDelete: true,
        isEmojiPicker: false,
        isFilepload: false,
        dateFormat: 'mm/dd/yyyy',
        //onCommentCountChange: handleCommentCountChange, // Added callback for comment count change
        currentUserCommentBgColor: '#7825E9',
        currentUserCommentTextColor: '#FEF7FF', // Ensure hex code is correct
        otherUserCommentBgColor: '#D6D6D6',
        OtherUserCommentTextColor: '#202020',
        deleteIconTimeout: 30000, // Delete icon will disappear after 30s
    },
};

