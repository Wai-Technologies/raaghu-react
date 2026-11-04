/** Overridable English strings of {@link RdsHeader}. */
export interface RdsHeaderLocaleText {
  menuLabel: string;
  searchPlaceholder: string;
  clearSearchLabel: string;
  accountMenuLabel: (name: string) => string;
}

export const DEFAULT_RDS_HEADER_LOCALE_TEXT: RdsHeaderLocaleText = {
  menuLabel: 'menu',
  searchPlaceholder: 'Search…',
  clearSearchLabel: 'Clear search',
  accountMenuLabel: (name) => `Account menu for ${name}`,
};
