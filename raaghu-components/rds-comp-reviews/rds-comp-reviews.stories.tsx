
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import RdsCompReviews, { RevieweStyle, VariantType } from "./rds-comp-reviews";

const meta: Meta = { 
    title: "Components/Reviews",
    component: RdsCompReviews,
    parameters: {
        layout: 'padded',
        docs :{
                source:{
                transform:(code:string) => {
                    code = code.replace(/variantType="([^"]+)"/g, (match, p1) => `variantType={VariantType.${p1.replace(/\s+/g, '')}}`)
                    code = code.replace(/variantType:\s*"([^"]+)"/g, (match, p1) => `variantType: VariantType.${p1.replace(/\s+/g, '')}`);
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={RevieweStyle.${p1.replace(/\s+/g, '')}}`);

                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: RevieweStyle.${p1.replace(/\s+/g, '')}`);
                    return code;
            }
        }
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        style: {
            options: [ "style1", "style2", "style3","style4", "style5", "style6", "style7", "style8", "style9", "style10", "style11", "style12"],
            control: { type: "select" },
            description: "Style of the review component",
        },
    },
} satisfies Meta<typeof RdsCompReviews>;

export default meta;
type Story = StoryObj<typeof RdsCompReviews>;

export const Default: Story = {
play: async ({ canvasElement }) => {
  const el = canvasElement.firstElementChild;
  expect(el).toBeTruthy();
},
args: {
        variantType: VariantType.Default,
        style: RevieweStyle.Style1,
        itemList: [
            {
                name: "Jane Doe",
                username: "Software Developer",
                date: new Date(),
                feedIcon: "person",
                imageUrl: "",
                description: "Awesome website and funnel for your business",
                hashtags: "#newbag #fancybag #designerbag",
                reviews: "4.75",
                rating: 1,
            },
        ],
    }
} satisfies Story;
    
Default.parameters = { controls: { include: ['itemList','style','variantType'] } };