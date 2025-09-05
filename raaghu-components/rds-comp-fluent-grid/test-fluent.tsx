import React from 'react';
import { FluentProvider, webLightTheme, Button, Text } from '@fluentui/react-components';

const TestFluent: React.FC = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <div>
        <Text>Hello Fluent UI</Text>
        <Button>Test Button</Button>
      </div>
    </FluentProvider>
  );
};

export default TestFluent;
