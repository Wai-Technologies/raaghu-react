import React from "react"
import RdsTextArea, { TextareaStyle } from "./rds-text-area"
import figma from "@figma/code-connect"

figma.connect(
  RdsTextArea,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1324-14474",
  {
    props: {
      label: figma.boolean("🆕 Show Title", {
        true: figma.string("✏️ Label"),
        false: undefined,
      }),
      disabled: figma.enum("💡 State", {
        Default: false,
        Active: false,
        Selected: false,
        Disabled: true,
        Error: false,
      }),
      error: figma.enum("💡 State", {
        Default: false,
        Active: false,
        Selected: false,
        Disabled: false,
        Error: true,
      }),
      style: figma.enum("✨ Style", {
        Default : TextareaStyle.Default,
        Pill : TextareaStyle.Pill,
        "Bottom Outline" : TextareaStyle.BottomOutline
      }),
    },
    example: (props) => <RdsTextArea {...props} isMandatory placeholder = "Enter Description" />,
  },
)
