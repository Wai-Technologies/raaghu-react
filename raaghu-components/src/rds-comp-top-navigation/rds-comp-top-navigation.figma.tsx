import React from "react";
import figma from "@figma/code-connect";
import RdsCompTopNavigation from "./rds-comp-top-navigation";

figma.connect(
  RdsCompTopNavigation,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-Kit?node-id=975-7912",
  {
    props: {
      showSearch: figma.boolean("🔍 - Show Search"),
      showLogo: figma.boolean("👀 - Show Logo"),
      style: figma.enum("✨ Style", {
        ABP: "abp",
        "Raaghu Portal": "raaghu-portal",
        "Ecommerce 1": "ecommerce-1",
        "Ecommerce 2": "ecommerce-2",
        "Ecommerce 3": "ecommerce-3",
        "Ecommerce 4": "ecommerce-4",
        "Product 1": "product-1",
        "Product 2": "product-2",
        "Product 3": "product-3",
        "Product 4": "product-4",
        "Entertainment 1": "entertainment-1",
        "Entertainment 2": "entertainment-2",
        "Entertainment 3": "entertainment-3",
        "Entertainment 4": "entertainment-4",
        "Professional 1": "professional-1",
        "Professional 2": "professional-2",
        "Professional 3": "professional-3",
        "Professional 4": "professional-4",
        "Professional 5": "professional-5",
        "App Shell 3": "app-shell-3",
        Default: "default",
      }),
    },
    example: (props) => (
      <RdsCompTopNavigation
        {...props}
        themeItems={[]} 
        toggleItems={[]} 
        elementList={[]} 
        componentsList={[]} 
        languageLabel={""} 
        themeLabel={""} 
        onForgotPassword={() => {}} 
        onProfileLinkTopNav={() => {}} 
      />
    ),
  }
);
