import RdsFileUploader, { FileUploaderState, FileUploaderStyle } from "./rds-file-uploader";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Elements/File Uploader",
  component: RdsFileUploader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      options: ["Default", "Selected"],
      control: { type: "select" },
    },
    style: {
      options: [
        "Basic",
        "Drop_Area_Side_Icon",
        "Drop_Area_Top_Icon",
        "Drop_Area_With_Upload_Button",
      ],
      control: { type: "select" },
    },
    title: {
      control: { type: "text" },
    },
    isMandatory: {
      control: { type: "boolean" },
    },
    showTitle: {
      control: { type: "boolean" },
    },
    showHint: {
      control: { type: "boolean" },
    },
    hintText: {
      control: { type: "text" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    placeholderImage: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof RdsFileUploader>;

export default meta;
type Story = StoryObj<typeof RdsFileUploader>;

export const Default: Story = {
  args: {
    state: FileUploaderState.Default,
    style: FileUploaderStyle.Basic,
    extensions: "png, jpg, doc, pdf, ppt",
    fileSizeLimitInMb: 5,
    title: "Title",
    multiple: true,
    isMandatory: true,
    showThumbnail: true,
    showTitle: true,
    showHint: true,
    hintText: "Maximum 5MB",
    placeholderImage: "man-in-fashion-suit-template-for-web-vector.jpg",
  },
} satisfies Story;

Default.parameters = {
  controls: {
    include: [
      "state",
      "style",
      "title",
      "isMandatory",
      "showTitle",
      "showHint",
      "multiple",
      "showThumbnail",
      "hintText",
      "placeholderImage",
    ],
  },
};

// : Story = {
//     args: {
//         Drop_Area_Top_Icon: true,
//         multiple: true,
//         extensions: "png, jpg, doc, pdf, ppt",
//         fileSizeLimitInMb: 5,
//         validation: [
//             { isError: false, hint: "File size exceeds the limit" }
//         ],
//         title: "Title",
//         isRequired: true,
//         showTitle: false,
//         showHint: true,
//         hintText: "File size should be less than given file size limit",
//     }
// } satisfies Story;
// Drop_Area_Top_Icon.parameters = { controls: { include: ['multiple','extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText'] } };

// export const Drop_Area_Side_Icon
// : Story = {
//     args: {
//         Drop_Area_Side_Icon: true,
//         multiple: true,
//         extensions: "png, jpg, doc, pdf, ppt",
//         fileSizeLimitInMb: 5,
//         showThumbnail: false,
//         validation: [
//             { isError: false, hint: "File size exceeds the limit" }
//         ],
//         title: "Title",
//         isRequired: true,
//         showTitle: true,
//         showHint: true,
//
//         hintText: "File size should be less than given file size limit",
//         hintPosition: "left"
//     }
// } satisfies Story;
// Drop_Area_Side_Icon.parameters = { controls: { include: ['multiple','showThumbnail', 'extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText','hintPosition'] } };

// export const Drop_Area_With_Upload_Button
// : Story = {
//     args: {
//         Drop_Area_With_Upload_Button : true,
//         multiple: true,
//         extensions: "png, jpg, doc, pdf, ppt",
//         fileSizeLimitInMb: 5,
//         validation: [
//             { isError: false, hint: "File size exceeds the limit" }
//         ],
//         title: "Title",
//         isRequired: true,
//         showTitle: true,
//         showHint: true,
//         hintText: "File size should be less than given file size limit",
//     }
// } satisfies Story;
// Drop_Area_With_Upload_Button.parameters = { controls: { include: ['extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText'] } };

// export const Drop_Area_With_Icon
// : Story = {
//     args: {
//         Drop_Area_With_Icon: true,
//         extensions: "jpg, png, gif",
//         fileSizeLimitInMb: 5,
//         validation: [
//             { isError: false, hint: "File size exceeds the limit" }
//         ],
//         iconName:"edit",
//         profilePic:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
//     }
// } satisfies Story;
// Drop_Area_With_Icon.parameters = { controls: { include: ['profilePic', 'iconName', 'extensions', 'fileSizeLimitInMb'] } };
