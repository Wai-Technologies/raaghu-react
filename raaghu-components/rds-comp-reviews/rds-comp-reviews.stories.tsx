
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompReviews, { RevieweStyle, VariantType } from "./rds-comp-reviews";

const meta: Meta = { 
    title: "Components/Reviews",
    component: RdsCompReviews,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
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
args: {
        variantType: VariantType.Default,
        style: RevieweStyle.Style1,
        itemList: [
            {
                name: "Jane Doe",
                username: "Software Developer",
                date: new Date(),
                feedIcon: "person",
                imageUrl: "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
                description: "Awesome website and funnel for your business",
                hashtags: "#newbag #fancybag #designerbag",
                reviews: "4.75",
                rating: 1,
            },
        ],
    }
} satisfies Story;
    
Default.parameters = { controls: { include: ['itemList','style','variantType'] } };