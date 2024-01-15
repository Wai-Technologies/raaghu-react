import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";

export default {
    title: "Elements/Badge",
    component: RdsBadge,
    argTypes: {
        size: {
            options: ["small", "smaller", "smallest", "medium"],
            control: { type: "select" },
        },
        badgeType: {
            options: ["rectangle", "pill"],
            control: { type: "select" },
        },
        colorVariant: {
            options: [
                "primary",
                "success",
                "danger",
                "warning",
                "light",
                "info",
                "secondary",
                "dark",
            ],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsBadge>;

const Template: ComponentStory<typeof RdsBadge> = (args) => (
    <RdsBadge {...args} />
);

export const TextBadge = Template.bind({});
TextBadge.args = {
    size: "medium",
    label: "Badge",
    colorVariant: "danger",
    badgeType: "rectangle",
};


// const Button: ComponentStory<typeof RdsBadge> = (args) => (
//     <>
//         <RdsButton type="button" colorVariant="primary" label="Button">
//             <RdsBadge {...args} class="position-absolute top-0 start-100 translate-middle"></RdsBadge>
//         </RdsButton>
//     </>
// );

// export const button = Button.bind({});
// button.args = {
//     size: "medium",
//     label: "9",
//     colorVariant: "danger",
//     badgeType: "rectangle",
// };

const Positioned: ComponentStory<typeof RdsBadge> = (args) => (
    <><RdsButton
        type="button"
        colorVariant="primary"
        size="small"
        label="Button" /><span className="position-absolute translate-middle"><RdsBadge {...args}></RdsBadge></span></>
    
);

export const WithLabel = Positioned.bind({});
WithLabel.args = {
    size: "smaller",
    label: "99",
    colorVariant: "danger",
    badgeType: "rectangle",
    positioned: true,
};

const PositionedIcon: ComponentStory<typeof RdsBadge> = (args) => (
    <span   className='position-relative'>
        <RdsIcon
            name='notification'
            width="20px"
            height="20px"
            fill={false}
            stroke={true}
        />
        <RdsBadge {...args}></RdsBadge>
    </span>
);

export const WithIcon = PositionedIcon.bind({});
WithIcon.args = {
    size: "smallest",
    label: "9",
    colorVariant: "danger",
    badgeType: "rectangle",
    positioned: true,
};
