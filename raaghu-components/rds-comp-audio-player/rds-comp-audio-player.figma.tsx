import React from "react"
import  RdsCompAudioPlayer  from "./rds-comp-audio-player"
import figma from "@figma/code-connect"

figma.connect(
  RdsCompAudioPlayer,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=19511-54926",
  {
    props: {
      showSettings: figma.boolean("Show Settings"),
      showTranscript: figma.boolean("Show Transcript"),
      showExport: figma.boolean("Show Export"),
      showMoreOptions: figma.boolean("Show More Options"),
      type:figma.enum("Type",{
        "Audio Editor" :"Audio Edition" ,
        "Audio Player" : "Audio Player",
        "Collapsed" :"Collapsed"
      })
    },
    example: (props) => <RdsCompAudioPlayer 
    {...props}
    src={""} 
     />,
  },
)
