import React from "react"
import  RdsCompToolbar, { ToolbarLayout, ToolbarType }  from "./rds-comp-toolbar"
import figma from "@figma/code-connect"

figma.connect(
  RdsCompToolbar,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=659-5688",
  {
    props: {
      layout:figma.enum("📱 Layout", {
        Primary: ToolbarLayout.Primary,
        Secondary: ToolbarLayout.Secondary,
      }),
      type:figma.enum("⚠️ Type", {
        'Inline Editor': ToolbarType.InlineEditor,
        'Full Featured': ToolbarType.FullFeatured,
        'More Text': ToolbarType.MoreText,
        'More Paragraph': ToolbarType.MoreParagraph,
        'More Rich Content': ToolbarType.MoreRichContent,
        'Misc': ToolbarType.Misc,
      }),
    },
    example: (props) => <RdsCompToolbar {...props} />,
  },
)
