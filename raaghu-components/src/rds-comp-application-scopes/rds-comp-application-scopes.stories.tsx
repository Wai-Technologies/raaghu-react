/* eslint-disable */
import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompApplicationScopes from './rds-comp-application-scopes';

export default {
  title: "components/Application Scopes",
  component: RdsCompApplicationScopes,
} as ComponentMeta<typeof RdsCompApplicationScopes>;

const Template: ComponentStory<typeof RdsCompApplicationScopes> = (args) => (
  <RdsCompApplicationScopes {...args} />
);

export const ApplicationScopes = Template.bind({});

ApplicationScopes.args = {
  name: 'default',
};
