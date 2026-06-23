import React from "react"
import  RdsDialog  from "./rds-dialog"
import figma from "@figma/code-connect"
import { Typography } from "@mui/material"

figma.connect(
  RdsDialog,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=533-7957",
  {
    props: {
      ShowSecondary: figma.boolean("🔶 Show Secondary"),
      title: figma.string("✏️ Title"),
      ShowPrimary: figma.boolean("🔷 Show Primary"),
      ShowDissmiss: figma.boolean("⛔️ Show Dismiss"),
    },
    example: (props) => <RdsDialog 
    {...props}
   
    open={true} >{<Typography variant="body1">
          This is the dialog content. You can put any content here.
        </Typography>}</RdsDialog>,
  },
)
