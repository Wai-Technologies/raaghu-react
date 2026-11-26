import RdsCompTextEditor from "./rds-comp-text-editor";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Text Editor',
    component: RdsCompTextEditor,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the text editor root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the text editor root.' },
        ref: { control: false, description: 'React ref to the text editor root; assign it in code.' },
        state: {
            options: [
                "Default"   ,
                "Active"  ,
                "Selected",
                "Disabled" ,
                "Error"   
            ],
            control: { type: "select" },
            description: "State of the text editor",
        },
    },
} satisfies Meta<typeof RdsCompTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsCompTextEditor>;

export const Default: Story = {
    args: {
        state: "Default",
        showTitle: true,
        label:"Label",
        required: false,
        rows:6,
        resizable:false,
        placeholder:"Enter Description",
        onChange: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const editable = await waitFor(() => {
            const node = canvasElement.querySelector('[contenteditable="true"]');
            expect(node).toBeTruthy();
            return node as HTMLElement;
        });

        await userEvent.click(editable);
        await userEvent.type(editable, 'Hello React 19');

        const bold = canvasElement.querySelector('.rdw-option-wrapper[title="Bold"], .rdw-option-wrapper[aria-label="Bold"]')
            ?? canvas.getByTitle('Bold');
        await userEvent.click(bold as HTMLElement);

        await waitFor(() => {
            expect(args.onChange).toHaveBeenCalled();
            const html = (args.onChange as ReturnType<typeof fn>).mock.calls.at(-1)?.[0] as string;
            expect(html).toMatch(/Hello React 19/i);
        });
    },
} satisfies Story;
Default.parameters = { controls: { include: ['state', 'showTitle', 'label', 'required','rows','resizable','placeholder','onChange','className','sx','ref'] } };
