import React, { useState } from "react"
import  RdsModal  from "./rds-modal"
import figma from "@figma/code-connect"
import RdsButton from "../rds-button/rds-button"
import { Delete } from "@mui/icons-material";

const [open, setOpen] = useState(false);
figma.connect(
  RdsModal,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1982-23802",
  {
    props: {
      showDescription: figma.boolean("Show Description"),
      showIcon: figma.boolean("Show Icon"),
    },
    example: (props) => (
      <>
        <RdsButton
          color="primary"
          layout="text-only"
          onClick={() => {}}
          shape="rectangle"
          size="medium"
          state="default"
          style="filled"
          textCase="uppercase"
        >
          Open Modal
        </RdsButton>
        <RdsModal
          isOpen={true}
          onClose={() => {}}
          title="Default Modal"
          icon={<Delete color="error" sx={{ height: 60, width: 60 }} />}
          {...props}        >
          <span>
            This is a basic modal with default settings. You can put any content here.
          </span>
                  <RdsButton>Cancel</RdsButton>
                  <RdsButton color="primary" textCase="uppercase" layout="text-only"  shape="rectangle"  size="medium"  state="default"  style="filled">Delete</RdsButton>
        </RdsModal>
      </>
    ),
  },
)


