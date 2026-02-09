import React from "react"
import  RdsAccordion  from "./rds-accordion"
import RdsTypography from "../rds-typography/rds-typography"
import figma from "@figma/code-connect"

figma.connect(
  RdsAccordion,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=513-2027",
  {
    variant: { "📱 Layout": "Default" },
    props: {
      ShowLeftIcon: figma.boolean("⬅️ Show Left Icon"),
      title: figma.string("✏️ Title"),
      size: figma.enum("📏 Size", { Small: "small", Medium: "medium", Large: "large" }),
      state: figma.enum("💡 State", { Default: "default", Hover: "hover", Selected: "selected" }),
    },
    example: (props) => (
      <RdsAccordion {...props}
       defaultExpanded={false}
      >
        <RdsTypography color="text.secondary">
          Replace with your content component
        </RdsTypography>
      </RdsAccordion>
    ),
  }
)

figma.connect(
  RdsAccordion,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=513-2027",
  {
    variant: { "📱 Layout": "Expanded" },
    props: {
      ShowLeftIcon: figma.boolean("⬅️ Show Left Icon"),
      title: figma.string("✏️ Title"),
      size: figma.enum("📏 Size", { Small: "small", Medium: "medium", Large: "large" }),
      state: figma.enum("💡 State", { Default: "default", Hover: "hover", Selected: "selected" }),
    },
    example: (props) => (
      <RdsAccordion {...props}
       defaultExpanded={true}
       >
        <RdsTypography color="text.secondary">
          Replace with your content component
        </RdsTypography>
      </RdsAccordion>
    ),
  }
)
