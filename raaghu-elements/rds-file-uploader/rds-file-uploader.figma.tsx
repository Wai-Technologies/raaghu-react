import React from "react"
import  RdsFileUploader  from "./rds-file-uploader"
import figma from "@figma/code-connect"


figma.connect(
  RdsFileUploader,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=484-5419",
  {
    props: {
      showTitle: figma.boolean("🆕 Show Title"),
      showHint: figma.boolean("💬 Show Hint"),
      isMandatory: figma.boolean("❗ Is Mandatory"),
      title: figma.string("✏️ Title"),
      style: figma.enum("✨ Style", {
        "Drop Area - Side Icon": "Drop Area - Side Icon",
        "Drop Area - Top Icon": "Drop Area - Top Icon",
        "Drop Area - With Upload Button": "Drop Area - With Upload Button",
      }),
      state:figma.enum("💡 State",{
        "Default": "default",
        "Selected": "selected",
      }),
    },
    example: (props) => <RdsFileUploader 
    {...props}
    accept=".png,.jpg,.jpeg,.doc,.pdf,.ppt"
    dragAndDrop
    maxFiles={5}
    multiple
    maxSize={10485760}
    showPreview
    hintText="Maximum 5MB"
    mode="default"
    />,
  },
)


figma.connect(
  RdsFileUploader,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=484-5419",
  {
    variant: { "✨ Style": "Basic" },
    props: {
      showTitle: figma.boolean("🆕 Show Title"),
      showHint: figma.boolean("💬 Show Hint"),
      isMandatory: figma.boolean("❗ Is Mandatory"),
      title: figma.string("✏️ Title"),
      state:figma.enum("💡 State",{
        "Default": "default",
        "Selected": "selected",
      }),
    },
    example: (props) => <RdsFileUploader 
    {...props}
    accept=".png,.jpg,.jpeg,.doc,.pdf,.ppt"
    dragAndDrop
    maxFiles={5}
    multiple
    maxSize={10485760}
    showPreview
    hintText="Maximum 5MB"
    mode="standard"
    />,
  },
)