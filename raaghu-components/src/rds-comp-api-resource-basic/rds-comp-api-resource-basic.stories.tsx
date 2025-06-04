import type { Meta, StoryObj } from "@storybook/react";
import RdsCompApiResourceBasic from "./rds-comp-api-resource-basic";

const meta: Meta = {
  title: "Components/Api",
  component: RdsCompApiResourceBasic,
  parameters: {
    layout: "padded",
    docs: {
    description: {
        component: 
            'The **Api Resource Basic** component is a customizable UI element designed to manage and configure basic settings for API resources within your application. It supports features such as an `apiResourceBasic` object to define resource details and a `reset` toggle to clear the form or reset configurations. Additionally, the component provides an `onSaveHandler` function to handle the saving of resource data, ensuring seamless integration with backend systems. Ideal for administrative interfaces or API management dashboards, the Api Resource Basic component simplifies the process of managing API resources while maintaining consistency with your design system. Fully customizable, it can be tailored to meet your application’s functional and branding requirements.'
    },
}
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompApiResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompApiResourceBasic>;

export const ResourceBasic: Story = {
  args: {
    apiType:"resourceBasic",
  },
} satisfies Story;
ResourceBasic.parameters = { controls: { include: ["apiResourceBasic", "reset", "onSaveHandler"] } };

export const ScopeBasicResource: Story = {
    args: {
      apiType:"scopeBasicResource",
    }
} satisfies Story;
ScopeBasicResource.parameters = { controls: { include: ["scopeData", "onSuccess", "reset"] } };
