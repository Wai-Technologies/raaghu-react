import React from "react";
import RdsSelectPlan from "./rds-select-plan";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Select Plan',
    component: RdsSelectPlan,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsSelectPlan>;

export default meta;
type Story = StoryObj<typeof RdsSelectPlan>;


export const Default: Story = {
    args: {
      cardInfo: [
        {
          displayName: "Design System",
          buttonName: "Getting Started",
          planImg: ".storybook/assets/team.svg",
          includedDeveloperCount: "",
          developerLicense: "Included developer licenses",
          additionalDevLicense: "Additional developer license",
          projectCountImg: ".storybook/assets/project-count.svg",
          projectCount: "0",
          designKit: "Adobe XD design Kit ( Element, components,Pages)",
          iconLibrary: "Static Icon Library (.ai and .svg format)",
          projectTemp: "Project template",
          storybook: "Storybook",
          builtinThemes: "Built-in themes (Light, Dark, Semi-dark)",
          cliGenerator: "Raaghu CLI generator",
          completeSourceCode: "Design System Source Code",
          upgrade: "1 year upgrade",
          PerpetualLicense: "Perpetual license",
          forumSupport: "1 year premium forum support",
          codeExtension: "VS Code extension",
          forumSupportCount: "NA",
          forumSupportIncidentCount: "Forum support incident count/year",
          privateTicketInclude: "Private ticket & email support",
          rightCheckImg: ".storybook/assets/tick.svg",
          closeImg: ".storybook/assets/close-tick.svg",
          tooltipsInfo: {
            licenseInfo:
              "The licence price includes a certain number of developer seats. if you have more developers, you can always purchase additional seats",
            devlicenseInfo:
              "You can purchase more developer licenses now or in the future. Licenses are seat-based, so you can transfer a seat from one developer to another",
            projectCountInfo:
              "You can develop an unlimited count of different products with your license",
            designInfo:
              "Includes XD files for application specific elements, components, pages including dashboards",
            libraryInfo:
              "Includes .ai icon illustrator file and icon svg's in Adobe XD",
            projectTempInfo:
              "This contains ready to use built-in application pages, dashboard for host and tenant admin with all pre-built modules",
            storybookInfo:
              "Complete functional UI library for elements, components, charts",
            themesInfo: "Built-in themes tested for accessibility",
            cliInfo:
              "Simplify process of building command-line tools through a framework or template which developers can use to quickly generate necessary code, commands, and user interactions",
            sourceInfo:
              "You can download source code for all themes, icons, elements & components",
            upgradeInfo:
              "You can update the modules, themes and tools to the latest version within your active license period. After your license expires, you need to renew it to continue to get updates for bug fixes, new features and enhancements",
            prepetualInfo:
              "Licenses are for a lifetime. That means you can continue to develop your application forever. Accessing to the latest version and getting support are granted within the license period (1 year unless you renew it).",
            forumSupportInfo:
              "You can get the premium support for one year (you can renew your license to extend it)",
            codeExtensionInfo:
              "You can develop an unlimited count of different products with your license",
            incedentCountInfo:
              "Team and Business licenses have incident/question count limit. If you buy additional developer licenses, your incident limit increases by 5 (for the Team License) or 10 (for the Business License) per developer.",
            emailSupportInfo:
              "Only Enterprise License includes private support. You can send e-mail directly to the Raaghu Team or ask questions on support.raaghu.io with a private ticket option. The private tickets are not visible to the public",
          },
          isSubscription: true,
        },
      ]
    },
};

