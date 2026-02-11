import React from "react"
import  RdsSkeleton  from "./rds-skeleton"
import figma from "@figma/code-connect"

figma.connect(
  RdsSkeleton,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1518-15456",
  {
    variant: { "👾 - Animation": "True" },
    props: {
      shape: figma.enum("💠 Shape", {
        "Rectangle (default)": "rectangular",
        "Rounded": "rounded",
        "Circle": "circular"
      }),
      frames: figma.enum("💡 State", {
        "1": 1,
        "2": 2,
        "3": 3
      }),
    },
    example: (props) => (
      <RdsSkeleton
        height={200}
        width={200}
        shape={props.shape}
        frames={props.frames}
        animated={true}
      />
    ),
  },
)

figma.connect(
  RdsSkeleton,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1518-15456",
  {
    variant: { "👾 - Animation": "False" },
    props: {
      shape: figma.enum("💠 Shape", {
        "Rectangle (default)": "rectangular",
        "Rounded": "rounded",
        "Circle": "circular"
      }),
      frames: figma.enum("💡 State", {
        "1": 1,
        "2": 2,
        "3": 3
      }),
    },
    example: (props) => (
      <RdsSkeleton
        height={200}
        width={200}
        shape={props.shape}
        frames={props.frames}
        animated={false}
      />
    ),
  },
)
