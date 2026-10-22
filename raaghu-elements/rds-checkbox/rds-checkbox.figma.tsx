import React from "react"
import  RdsCheckbox  from "./rds-checkbox"
import figma from "@figma/code-connect"

figma.connect(
  RdsCheckbox,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=353-4642",
  {
    props: {
      label: figma.string("📝 - Label Text"),
      showText: figma.boolean("✏️ Show Text"),
      status: figma.enum("❄️ Status", {
        "Unchecked": "unchecked",
        "Checked": "checked",
        "Indeterminate": "indeterminate",
      }),
      disabled: figma.boolean("💡 Disabled"),
      style: figma.enum("✨ Style", {
        "Square": "square",
        "Circular": "circular",
      }),
    },
    example: (props) => <RdsCheckbox {...props} />,
  },
)
