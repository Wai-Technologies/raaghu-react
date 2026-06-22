export interface Item {
  name: string;
  username?: string;
  date?: Date;
  feedIcon?: string;
  imageUrl?: string;
  description?: string;
  hashtags?: string;
  reviews?: string;
  rating?: number;
  likes?: number;
  dislikes?: number;
}

export enum VariantType {
  Default = "Default",
}

export enum RevieweStyle {
  Style1 = "style1",
  Style2 = "style2",
  Style3 = "style3",
  Style4 = "style4",
  Style5 = "style5",
  Style6 = "style6",
  Style7 = "style7",
  Style8 = "style8",
  Style9 = "style9",
  Style10 = "style10",
  Style11 = "style11",
  Style12 = "style12",
  Style13 = "style13",
}
