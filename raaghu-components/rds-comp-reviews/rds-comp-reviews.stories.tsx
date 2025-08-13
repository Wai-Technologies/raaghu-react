
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompReviews, { RevieweStyle, VariantType } from "./rds-comp-reviews";

const meta: Meta = { 
    title: "Components/Reviews",
    component: RdsCompReviews,
    parameters: {
        layout: 'padded',
        docs: {
           
    description: {
        component: 
            'The **Reviews** component is a versatile and customizable UI element designed to display user reviews and feedback in various styles and formats. It supports multiple configurations, including single-column, multi-column, and summary chart layouts. The component allows customization of review styles (`RevieweStyle`) and variant types (`VariantType`) to match different use cases. It is ideal for e-commerce platforms, product pages, or any application requiring an interactive and visually appealing review display. Fully customizable, the Reviews component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },

            source:{
                transform:(code:string) => {
                    //transform VariantType enum
                    code = code.replace(/variantType="([^"]+)"/g, (match, p1) => `variantType={VariantType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/variantType:\s*"([^"]+)"/g, (match, p1) => `variantType: VariantType.${p1.replace(/\s+/g, '')}`);
                    //transform RevieweStyle enum
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={RevieweStyle.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: RevieweStyle.${p1.replace(/\s+/g, '')}`);
                    return code;
            }
        }
    }
    },
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: [ "style1", "style2", "style3","style4", "style5", "style6", "style7", "style8", "style9", "style10", "style11", "style12"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompReviews>;

export default meta;
type Story = StoryObj<typeof RdsCompReviews>;

export const Standard: Story = {
args: {
        variantType: VariantType.Default,
        style: RevieweStyle.Style1,
        itemList: [
            {
                name: "Jane Doe",
                username: "Software Developer",
                date: new Date(),
                feedIcon: "person",
                imageUrl:
                    "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
                description:"Awesome website and funnel for your business",               
                hashtags: "#newbag #fancybag #designerbag",
                reviews: "4.75",
                rating: 1,
            },
        ],
    }
} satisfies Story;
    
Standard.parameters = { controls: { include: ['itemList','style','variantType'] } };