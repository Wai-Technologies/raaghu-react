import React from "react"
import  RdsCompLayout  from "./rds-comp-layout"
import figma from "@figma/code-connect"

figma.connect(
  RdsCompLayout,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=2799-7589",
  {
    props: {
      displayType:figma.enum("💡 State",{
        "Basic":"Basic",
        'Board':'Board',
        'Boxify':'Boxify',
        'Cardify':'Cardify',
        'Collage':'Collage',
        'Gridify':'Gridify',
        'Highlight':'Highlight',
        'Matrix':'Matrix',
        'Mosaic':'Mosaic',
        'Nexus':'Nexus',
        'Pinboard':'Pinboard',
        'Sections':'Sections',
        'Snapshots':'Snapshots',
        'Splitz':'Splitz',
        'Spotlight':'Spotlight',
        'Stacks':'Stacks',
        'Dashboard':'Dashboard',
        'Relaxed':'Relaxed'

      }),
    },
    example: (props) => <RdsCompLayout mode="standard" {...props} />,
  },
)
