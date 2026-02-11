import React from "react"
import RdsCard from "./rds-card"
import RdsButton from "../rds-button/rds-button"
import figma from "@figma/code-connect"

figma.connect(
  RdsCard,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=573-9434",
  {
    props: {
      showTitle: figma.boolean("🆕 Show Title"),
      showIndicator: figma.boolean("👀 Show Indicator"),
      style: figma.enum("✨ Style", {
        "Default": "default",
        "Outlined": "outlined",
        "Filled": "filled"
      }),
      state: figma.enum("💡 State",  {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected",
        "Disabled": "disabled"
      }),
    },
    example: (props) => (
      <RdsCard {...props}
            cardSubtext="Card Subtitle"
            changeIcon="person"
            description="In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo"
            layout="vertical"
            showDescription
            showIcon
            showSubtext
            title="Card Title"
          >
        <RdsButton
          size="small"
          style="transparent"
          sx={{
            mt: 1,
            p: 0,
            textTransform: 'none'
          }}
          text="Link Button >"
        />
      </RdsCard>
    ),
  },
)
