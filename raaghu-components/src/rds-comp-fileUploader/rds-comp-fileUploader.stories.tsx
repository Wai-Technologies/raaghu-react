import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompFileUploader from './rds-comp-fileUploader';


const meta: Meta = {
  title: "Components/File Uploader",
  component: RdsCompFileUploader,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **File Uploader** component is a versatile and customizable UI element designed to handle file upload functionality within your application. It provides a seamless interface for users to upload files, with support for features such as drag-and-drop, file type validation, and progress tracking. This component is ideal for forms, file management systems, or any interface requiring efficient and user-friendly file upload capabilities. Fully customizable, the File Uploader component ensures a consistent user experience while aligning with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompFileUploader>;

export default meta;
type Story = StoryObj<typeof RdsCompFileUploader>;

export const Standard: Story = {
  args: {

  }
} satisfies Story;




