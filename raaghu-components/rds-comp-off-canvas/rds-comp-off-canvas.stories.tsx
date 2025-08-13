
import React from "react";
import RdsCompOffCanvas, { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "./rds-comp-off-canvas";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Offcanvas',
    component: RdsCompOffCanvas,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The **Offcanvas** element is a customizable slide-out panel used to display additional content, navigation, or actions without leaving the current page. It supports multiple placements (`top`, `bottom`, `end`, `start`), backdrop options (`true`, `false`, `static`), and adjustable width. The offcanvas can include a title, scrolling content, and up to three configurable action buttons (primary, secondary, tertiary). Flexible props allow you to tailor its appearance and behavior, making it ideal for side menus, forms, notifications, or any scenario where you want to present extra information in a non-intrusive way. This element is easy to integrate and fully customizable to fit your design system needs.'
            },
            source: {
                transform: (code: string) => {
                    code = code.replace(/placement="([^"]+)"/g, (match, p1) => `placement={RdsOffcanvasPlacement.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/placement:\s*"([^"]+)"/g, (match, p1) => `placement: RdsOffcanvasPlacement.${p1.replace(/\s+/g, '')}`);
                    code = code.replace(/backDrop="([^"]+)"/g, (match, p1) => `backDrop={RdsOffcanvasBackDrop.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/backDrop:\s*"([^"]+)"/g, (match, p1) => `backDrop: RdsOffcanvasBackDrop.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        placement: {
            options: ["top", "bottom", "end", "start"],
            control: { type: "select" },
        },
        backDrop: {
            options: ["true", "false", "static"],
            control: { type: "select" },
        },
        showPrimaryButton: { control: 'boolean' },
        showSecondaryButton: { control: 'boolean' },
        showTertiaryButton: { control: 'boolean' },
    },

} satisfies Meta<typeof RdsCompOffCanvas>;

export default meta;
type Story = StoryObj<typeof RdsCompOffCanvas>;

export const Standard: Story = {
    args: {
        offId: "canvasExample",
        canvasTitle: "NEW TENENT",
        scrolling: false,
        placement: RdsOffcanvasPlacement.End,
        backDrop: RdsOffcanvasBackDrop.Static,
        offcanvaswidth: 650,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showTertiaryButton: true,
        children: (
            <>
                <div className="d-flex flex-column h-100">
                    <h5 className="p-3">
                        Hello Offcanvas Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h5>
                </div>
            </>
        ),
        offcanvasbutton: (
            <RdsButton
                label="Button"
                color="primary"
                type="button"
                inputSize="medium"
            />
        ),
    },
};
Standard.parameters = { controls: { include: ['showPrimaryButton', 'showSecondaryButton', 'showTertiaryButton'] } };