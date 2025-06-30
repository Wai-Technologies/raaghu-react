import type { Meta, StoryObj } from '@storybook/react';
import RdsCompRegister from './rds-comp-register';


const meta: Meta = { 
    title: "Components/Register",
    component: RdsCompRegister,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Register** component is a flexible and customizable UI element designed to facilitate user registration workflows within your application. It provides an intuitive interface for collecting essential user information such as name, email, password, and other required details. This component is ideal for onboarding new users, membership systems, or any application requiring a streamlined and user-friendly registration process. Fully customizable, the Register component integrates seamlessly with your design system, ensuring consistency and an enhanced user experience.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompRegister>;

export default meta;
type Story = StoryObj<typeof RdsCompRegister>;

export const Standard: Story = {
    args: {
        register: "default",
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['error', 'getvalidTenantName', 'emailAddress', 'password', 'userName', 'appName', 'onDismissAlert', 'onLogin', 'onRegister', 'currentTenant', 'validTenant', 'onSaveHandler', 'languageData', 'onClickHandler', 'languageLabel', 'registerFields'] } };

export const Member: Story = {
  args: {
        register: "member",
  }
} satisfies Story;
Member.parameters = { controls: { include: ['registerMemberData', 'isEmailFieldVisible', 'onRegisterMemberSaveHandler'] } };
