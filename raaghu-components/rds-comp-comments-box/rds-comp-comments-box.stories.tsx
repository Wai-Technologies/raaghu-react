
import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCommentBox from "./rds-comp-comments-box";

const meta: Meta<typeof RdsCommentBox> = {
  title: "Components/Comment Box",
  component: RdsCommentBox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      options: [
        "default",
        "selected",
        "typing",
        "commentPosted",
        "commentHover",
        "commentThread",
      ],
      control: { type: "select" },
      description: "State of the comment box",
      defaultValue: "default",
    },
    // Add more props here if needed, e.g. placeholder, avatar, etc.
  },
};

export default meta;
type Story = StoryObj<typeof RdsCommentBox>;

export const Default: Story = {
  args: {
    state: "default",
  },
};
Default.parameters = { controls: { include: ["state"] } };