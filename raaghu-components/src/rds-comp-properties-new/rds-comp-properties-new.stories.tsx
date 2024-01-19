/* eslint-disable */
import React from 'react';
import RdsCompPropertiesNew from './rds-comp-properties-new';

export default {
  title: "Components/PropertiesNew",
};

const Template: ComponentStory<typeof RdsCompPropertiesNew> = (args) => (
  <RdsCompPropertiesNew {...args} />
);


export const PropertiesNew = () => <RdsCompPropertiesNew />;

PropertiesNew.story = {
  name: 'default',
};
