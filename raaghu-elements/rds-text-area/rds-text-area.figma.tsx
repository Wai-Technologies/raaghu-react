import React from "react"
import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area"
import figma from "@figma/code-connect"

figma.connect(
  RdsTextArea,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1324-14474",
  {
    props: {
      showTitle: figma.boolean("🆕 Show Title"),
      label: figma.string("✏️ Label"),
      state: figma.enum("💡 State", {
        Default : TextareaState.Default,
        Active : TextareaState.Active,
        Selected : TextareaState.Selected,
        Disabled : TextareaState.Disabled,
        Error : TextareaState.Error
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
