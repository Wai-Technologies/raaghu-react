import React from "react"
import  RdsCheckbox  from "./rds-checkbox"
import figma from "@figma/code-connect"
import { style } from "wavesurfer.js/src/util"

figma.connect(
  RdsCheckbox,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=353-4642",
  {
    props: {
      labeltext: figma.string("📝 - Label Text"),
      showText: figma.boolean("✏️ Show Text"),
      status: figma.enum("❄️ Status", {
        "Unchecked": "unchecked",
        "Checked": "checked",
        "Indeterminate": "indeterminate",
      }),
      state: figma.enum("💡 State", {
        "Default": "default",
        "Hover": "hover",
        "Disabled": "disabled",
      }),
      style: figma.enum("✨ Style", {
        "Square": "square",
        "Circular": "circular",
      }),
    },
    example: (props) => <RdsCheckbox {...props} />,
  },
)
