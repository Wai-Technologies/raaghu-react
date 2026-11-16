export interface RdsAppBarLocaleText {
  menuLabel: string;
  searchPlaceholder: string;
  clearSearchLabel: string;
  openOverflowMenuLabel: string;
  closeLabel: string;
  accountMenuLabel: (name: string) => string;
  myProfile: string;
  logout: string;
}

export const DEFAULT_RDS_APP_BAR_LOCALE_TEXT: RdsAppBarLocaleText = {
  menuLabel: 'menu',
  searchPlaceholder: 'Search…',
  clearSearchLabel: 'Clear search',
  openOverflowMenuLabel: 'open overflow menu',
  closeLabel: 'close',
  accountMenuLabel: (name) => `Account menu for ${name}`,
  myProfile: 'My Profile',
  logout: 'Logout',
};
