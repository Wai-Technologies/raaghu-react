import React from "react"
import figma from "@figma/code-connect"
import RdsInput from "./rds-input"

figma.connect(
  RdsInput,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-Kit?node-id=1290-3640",
  {
    props: {
      placeholderCardNumber: figma.string("🚧 Placeholder - Card Number"),
      placeholderNumber: figma.string("🚧 Placeholder - Number"),
      placeholderPhoneNumber: figma.string("🚧 Placeholder - Phone Number"),
      placeholderPassword: figma.string("🚧 Placeholder- Password"),
      placeholderText: figma.string("📝 Placeholder - Text"),
      cardNumber: figma.string("💳 Card Number"),
      hintText: figma.string("✍ Hint Text"),
      showIcon: figma.boolean("👀 - Show Icon"),
      showTitle: figma.boolean("🆕 Show Title"),
      label: figma.string("✏️ Label"),
     // number: figma.string("🔢 Number"), // ✅ Fixed: Removed the leading space
      password: figma.string("🔑 Password"),
      showSubtext: figma.boolean("🔤 - Show Subtext"),
      changeIcon: figma.instance("🔃 Change Icon"),
      phoneNumber: figma.string("☎️ - Phone Number"),
      isMandatory: figma.boolean("❗ Is Mandatory"),
      size: figma.enum("📏 Size", {
        Default: "default",
        Small: "small",
        Large: "large",
      }),
      layout: figma.enum("📱 Layout", {
        Text: "text",
        Password: "password",
        "Phone Number": "phone-number",
        Number: "number",
        "Card Number": "card-number",
      }),
      state: figma.enum("💡 State", {
        Default: "default",
        Active: "active",
        Selected: "selected",
        Error: "error",
        Disabled: "disabled",
      }),
      style: figma.enum("✨ Style", {
        Default: "default",
        "Bottom Outline": "bottom-outline",
        Pill: "pill",
      }),
    },
    example: (props) => <RdsInput {...props} />,
  },
)
