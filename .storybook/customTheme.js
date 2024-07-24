import { create } from "@storybook/theming";
import './custom-theme.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
export default create({
	base: "light",
	brandTitle: "Raaghu Design System",
	brandUrl: "https://react.raaghu.ai",
	brandImage: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
});
