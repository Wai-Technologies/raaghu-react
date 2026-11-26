import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAppShell from './rds-comp-app-shell';

jest.mock('./rds-comp-app-shell.scss', () => ({}));

describe('RdsCompAppShell a11y', () => {
  it('exposes nav and main landmarks and a skip link', () => {
    render(
      <RdsCompAppShell sidebar={<div>Nav</div>}>
        <div>Content</div>
      </RdsCompAppShell>,
    );
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Content');
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
  });

  it('closes the mobile sidebar on Escape and restores focus path', () => {
    const onSidebarOpenChange = jest.fn();
    render(
      <RdsCompAppShell sidebar={<button type="button">Item</button>} sidebarOpen onSidebarOpenChange={onSidebarOpenChange}>
        <div>Content</div>
      </RdsCompAppShell>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onSidebarOpenChange).toHaveBeenCalledWith(false);
  });

  it('marks the backdrop as aria-hidden when open', () => {
    const { container } = render(
      <RdsCompAppShell sidebar={<div>Nav</div>} sidebarOpen onSidebarOpenChange={jest.fn()}>
        <div>Content</div>
      </RdsCompAppShell>,
    );
    const backdrop = container.querySelector('.mobile-sidebar-backdrop');
    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    expect(backdrop).toHaveAttribute('tabIndex', '-1');
  });

  it('has no axe accessibility violations when closed', async () => {
    const { container } = render(
      <RdsCompAppShell sidebar={<div>Nav</div>}>
        <div>Content</div>
      </RdsCompAppShell>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
