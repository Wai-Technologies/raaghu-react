import React from "react";
import RdsSelectList from "./rds-select-list";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: "Elements/Select List",
    component: RdsSelectList,
    argTypes: {

    },
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs']
} satisfies Meta<typeof RdsSelectList>;


export default meta;
type Story = StoryObj<typeof RdsSelectList>;

export const Default: Story = {
    args: {
        id: "story",
        label: "Default Select List",
        isMultiple: false,
        placeholder: "Select label",
        selectItems: [
            {
                label: "One",
                value: "one"
            },
            {
                label: "two",
                value: "two"
            },
            {
                label: "three",
                value: "three"
            },
            {
                label: "four",
                value: "four"
            }


        ],
        isDisabled: false,
        selectedValue: "",
        required: false,
        isSearchable: true,
        isBold: false
    }
}
Default.parameters = { controls: { include: ['id', 'label', 'isMultiple', 'placeholder', 'selectItems', 'isDisabled', 'selectedValue', 'required', 'isSearchable', 'isBold', 'onChange'] } };

export const Multiple: Story = {
    args: {
        id: "story",
        label: "Multiple Select List",
        isMultiple: true,
        placeholder: "Select label",
        selectItems: [
            {
                label: "One",
                value: "one"
            },
            {
                label: "two",
                value: "two"
            },
            {
                label: "three",
                value: "three"
            },
            {
                label: "four",
                value: "four"
            }

        ],
        isDisabled: false,
        required: false,
        isSearchable: true,
        isBold: false
    }
}
Multiple.parameters = { controls: { include: ['id', 'label', 'isMultiple', 'placeholder', 'selectItems', 'isDisabled', 'required', 'isSearchable', 'isBold', 'onChange'] } };

export const WithIcon: Story = {
    args: {
        id: "story",
        label: "Select List With Icon",
        isMultiple: true,
        defaultImgUrl:"https://www.svgrepo.com/show/497407/profile-circle.svg",
        placeholder: "Select label",      
        selectItems: [
            {
                label: "Riya Sharma",
                value: "Riya",
                imgUrl: "https://th.bing.com/th/id/OIP.dmCI62ZlmvIp1yxyBVSAxAHaHP?w=567&h=555&rs=1&pid=ImgDetMain",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                label: "John Doe",
                value: "John",
                imgUrl: "https://i.vimeocdn.com/portrait/20107774_640x640",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                label: "Richard P",
                value: "Richard",
                imgUrl: "https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic-768x730.jpg",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                label: "Alex Brown",
                value: "Alex",
                imgUrl: "https://i0.wp.com/studio.ameliate.com/wp-content/uploads/2021/01/Michele-Oval-Edited-768x768-1.png?w=760&ssl=1",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                label: "Chris Johnson",
                value: "Chris",
                imgUrl: "",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                label: "Elizabeth Diva",
                value: "Elizabeth",
                imgUrl: "https://th.bing.com/th/id/OIP.GmUT02hCOJSpUjLmUtV5hAHaHa?rs=1&pid=ImgDetMain",
                imgWidth: "30px",
                imgHeight: "30px",
            }
        ],
        isDisabled: false,
        required: false,
        isSearchable: true,
        isBold: false
    }
}
WithIcon.parameters = { controls: { include: ['id','label', 'placeholder', 'selectItems', 'isDisabled', 'required', 'isSearchable', 'isBold','defaultImgUrl'] } };
