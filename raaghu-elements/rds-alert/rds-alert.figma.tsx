import React from "react"
import  RdsAlert  from "./rds-alert"
import figma from "@figma/code-connect"
import { style } from "wavesurfer.js/src/util"

figma.connect(
  RdsAlert,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=611-982",
  {
    props: {
      title: figma.string("✏️ Title"),
      description: figma.string("✍ Description Line 1"),
      showPrimary: figma.boolean("🔷 - Show Primary"),
      showSecondary: figma.boolean("🔶 - Show Secondary"),
      showButtons: figma.boolean("🕹️ - Show Buttons"),
      showTitle: figma.boolean("🆕 Show Title"),
      showLink: figma.boolean("🔗 - Show Link"),
      showDescription: figma.boolean("〰 - Show Description"),
      showIcon: figma.boolean("👀 - Show Icon"),
      size: figma.enum("Size", {
        "Small": "small",
        "Medium": "medium",
        "Large": "large"
      }),
      variantStyle: figma.enum("✨ Style", {
        "Style 1": "style1",
        "Style 2": "style2",
        "Style 3": "style3"
      }),
      type: figma.enum("⚠️ Type", {
        "Info": "info",
        "Success": "success",
        "Warning": "warning",
        "Error": "error"
      }),
      multiline: figma.boolean("☰ Multiline"),
    },
    example: (props) => <RdsAlert {...props} />,
  },
)
