import * as menus from "../../../libs/main-menu/index";

const objectArray = Object.entries(menus);
const index = objectArray.findIndex(([key]) => key === "MainMenu");

if (index !== -1) {
  objectArray.splice(0, 0, objectArray.splice(index, 1)[0]);
}

let newobjectArray = objectArray.map((item) => {
  return item[1];
});

const concatenated = newobjectArray.reduce(
  (acc: any, arr: any) => acc.concat(arr),
  []
);

const sideNavItems = concatenated;

export default sideNavItems;