import { useTranslation } from "react-i18next";

export const getTranslatedThemeItems = () => {
  const { t } = useTranslation();

  const themeItems = [
    {
      id: 0,
      label: t("Light"),
      val: "Light",
      iconWidth: "30px",
      iconHeight: "30px",
      iconPath: "/assets/lottie-files/outlined/dual-color/sun.json",
    },
    {
      id: 1,
      label: t("Dark"),
      val: "Dark",
      iconWidth: "30px",
      iconHeight: "30px",
      iconPath: "/assets/lottie-files/outlined/dual-color/moon.json",
    },
    {
      id: 2,
      label: t("Semi Dark"),
      val: "Semi Dark",
      iconWidth: "30px",
      iconHeight: "30px",
      iconPath: "/assets/lottie-files/outlined/dual-color/semi-dark.json",
    },
  ];

  return themeItems;
};

export const formsChildren = [
  {
    key: "5-0",
    label: "View",
    path: "/forms-view/:id",
    permission: "Forms.Form",
  },
];

export const getLabelForPath: any = (path: string, navItems: any) => {
  let label = null;
  for (const navItem of navItems) {
    if (navItem.path === path) {
      return navItem.label;
    }
    if (navItem.children) {
      label = getLabelForPath(path, navItem.children);
      if (label) {
        return label;
      }
    }
  }
  return label;
};