import { create } from "@storybook/theming";
import logoUrl from "./assets/raaghu-logo.svg";
// .storybook/preview.js

import './custom-theme.css'; // Your local styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Styles from node_modules
export default create({
	base: "light",
	brandTitle: "Raaghu",
	brandUrl: "https://raaghu.io",
	brandImage: logoUrl,
	// colorPrimary: '#3A10E5',
	//colorSecondary: '#585C6D',

	// UI
	// appBg: '#ffffff',
	// appContentBg: '#ffffff',
	// appBorderColor: '#585C6D',
	// appBorderRadius: 4,

	// Text colors
	// textColor: '#10162F',
	// textInverseColor: '#ffffff',

	// Toolbar default and active colors
	// barTextColor: '#9E9E9E',
	//barSelectedTextColor:'#AC31E1',
	// barBg: '#ffffff',

	// Form colors
	// inputBg: '#ffffff',
	// inputBorder: '#CED4DA',
	// inputTextColor: '#10162F',
	// inputBorderRadius: 4,

});
