import React from "react"
import  RdsBreadcrumbs, { BreadcrumbSeparator }  from "./rds-breadcrumbs"
import figma from "@figma/code-connect"

figma.connect(
  RdsBreadcrumbs,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=382-3922",
  {
    props: {
      layout: figma.enum("✨ Style", {
        "Pill Background": "pill background",
        "Square Background": "square background",
        "Without Background": "without background"
      }),
      level: figma.enum("📊 Level", {
        "Level 1": "level1",
        "Level 2": "level2",
        "Level 3": "level3",
        "Level 4": "level4",
        "Level 5": "level5",
      }),
    },
    example: (props) => (
      <RdsBreadcrumbs
        {...props}
        separator={BreadcrumbSeparator.GreaterThan}
        showIcon={true}
        icon="home"
        state="hover"
        items={[
          {
            href: '/',
            label: 'Home'
          },
          {
            href: '/products',
            label: 'Products'
          },
          {
            href: '/products/category',
            label: 'Category'
          },
          {
            href: '/products/category/subcategory',
            label: 'Subcategory'
          },
          {
            active: true,
            label: 'Current Page'
          }
        ]}
      />
    ),
  },
)
