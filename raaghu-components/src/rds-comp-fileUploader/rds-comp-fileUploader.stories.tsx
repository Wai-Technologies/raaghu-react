import React from 'react';
import { ComponentStory } from "@storybook/react";
import RdsCompFileUploader from './rds-comp-fileUploader';

export default {
  title: "Components/File Uploader",
};

const Template: ComponentStory<typeof RdsCompFileUploader> = (args) => (
  <RdsCompFileUploader {...args} />
);

export const FileUploader = () => <RdsCompFileUploader onClick={undefined} />;

FileUploader.story = {
  name: 'default',
};
