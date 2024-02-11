declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}