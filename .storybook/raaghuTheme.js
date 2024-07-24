import { create } from '@storybook/theming/create';
// import logoUrl from "./assets/raaghu_icon.png";
import 'bootstrap/dist/css/bootstrap.min.css'; // Styles from node_modules


export default create({
  base: 'light',
  brandTitle: 'Raaghu',
  brandUrl: "https://raaghu.ai",
  brandImage: logoUrl,
  colorPrimary: '#3A10E5'
});