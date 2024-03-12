import React from "react";
import RdsModal from "./rds-modal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Elements/Modal',
  component: RdsModal,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: [
        "small",
        "large",
        "extra-large",
        "fullscreen",
        "default"
      ],
      control: { type: "select" },
    },
    modalAnimation: {
      options: [
        "modal-fade",
        "modal-fade-scale",
        "modal-fade-rotate",
        "modal-fade-flip",
      ],
      control: { type: "select" },
    }
  },
} satisfies Meta<typeof RdsModal>;

export default meta;
type Story = StoryObj<typeof RdsModal>;

const Template = (args:any) => (
  <RdsModal {...args}>
    <p>
      This is some placeholder content to show the scrolling behavior for
      modals. Instead of repeating the text the modal, we use an inline style
      set a minimum height, thereby extending the length of the overall modal
      and demonstrating the overflow scrolling. When content becomes longer than
      the height of the viewport, scrolling will move the modal as needed.
    </p>
  </RdsModal>
);

const scrollableTemplate = (args:any) => (
  <>
    <RdsModal {...args}>
      <div>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
        <p>
          This is some placeholder content to show the scrolling behavior for
          modals. Instead of repeating the text the modal, we use an inline
          style set a minimum height, thereby extending the length of the
          overall modal and demonstrating the overflow scrolling. When content
          becomes longer than the height of the viewport, scrolling will move
          the modal as needed.
        </p>
      </div>
    </RdsModal>
  </>
);

export const Default: Story = {
  args: {
    modalId: "modal1234",
    modalAnimation: "modal-fade",
    showModalFooter: true,
    showModalHeader: true,
    verticallyCentered: false,
    modalTitle: "Title",
    saveChangesName: "Save Changes",
    cancelButtonName: "Close",
    modalbutton: <button className="btn btn-primary">Default</button>,
    size: "small"
  },
  render: Template
} satisfies Story;

Default.parameters = { controls: { include: ['modalId', 'modalAnimation', 'showModalFooter', 'showModalHeader', 'verticallyCentered', 'modalTitle', 'saveChangesName', 'cancelButtonName', 'modalbutton', 'size'] } };

export const StaticBackdropModal: Story = {
  args: {
    modalId: "modal2",
    modalBackdrop: "static",
    preventEscapeKey: true,
    modalAnimation: "modal-fade",
    showModalFooter: true,
    showModalHeader: true,
    verticallyCentered: true,
    modalTitle: "Title",
    saveChangesName: "Save Changes",
    cancelButtonName: "Close",
    modalbutton: (
      <button className="btn btn-primary">Static Backdrop Modal</button>
    ),
    size: "small"
  },
  render: Template
} satisfies Story;
StaticBackdropModal.parameters = { controls: { include: ['modalId', 'modalAnimation', 'showModalFooter', 'showModalHeader', 'verticallyCentered', 'modalTitle', 'saveChangesName', 'cancelButtonName', 'modalbutton', 'size'] } };


export const ScrollableContentModal: Story = {
  args: {
    modalId: "modal3",
    modalAnimation: "modal-fade",
    showModalFooter: true,
    showModalHeader: true,
    modalTitle: "Title",
    saveChangesName: "Save Changes",
    cancelButtonName: "Close",
    modalbutton: <button className="btn btn-primary">Long Content Modal</button>,
    scrollable: true,
    size: "small"
  },
  render: scrollableTemplate
} satisfies Story;
ScrollableContentModal.parameters = { controls: { include: ['modalId', 'modalAnimation', 'showModalFooter', 'showModalHeader', 'scrollable', 'modalTitle', 'saveChangesName', 'cancelButtonName', 'modalbutton', 'size'] } };


export const VerticallyCentered: Story = {
  args: {
    modalId: "modal4",
    modalAnimation: "modal-fade",
    showModalFooter: true,
    showModalHeader: true,
    verticallyCentered: true,
    modalTitle: "Title",
    saveChangesName: "Save Changes",
    cancelButtonName: "Close",
    modalbutton: (
      <button className="btn btn-primary">Vertically Centered Modal</button>
    ),
    size: "small"
  },
  render: Template
} satisfies Story;
VerticallyCentered.parameters = { controls: { include: ['modalId', 'modalAnimation', 'showModalFooter', 'showModalHeader', 'verticallyCentered', 'modalTitle', 'saveChangesName', 'cancelButtonName', 'modalbutton', 'size'] } };


