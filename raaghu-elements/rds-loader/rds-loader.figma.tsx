import React from "react"
import  RdsLoader  from "./rds-loader"
import figma from "@figma/code-connect"

figma.connect(
  RdsLoader,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=15233-10232",
  {
    props: {
      type: figma.enum("⚠️ Type", {
        "Line Wobble": "loader-line-wobble",
        "Loader Hash": "loader-hash",
        "Loader Jump": "loader-jump",
        "Loader Moving": "loader-moving",
        "Loader Round": "loader-round",
        "Rolling Back": "rolling-rock",
        "Rotate": "loader-rotate",
        "Sand": "loader-sand",
        "Spin": "loader-spin",
        "Triangle": "loader-triangle",
      }),
    },
    example: (props) => <RdsLoader  type={props.type} />,
  },
)
