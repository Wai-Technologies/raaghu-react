import React from "react";
import RdsDropdownListWithSearch from "./rds-dropdown-list-with-search";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown List With Search',
    component: RdsDropdownListWithSearch,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsDropdownListWithSearch>;

export default meta;
type Story = StoryObj<typeof RdsDropdownListWithSearch>;

export const Default: Story = {
    args: {
        placeholder: 'Filter',
        label: "Select Users List",
        isSearchable: true,
        required: false,
        isDisabled: false,
        selectItems: [
            {
                label: "Riya Sharma",
                value: "Riya",
                icon: "https://th.bing.com/th/id/OIP.dmCI62ZlmvIp1yxyBVSAxAHaHP?w=567&h=555&rs=1&pid=ImgDetMain",
                iconWidth: "30px",
                iconHeight: "30px",
            },
            {
                label: "John Doe",
                value: "John",
                icon: "https://i.vimeocdn.com/portrait/20107774_640x640",
                iconWidth: "30px",
                iconHeight: "30px",
            },
            {
                label: "Richard P",
                value: "Richard",
                icon: "https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic-768x730.jpg",
                iconWidth: "30px",
                iconHeight: "30px",
            },
            {
                label: "Alex Brown",
                value: "Alex",
                icon: "https://i0.wp.com/studio.ameliate.com/wp-content/uploads/2021/01/Michele-Oval-Edited-768x768-1.png?w=760&ssl=1",
                iconWidth: "30px",
                iconHeight: "30px",
            },
            {
                label: "Chris Johnson",
                value: "Chris",
                icon: "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
                iconWidth: "30px",
                iconHeight: "30px",
            },
            {
                label: "Elizabeth Diva",
                value: "Elizabeth",
                icon: "https://th.bing.com/th/id/OIP.GmUT02hCOJSpUjLmUtV5hAHaHa?rs=1&pid=ImgDetMain",
                iconWidth: "30px",
                iconHeight: "30px",
            }
        ],
    }
}
Default.parameters = { controls: { include: ['label', 'placeholder', 'selectItems', 'isDisabled', 'required', 'isSearchable', 'isBold'] } };