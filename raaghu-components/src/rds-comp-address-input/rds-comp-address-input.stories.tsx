import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompAddressInput from "./rds-comp-address-input";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Address Input",
    component: RdsCompAddressInput,
    decorators: [
        (StoryComponent) => (
          <I18nextProvider i18n={i18n}>
            <StoryComponent />
          </I18nextProvider>
        ),
      ],
} as ComponentMeta<typeof RdsCompAddressInput>;


const Template: ComponentStory<typeof RdsCompAddressInput> = (args) => (
    <RdsCompAddressInput {...args} />
);


export const AddressInput = Template.bind({});

AddressInput.args ={

};

