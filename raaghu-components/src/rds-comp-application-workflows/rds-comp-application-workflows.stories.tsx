import React from 'react';
import RdsCompApplicationWorkflows from './rds-comp-application-workflows';

export default {
  title: "components/Application Workflows",
};

export const Default = () => <RdsCompApplicationWorkflows typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
  throw new Error('Function not implemented.');
}} />;

Default.story = {
  name: 'default',
};
