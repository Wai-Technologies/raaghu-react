
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompDeveloperMode from './rds-comp-developer-mode';


const meta: Meta = { 
  title: "Components/Developer Mode",
    component: RdsCompDeveloperMode,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Developer Mode** component is a customizable UI element designed to facilitate the configuration and management of developer-related settings within your application. It supports a `grantType` array to define available authorization grant types, such as `Authorization Code`, `Hybrid`, `Implicit`, and `Password`, each with properties like `option` (display name) and `value` (identifier). This component is ideal for administrative dashboards, API management systems, or any interface requiring structured and user-friendly developer configuration options. Fully customizable, the Developer Mode component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDeveloperMode>;

export default meta;
type Story = StoryObj<typeof RdsCompDeveloperMode>;

export const Default: Story = {
    args: {
      grantType
         : [
            {
               option: 'Authorization Code',
               value: 'authorization-code'
            },
            {
               option: 'Hybrid',
               value: 'hybrid'
            },
            {
               option: 'Implicit',
               value: 'implicit'
            },
            {
               option: 'Password',
               value: 'password'
            }
         ],
    }
} satisfies Story;
