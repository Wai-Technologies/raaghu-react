import React from "react"
import figma from "@figma/code-connect"
import RdsBreadcrumb from "./rds-breadcrumb"

figma.connect(
  RdsBreadcrumb,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-Kit?node-id=382-3922",
  {
    props: {
      style: figma.enum("✨ Style", {
        "Without Background": "Without Background",
        "Square Background": "Square Background",
        "Pill Background": "Pill Background",
      }),
      level: figma.enum("📊 Level", {
        "Level 1": "Level 1",
        "Level 2": "Level 2",
        "Level 3": "Level 3",
        "Level 4": "Level 4",
        "Level 5": "Level 5",
      }),
      breadcrumbItems: [
        { label: "Home", href: "/" }
      ],
    },
    example: (props) => <RdsBreadcrumb {...props} />,
  },
)
