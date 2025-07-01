import RdsFileUploader, { FileUploaderState, FileUploaderStyle, Size } from "./rds-file-uploader";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Elements/File Uploader",
  component: RdsFileUploader,
  parameters: {
    layout: "padded",
    docs: {
       description: {
        component:
            'The **File Uploader** element is a flexible and customizable component for uploading files within your application. It supports multiple styles (`Basic`, `Drop Area Side Icon`, `Drop Area Top Icon`, `Drop Area With Upload Button`), and states (`Default`, `Selected`). Users can upload single or multiple files, set file type and size restrictions, and display optional thumbnails or placeholder images. The component can show a title, hint text, and mark the upload as mandatory. Flexible props allow you to tailor its appearance and behavior, making it ideal for forms, profile uploads, document management, and any interface where file selection and upload are required.'
    },
      source:{
        transform: (code: string) => {
          // Transform style enum - remove spaces and transform
          code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={FileUploaderStyle.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: FileUploaderStyle.${p1.replace(/\s+/g, "")}`);
          // Transform state enum - remove spaces and transform
          code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={FileUploaderState.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: FileUploaderState.${p1.replace(/\s+/g, "")}`);
          // Transform HintPosition prop - remove spaces and transform
          code = code.replace(/hintPosition="([^"]+)"/g, (match, p1) => `hintPosition={HintPosition.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/hintPosition:\s*"([^"]+)"/g, (match, p1) => `hintPosition: HintPosition.${p1.replace(/\s+/g, "")}`);
          // Transform size prop - remove spaces and transform
          code = code.replace(/size="([^"]+)"/g, (match, p1) => `size={Size.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/size:\s*"([^"]+)"/g, (match, p1) => `size: Size.${p1.replace(/\s+/g, "")}`);
          return code;
        },
      }
      }
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

export const Advanced: Story = {
  args: {
    colorVariant: "primary",
    extensions: "png, jpg, doc, pdf, ppt",
    fileSizeLimitInMb: 5,
    style: FileUploaderStyle.DropAreaSideIcon,   
    multiple: true,
    size: Size.Large,      
    footerButtons: true,
    validation: [{
      hint: 'File size exceeds the limit',
      isError: false
    }],   
  }
} satisfies Story;
Advanced.parameters = {
  controls: {
    include: [
      "onClick",
      "preFileInfo",
      "onSaveHandler",
      "reset",
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
