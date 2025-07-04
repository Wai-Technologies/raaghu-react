import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAdaptiveCards from './rds-comp-adaptive-cards';

const meta: Meta = {
    title: "Components/Adaptive Cards",
    component: RdsCompAdaptiveCards,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            '**Adaptive Cards**'
    },
    }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAdaptiveCards>;

export default meta;
type Story = StoryObj<typeof RdsCompAdaptiveCards>;


export const Standard: Story = {
    args: {
        cardTitle: "Title",
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: "transparent",
        btn2style: "filled",
        btn1Label: "Cancel",
        btn2Label: "Done",
        block: false,
        type: "Default",
        titleIcon: true,
        closeIcon: true,
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['cardTitle','showBtn1','showBtn2','titleIcon','closeIcon'] } };


export const ActivityUpdateCard: Story = {
    args: {
        cardTitle: "Title",
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: "outline",
        btn2style: "filled",
        btn1Label: "Button",
        btn2Label: "Click Here",
        block: false,
        type: "ActivityUpdateCard",
        cardText: "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
        titleIcon: false,
        closeIcon: false,
    }
} satisfies Story;
ActivityUpdateCard.parameters = { controls: { include: ['cardTitle','cardText','showBtn1','showBtn2','titleIcon','closeIcon'] } };

export const CalendarReminder: Story = {
    args: {
        cardTitle: "Title",
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: "outline",
        btn2style: "outline",
        btn1Label: "Snooze",
        btn2Label: "I'll be Late",
        block: false,
        type: "CalendarReminder",
        smallText: "20:30 - 09:30",
        titleIcon: false,
        closeIcon: false,
        label: "Conf Room 112/3377 (10)",
        inputForm: false,
        textCase: "unset"
    }
} satisfies Story;
CalendarReminder.parameters = { controls: { include: ['cardTitle','label','smallText','showBtn1','showBtn2','titleIcon','closeIcon'] } };

export const FootballScorecard: Story = {
    args: {
        type: "FootballScorecard",
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        score: "2 : 2",
        time: "90:00",
        tournament: "La Liga"
    }
} satisfies Story;
FootballScorecard.parameters = { controls: { include: ['homeTeam','awayTeam','tournament','score','time'] } };


export const ImageGallery: Story = {
    args: {
        cardTitle: "Here are some cool photos",
        smallText: "Sorry some of them are repeats",
        type: "ImageGallery",
    }
} satisfies Story;
ImageGallery.parameters = { controls: { include: ['cardTitle','smallText'] } };

export const InputForm: Story = {
    args: {
        cardTitle: "Tell us about yourself",
        title: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: "filled",
        btn1Label: "Submit",
        block: true,
        type: "CalendarReminder",
        smallText: "Don't worry, we'll never share or sell your information.",
        titleIcon: false,
        closeIcon: false,
        label: "We just need a few more details to get you booked for the trip of a lifetime!",
        inputForm: true,
    }
} satisfies Story;
InputForm.parameters = { controls: { include: ['cardTitle','label','smallText','block','showBtn1','titleIcon','closeIcon'] } };

export const RestaurantOrder: Story = {
    args: {
        cardTitle: "Malt & Vine Order Form",
        title: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: "filled",
        btn1Label: "Place Order",
        block: true,
        type: "RestaurantOrder",
        titleIcon: false,
        closeIcon: false,
    }
} satisfies Story;
RestaurantOrder.parameters = { controls: { include: ['cardTitle','block','showBtn1','titleIcon','closeIcon'] } };

