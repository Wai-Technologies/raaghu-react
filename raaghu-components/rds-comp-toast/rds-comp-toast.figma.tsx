import React from "react"
import  RdsCompToast from "./rds-comp-toast"
import { ToastLayout, ToastLeadingIcon, ToastState } from "./rds-comp-toast.types"
import figma from "@figma/code-connect"

figma.connect(
  RdsCompToast,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=925-3543",
  {
    props: {
      chatTime: figma.string("⏳ Timestamp"),
      showHeader: figma.boolean("📝 - Show Header"),
      showDismiss: figma.boolean("⛔️ - Show Dismiss"),
      showSubText: figma.boolean("🔤 - Show Subtext"),
      layout: figma.enum("📱 Layout", {
        Text: ToastLayout.Text,
        Download: ToastLayout.Download,
        Chat: ToastLayout.Chat,
        Request: ToastLayout.Request,
      }),
      state: figma.enum("💡 State", {
        Basic: ToastState.Basic,
        Success: ToastState.Success,
        Error: ToastState.Error,
        Info: ToastState.Info,
      }),
    },
    example: (props) => {
      const toastProps = {
        borderColor: "primary",
        progressWidth: 40,
        filename: "Filename.txt",
        headerText: "Toast Headline",
        placeholder: "Placeholder Text",
        subText: "This is a big sample placeholder text.",
        showLeading: true,
        leadingIcon: ToastLeadingIcon.Circle,
        ...props,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      return <RdsCompToast {...toastProps} />;
    },
  },
)
