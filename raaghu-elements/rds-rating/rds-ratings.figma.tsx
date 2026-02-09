import React from "react"
import  RdsRating  from "./rds-rating"
import figma from "@figma/code-connect"

figma.connect(
  RdsRating,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=885-1971",
  {
    props: {
      type: figma.enum("⚠️ Type", {
        "Star": "star",
        "Slider": "slider",
      }),
      styles: figma.enum("✨ Style", {
        "Default": "default",
        "Filled": "filled",
        "Outline": "outlined"
      }),
      level: figma.enum("📊 Level", {
        "0": 0,
        "0.5": 0.5,
        "1": 1,
        "1.5": 1.5,
        "2": 2,
        "2.5": 2.5,
        "3": 3,
        "3.5": 3.5,
        "4": 4,
        "4.5": 4.5,
        "5": 5,
        "Left": "Left",
        "Mid": "Mid",
        "Right": "Right"
      }),

    },
    example: (props) => <RdsRating {...props} />,
  },
)
