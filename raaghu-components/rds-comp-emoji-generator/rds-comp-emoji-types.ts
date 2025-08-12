// Shared types/enums for RdsEmojiGenerator to avoid circular import issues

export enum EmojiGeneratorType {
  Default = "Default",
  QuickReactions = "Quick Reactions",
}

export enum EmojiCategory {
  SmileysAndPeople = "SmileysAndPeople",
  AnimalsAndNature = "AnimalsAndNature", 
  FoodAndDrink = "FoodAndDrink",
  TravelAndPlaces = "TravelAndPlaces",
  Activities = "Activities",
  Objects = "Objects",
  Symbols = "Symbols",
  Flags = "Flags",
}

export enum SkinToneState {
  Default = "Default",
  Expanded = "Expanded",
}
