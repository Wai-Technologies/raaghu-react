import React from "react"
import RdsEmojiGenerator, { EmojiCategory, EmojiGeneratorType, SkinToneState } from "./rds-comp-emoji-generator"
import figma from "@figma/code-connect"

figma.connect(
  RdsEmojiGenerator,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=9141-36081",
  {
    props: {
      Type: figma.enum("Type", {
        "Default": EmojiGeneratorType.Default,
        "Quick Reactions": EmojiGeneratorType.QuickReactions,
      }),
    },
    example: (props) => (
      <RdsEmojiGenerator
        {...props}
        maxEmojis={100}
      />
    ),
  },
)
