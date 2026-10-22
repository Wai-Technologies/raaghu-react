import React from "react"
import RdsInput from "./rds-input"
import figma from "@figma/code-connect"
import { Info } from "@mui/icons-material"

figma.connect(
  RdsInput,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1290-3640",
  {
    props: {
      required: figma.boolean("❗ Is Mandatory"),
      label: figma.string("✏️ Label"),
      helperText: figma.string("✍ Hint Text"),
      placeholder: figma.string("📝 Placeholder - Text"),
      endIcon: figma.boolean("👀 - Show Icon", { true: <Info />, false: undefined }),
      layout: figma.enum("📱 Layout", {
        "Text": "text",
        "Password": "password",
        "Phone Number": "phone number",
        "Card Number": "card number"
      }),
      size: figma.enum("📏 Size", {
        "Small": "small",
        "Medium": "medium"
      }),
      shape: figma.enum("✨ Style", {
        "Default": "default",
        "Pill": "pill",
        "Bottom Outline": "bottom outline"
      }),
      state: figma.enum("💡 State",  {
        "Default": "default",
        "Active": "active",
        "Selected": "selected",
        "Error": "error",
        "Disabled": "disabled"
      }),
    },
      example: (props) => <RdsInput
      labelPlacement="top" {...props} />,
  },
)
