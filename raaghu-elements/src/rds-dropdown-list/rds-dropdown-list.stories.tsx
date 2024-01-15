import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsDropdownList from "./rds-dropdown-list";

export default {
    title: "Elements/DropdownList",
    component: RdsDropdownList,
} as ComponentMeta<typeof RdsDropdownList>;

const Template: ComponentStory<typeof RdsDropdownList> = (args) => (
    <RdsDropdownList {...args} />
);

export const Default = Template.bind({});

Default.args = {
    placeholder:"Filter",
    borderDropdown: true,
    icon : "plus",
    isPlaceholder : true,
    isIconPlaceholder : true,
    listItems: [
        {
            label: "EN(US)",
            val: "en",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "English(IND)",
            val: "en",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Français",
            val: "fr",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Deutsch",
            val: "de",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Português (Brasil)",
            val: "pt-BR",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Türkçe",
            val: "tr",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Italiano",
            val: "it",
            iconWidth: "20px",
            iconHeight: "20px",
        },
    ],
    reset:false, 
};

export const WithMultiSelect = Template.bind({});

WithMultiSelect.args = {
    reset:false, 
    placeholder:"Filter",
    multiSelect:true,
    borderDropdown: true,
    isIconPlaceholder : true,
    listItems: [
        {
            label: "EN(US)",
            val: "en",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "English(IND)",
            val: "en",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Français",
            val: "fr",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Deutsch",
            val: "de",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Português (Brasil)",
            val: "pt-BR",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Türkçe",
            val: "tr",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Italiano",
            val: "it",
            iconWidth: "20px",
            iconHeight: "20px",
        },
    ],
};
export const WithIcons = Template.bind({});

WithIcons.args = {
 
    borderDropdown: true,
    listItems: [
        {
            label: "EN(US)",
            val: "en",
            icon: "us",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "English(IND)",
            val: "en",
            icon: "in",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Français",
            val: "fr",
            icon: "fr",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Deutsch",
            val: "de",
            icon: "de",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Português (Brasil)",
            val: "pt-BR",
            icon: "br",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Türkçe",
            val: "tr",
            icon: "tr",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Italiano",
            val: "it",
            icon: "it",
            iconWidth: "20px",
            iconHeight: "20px",
        },
    ],
    placeholder:"Filter",
    // icon: "us",
    // iconFill:false, 
    // iconStroke:true,
};