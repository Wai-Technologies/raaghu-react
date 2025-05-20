import type { Meta, StoryObj } from "@storybook/react";
import RdsButton from "./rds-button";
import React from "react";
import RdsBadge from "../rds-badge/rds-badge"; // Import RdsBadge
import { Tooltip } from "bootstrap";
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";

const displayOptions = ["Icon + Text", "Icon Only", "Text Only"]; 

const meta: Meta = {
    title: "Elements/Button",
    component: RdsButton,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        state: {
            description: "Select the state of the button",
            options: ["default", "hover", "disabled", "selected"], 
            control: { type: "select" }, 
        },
        shape: {
            description: "Select the shape of the button",
            options: ["rectangle","pill"], 
            control: { type: "select" }, 
        },
        style: {
            description: "Select the style of the button",
            options: ["filled","outline","transparent"], 
            control: { type: "select" }, 
        },
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "tertiary",
                "neutral",
                "error",
                "warning",
                "success",
            ],
            control: { type: "select" },
        },
        badgeColorVariant: {
            options: [
                "primary",
                "secondary",
                "tertiary",
                "neutral",
                "error",
                "warning",
                "success",
            ],
            control: { type: "select" },
            if: {arg: "withBadge"},
        },
        badgeLabel: {
            if: {arg: "withBadge"},
        },
        badgeType: {
            options: [
                "box",
                "pill",
            ],
            control: { type: "select" },
            if: {arg: "withBadge"},
        },
        size: {
            options: [
                "small",
                "medium",
                "large"
            ],
            control: { type: "select" },
        },
        textCase: {
            options: [
                "uppercase",
                "lowercase",
                "capitalize",
                "unset"
            ],
            control: { type: "select" },
        },
        tooltipPlacement: {
            options: ["NoArrow", "MiddleTopArrow", "MiddleBottomArrow", "LeftArrow", "LeftTopArrow", "LeftBottomArrow", "RightArrow", "RightTopArrow", "RightBottomArrow"],
            control: { type: "select" },
            //if: { arg: "tooltip"},
        },
        /*tooltipTitle: {
            if: {arg: "tooltip"},

        },*/
        displayType: {
            description: "Select the display type for the button",
            options: displayOptions,
            control: { type: "select" }, // Add a select control for display type
        },
    },
} satisfies Meta<typeof RdsButton>;

export default meta;
type Story = StoryObj<typeof RdsButton>;

export const Default: Story = {
    args: {
        size: "medium",
        state: "default",
        colorVariant: "primary",
        // (May be used in future)
        //isDisabled: false,
        block: false, 
        showLoadingSpinner: false, 
        shape : "rectangle",
        displayType: "Icon + Text",
        textCase: "unset", 
        style: "filled",
        icon: "plus",
        label: "Click Here",
        databstoggle: "tooltip",
        tooltip: false, 
        tooltipPlacement: TooltipStyle.LeftArrow,
        tooltipTitle: "This is tooltip",
        withBadge: false,
        badgeLabel: "99", // Badge label
        badgeColorVariant: "primary", // Badge color
        badgeType: "box",
        badgeLayout: "Text_only",
        badgeStyle: "primary",
        badgeState: "default",
        //badgeSize: "small",
    },
    parameters: { controls: { include: ["state", "label", "icon", "block", "tooltip", "tooltipPlacement", "tooltipTitle", "size","showLoadingSpinner", /*"colorVariant"*/,"style", "shape","textCase","displayType", "badgeLabel", "badgeColorVariant", "badgeType","withBadge"] } },
    render: (args: any) => {
        let { displayType, withBadge, ...rest } = args;
    
        if (displayType === "Icon Only") {
            rest.label = "";
        } else if (displayType === "Text Only") {
            rest.icon = "";
        }
        if (withBadge === true) {
            return (
                <div className="position-relative d-inline-block">
                    <RdsButton displayType={displayType} withBadge {...rest} />
                    {withBadge && (
                        <span className="position-absolute top-0 start-100 translate-middle">
                            <RdsBadge 
                                label={args.badgeLabel} 
                                colorVariant={args.badgeColorVariant} 
                                shape={args.shape}
                                layout={args.badgeLayout}
                                style={args.badgeStyle}
                                state={args.badgeState}
                                size={args.size}
                            />
                        </span>
                    )}
                </div>
            );
        }
        else{
        return <RdsButton displayType={displayType} {...rest} />;
        }
    },
    /*render: (args) => (
        if:
        <RdsButton {...args}></RdsButton>
      ),RdsIcon*/
} satisfies Story;
//Default.parameters = { controls: { include: ["state", "label", "icon", "size",/*"showLoadingSpinner", "colorVariant"*/,"style", "shape",/*"textCase"*/,"displayType"] } };

/* (may be used in future)(these are the other stories which have been now combined into the default story)
export const Disable: Story = {
    args: {
        colorVariant: "primary",
        label: "Disable",
        isDisabled: true,
        block: false,
        size: "medium",
        isRoundedButton : false,
        textCase: "capitalize",
    }
} satisfies Story;
Disable.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "isDisabled","isRoundedButton","textCase"] } };
*/
/*
export const WithIcon: Story = {
    args: {
        icon: "plus",
        colorVariant: "primary",
        size: "medium",
        isFabIcon: true,
    }
} satisfies Story;
WithIcon.parameters = { controls: { include: ["colorVariant", "icon", "size","isFabIcon"] } };
*/
/*
export const Outline: Story = {
    args: {
        isOutline: true,
        colorVariant: "primary",
        label: "Button",
        block: false,
        size: "medium",
        isRoundedButton : false,
        textCase: "uppercase",
    }
} satisfies Story;
Outline.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "isOutline","isRoundedButton","textCase"] } };
*/
/*
export const Tooltip: Story = {
    args: {
        colorVariant: "primary",
        icon: "plus",
        block: false,
        size: "medium",
        databstoggle: "tooltip",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
        isRoundedButton : false,
    },
    argTypes: {
        tooltipPlacement: {
            options: [
                "right",
                "left",
                "top",
                "bottom",
            ],
            control: { type: "radio" },
        },
    }
} satisfies Story;
Tooltip.parameters = { controls: { include: ["colorVariant", "icon", "block", "size", "databstoggle", "tooltip", "tooltipPlacement", "tooltipTitle","isRoundedButton"] } };
*/
/*
export const TextWithIcon: Story = {
    args: {
        icon: "plus",
        colorVariant: "primary",
        label: "Button",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : false,
        textCase: "capitalize",
    }
} satisfies Story;
TextWithIcon.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner", "icon","isRoundedButton","textCase"] } };
*/
/*
export const RoundedButton: Story = {
    args: {
        colorVariant: "primary",
        label: "Button",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : true,
        textCase: "uppercase",
    }
} satisfies Story;
RoundedButton.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","textCase"] } };
*/
/*
export const LinkButton: Story = {
    args: {
        class : "btn-link",
        label : "Link Button",      
        textCase: "capitalize",
    }
} satisfies Story;
LinkButton.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","isRoundedButton","textCase"] } };
*/


