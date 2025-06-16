import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompLayout from "./rds-comp-layout";
import RdsCompLayoutItem from "./rds-comp-layout-item";

const meta: Meta = {
    title: 'Layouts',
    component: RdsCompLayout,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Layout** component is a versatile and customizable UI element designed to structure and organize content within an application. It supports various display types such as Basic, Gridify, Spotlight, Matrix, and more, allowing developers to create visually appealing and functional layouts. This component is ideal for applications requiring dynamic content organization, such as dashboards, portfolios, or enterprise systems. Fully customizable, the Layout component ensures seamless integration with your design system while providing a user-friendly interface for managing and presenting content effectively.'
    },
},
        disableZoom: false
    },
    tags: ['autodocs'],
    argTypes: {
        hasShadow: {
            control: 'boolean',
            description: 'Adds a shadow effect to the layout'
        },
    }
} satisfies Meta<typeof RdsCompLayout>;

export default meta;
type Story = StoryObj<typeof RdsCompLayout>;


export const Basic: Story = {
    args: {
        displayType: "Basic",
        hasShadow: true,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="col-md-12">
                        <div className="content-with-full-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Board: Story = {
    args: {
        displayType: "Board",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-3">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Boxify: Story = {
    args: {
        displayType: "Boxify",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-small-height"></div>
                    </div>
                    <div className="grid-container-3">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-3">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Cardify: Story = {
    args: {
        displayType: "Cardify",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-6 mb-md-0">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2 md-vh-auto">
                        <div className="content-with-full-height"></div>
                        <div>
                            <div className="grid-container-1">
                                <div className="content-with-medium-height mb-sm-1"></div>
                                <div className="content-with-medium-height mb-sm-2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Collage: Story = {
    args: {
        displayType: "Collage",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-col-container-1-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Gridify: Story = {
    args: {
        displayType: "Gridify",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-3">
                        <div className=" content-with-small-height"></div>
                        <div className=" content-with-small-height"></div>
                        <div className=" content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="content-with-full-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;
 
export const Highlight: Story = {
    args: {
        displayType: "Highlight",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
 
                    <div className="grid-container-3">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-3">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Matrix: Story = {
    args: {
        displayType: "Matrix",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-col-container-2-1-1">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="col-md-12 content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Mosaic: Story = {
    args: {
        displayType: "Mosaic",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-col-container-1-1-2">
                        <div>
                            <div className="grid-container-1">
                                <div className="content-with-small-height mb-sm-2"></div>
                            </div>
                            <div className="grid-container-1">
                                <div className="content-with-small-height"></div>
                            </div>
                        </div>
                        <div>
                            <div className="grid-container-1">
                                <div className="content-with-small-height mb-sm-2"></div>
                            </div>
                            <div className="grid-container-1">
                                <div className="content-with-small-height"></div>
                            </div>
                        </div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Nexus: Story = {
    args: {
        displayType: "Nexus",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-col-container-2-1-1">
                        <div className="content-with-medium-height"></div>
                        <div>
                            <div className="grid-container-1">
                                <div className="content-with-small-height mb-sm-2"></div>
                            </div>
                            <div className="grid-container-1">
                                <div className="content-with-small-height "></div>
                            </div>
                        </div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Pinboard: Story = {
    args: {
        displayType: "Pinboard",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-1">
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-2-1">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Sections: Story = {
    args: {
        displayType: "Sections",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-small-height"></div>
                    </div>
                    <div className="grid-container-4">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>
                    <div className="grid-container-2">
                        <div className="col-md-12 content-with-medium-height"></div>
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>
                    <div className="grid-container-4">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-col-container-2-1-1">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Snapshots: Story = {
    args: {
        displayType: "Snapshots",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>
                    <div className="grid-container-4">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-4">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>
                    <div className="grid-col-container-1-1-2">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>{" "}
                    <div className="grid-container-1">
                        <div className="col-md-12 mb-sm-2 content-with-medium-height"></div>
                    </div>
                    <div className="grid-container-3">
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height"></div>
                        <div className="content-with-medium-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="col-md-12 content-with-medium-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Splitz: Story = {
    args: {
        displayType: "Splitz",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-2">
                        <div className="content-with-full-height"></div>
                        <div className="content-with-full-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Spotlight: Story = {
    args: {
        displayType: "Spotlight",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-1 mb-sm-2">
                        <div className="content-with-small-height"></div>
                    </div>
                    <div className="grid-container-3">
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height"></div>
                        <div className="content-with-small-height mb-sm-2"></div>
                    </div>
                    <div className="grid-container-1">
                        <div className="content-with-full-height"></div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;

export const Stacks: Story = {
    args: {
        displayType: "Stacks",
        hasShadow: false,
        children: (
            <>
                <RdsCompLayoutItem title={""}>
                    <div className="grid-container-1">
                        <div className="">
                            <div className="grid-container-2">
                                <div className="content-with-medium-height"></div>
                                <div className="content-with-medium-height mb-sm-2"></div>
                            </div>
                            <div className="grid-container-2">
                                <div className="content-with-medium-height"></div>
                                <div className="content-with-medium-height"></div>
                            </div>
                        </div>
                    </div>
                </RdsCompLayoutItem>
            </>
        ),
    },
    argTypes: {
        children: { table: { disable: true } }, // Hide 'children' from the controls
      },
} satisfies Story;