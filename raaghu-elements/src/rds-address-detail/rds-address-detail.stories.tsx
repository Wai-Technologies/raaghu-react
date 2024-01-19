import React from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import RdsAddressDetail, { RdsAddressDetailProps } from"./rds-address-detail";

export default {
    /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
    title: "Elements/Address Detail",
    component: RdsAddressDetail,
} as ComponentMeta<typeof RdsAddressDetail>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RdsAddressDetail> = (args) => <RdsAddressDetail {...args} />;

//👇 Each story then reuses that template
export const AddressDetail = Template.bind({});
AddressDetail.args = {
    withIcon: true,
    header: "Address Header",
    addressLine1: "Address Line 1",
    addressLine2: "Address Line 2",
    addressLine3: "Address Line 3",
    cardborder:true
};