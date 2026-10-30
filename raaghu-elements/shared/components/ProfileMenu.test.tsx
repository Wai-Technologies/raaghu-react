import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenu from './ProfileMenu';

jest.mock('../styles/rds-profile-menu.scss', () => ({}));

describe('ProfileMenu audit fixes', () => {
  it('G2-402/407: trigger is labelled with the user name and the menu header is presentational', () => {
    render(
      <ProfileMenu
        name="Jane Doe"
        email="jane@example.com"
        items={[{ label: 'Logout', onClick: () => undefined }]}
      />
    );
    const trigger = screen.getByRole('button', { name: 'Account menu for Jane Doe' });
    fireEvent.click(trigger);
    const header = document.querySelector('.rds-profile-menu__header');
    expect(header).toHaveAttribute('role', 'presentation');
    expect(screen.getAllByRole('menuitem').length).toBeGreaterThan(0);
  });

  it('renders the default menu items and designation when none are provided', () => {
    render(<ProfileMenu name="Jane Doe" email="jane@example.com" />);
    expect(screen.getByText('Developer')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Account menu for Jane Doe' }));
    expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual([
      'My Profile',
      'Theme',
      'Setting',
      'Help',
      'Logout',
    ]);
  });
});
