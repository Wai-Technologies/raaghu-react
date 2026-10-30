import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompAppShell from './rds-comp-app-shell/rds-comp-app-shell';
import { AppShellDisplayType } from './rds-comp-app-shell/shell-types';
import RdsCompLayout from './rds-comp-layout/rds-comp-layout';
import RdsCompLayoutItem from './rds-comp-layout/rds-comp-layout-item';
import { warnDeprecatedProp } from '../raaghu-elements/shared/utils/deprecation';

jest.mock('../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('audit fixes', () => {
  beforeEach(() => jest.clearAllMocks());

  it('variant maps to the same class as displayType', () => {
    const { container, rerender } = render(<RdsCompAppShell displayType={AppShellDisplayType.TopNav} />);
    expect(container.firstChild).toHaveClass('top-nav');
    rerender(<RdsCompAppShell displayType={AppShellDisplayType.TopNav} variant="tri-pane" />);
    expect(container.firstChild).toHaveClass('triPane');
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('header renders and wins over the deprecated topbar', () => {
    render(<RdsCompAppShell header={<span>new</span>} topbar={<span>old</span>} />);
    expect(screen.getByText('new')).toBeInTheDocument();
    expect(screen.queryByText('old')).not.toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAppShell', 'topbar', '`header`');
  });

  it('sidebarOpen + onSidebarOpenChange close from the backdrop and Escape', () => {
    const onSidebarOpenChange = jest.fn();
    const { container } = render(<RdsCompAppShell sidebarOpen onSidebarOpenChange={onSidebarOpenChange} />);
    expect(container.firstChild).toHaveClass('mobile-sidebar-open');
    fireEvent.click(screen.getByLabelText('Close sidebar overlay'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onSidebarOpenChange).toHaveBeenNthCalledWith(1, false);
    expect(onSidebarOpenChange).toHaveBeenNthCalledWith(2, false);
  });

  it('deprecated mobileSidebarOpen/onMobileSidebarToggle keep working', () => {
    const onMobileSidebarToggle = jest.fn();
    render(<RdsCompAppShell mobileSidebarOpen onMobileSidebarToggle={onMobileSidebarToggle} />);
    fireEvent.click(screen.getByLabelText('Close sidebar overlay'));
    expect(onMobileSidebarToggle).toHaveBeenCalledTimes(1);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAppShell', 'mobileSidebarOpen', '`sidebarOpen`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAppShell', 'onMobileSidebarToggle', '`onSidebarOpenChange`');
  });

  it('layout template renders the template without mode', () => {
    const { container } = render(<RdsCompLayout template="basic" />);
    expect(container.querySelector('.rds-comp-layout-wrapper_basic')).toBeInTheDocument();
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('layout hasShadow is deprecated in favour of elevated', () => {
    render(<RdsCompLayout mode="standard" hasShadow />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompLayout', 'hasShadow', '`elevated`');
  });

  it('layout item still applies flex/order/alignSelf', () => {
    render(<RdsCompLayoutItem flex={2} order={3} alignSelf="center">x</RdsCompLayoutItem>);
    expect(screen.getByText('x')).toHaveStyle({ flex: '2', order: '3', alignSelf: 'center' });
  });
});
