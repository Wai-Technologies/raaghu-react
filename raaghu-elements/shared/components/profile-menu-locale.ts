export interface ProfileMenuLocaleText {
  accountMenuLabel: (name: string) => string;
  myProfile: string;
  theme: string;
  setting: string;
  help: string;
  logout: string;
}

export const DEFAULT_PROFILE_MENU_LOCALE_TEXT: ProfileMenuLocaleText = {
  accountMenuLabel: (name) => `Account menu for ${name}`,
  myProfile: 'My Profile',
  theme: 'Theme',
  setting: 'Setting',
  help: 'Help',
  logout: 'Logout',
};
