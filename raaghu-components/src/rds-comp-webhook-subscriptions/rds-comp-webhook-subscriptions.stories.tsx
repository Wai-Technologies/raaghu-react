import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompWebhookSubscription from "./rds-comp-webhook-subscriptions";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Webhook Subscription",
  component: RdsCompWebhookSubscription,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompWebhookSubscription>;


const Template: ComponentStory<typeof RdsCompWebhookSubscription> = (args) =>
  <RdsCompWebhookSubscription {...args} />;


export const WebhookSubscription = Template.bind({});

WebhookSubscription.args = {


};

