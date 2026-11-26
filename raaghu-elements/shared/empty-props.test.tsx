import { createElement, type ComponentType } from 'react';
import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import RdsBottomNavigation from '../rds-bottom-navigation/rds-bottom-navigation';
import RdsBreadcrumbs from '../rds-breadcrumbs/rds-breadcrumbs';
import RdsButtonDropdown from '../rds-button-dropdown/rds-button-dropdown';
import RdsRadio from '../rds-radio/rds-radio';
import RdsSelect from '../rds-select/rds-select';
import RdsSidebar from '../rds-sidebar/rds-sidebar';
import RdsStepper from '../rds-stepper/rds-stepper';
import RdsTable from '../rds-table/rds-table';
import RdsTimeline from '../rds-timeline/rds-timeline';
import RdsToggleButton from '../rds-toggle-button/rds-toggle-button';
import RdsCompAiChatBot from '../../raaghu-components/rds-comp-ai-chat-bot/rds-comp-ai-chat-bot';

const components = {
  RdsBottomNavigation,
  RdsBreadcrumbs,
  RdsButtonDropdown,
  RdsRadio,
  RdsSelect,
  RdsSidebar,
  RdsStepper,
  RdsTable,
  RdsTimeline,
  RdsToggleButton,
  RdsCompAiChatBot,
} as unknown as Record<string, ComponentType<object>>;

describe('components render without their list props (RDS-137)', () => {
  it.each(Object.entries(components))('%s renders on the client with {} props', (_, Component) => {
    expect(() => render(createElement(Component, {}))).not.toThrow();
  });

  it.each(Object.entries(components))('%s renders on the server with {} props', (_, Component) => {
    expect(() => renderToString(createElement(Component, {}))).not.toThrow();
  });
});
