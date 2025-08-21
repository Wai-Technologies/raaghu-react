
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAdaptiveCards from './rds-comp-adaptive-cards';


const meta: Meta<typeof RdsCompAdaptiveCards> = {
    title: 'Components/Adaptive Cards',
    component: RdsCompAdaptiveCards,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: '**Adaptive Cards**',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: [
                'ActivityUpdateCard',
                'CalenderReminder',
                'Default',
                'ImageGallery',
                'InputForm',
                'RestaurantOrder',
                'FootballScorecard',
            ],
            description: 'Select the adaptive card type',
        }, 
        showHeader: { control: 'boolean' },
        showDismiss: { control: 'boolean' },
        cardTitle: { control: 'text' },
        showBtn1: { control: 'boolean' },
        showBtn2: { control: 'boolean' },
        btn1style: { control: 'text' },
        btn2style: { control: 'text' },
        btn1Label: { control: 'text' },
        btn2Label: { control: 'text' },
        smallText: { control: 'text' },
    cardText: { control: 'text', description: 'Text for ActivityUpdateCard' },
        closeIcon: { control: 'boolean' },
        label: { control: 'text' },
        block: { control: 'boolean' },
        images: { control: 'object' },
    leagueName: { control: 'text', description: 'League Name' },
    leagueAvatar: { control: 'text', description: 'League Avatar URL' },
    isLive: { control: 'boolean', description: 'Is Live?' },
    matchDate: { control: 'text', description: 'Match Date' },
    isFinal: { control: 'boolean', description: 'Is Final?' },
    homeTeamName: { control: 'text', description: 'Home Team Name' },
    homeTeamLogo: { control: 'text', description: 'Home Team Logo URL' },
    homeTeamStatus: { control: 'text', description: 'Home Team Status' },
    awayTeamName: { control: 'text', description: 'Away Team Name' },
    awayTeamLogo: { control: 'text', description: 'Away Team Logo URL' },
    awayTeamStatus: { control: 'text', description: 'Away Team Status' },
    homeScore: { control: 'number', description: 'Home Team Score' },
    awayScore: { control: 'number', description: 'Away Team Score' },
    time: { control: 'text', description: 'Match Time' },
    activityProps: { control: 'object' },
    name: { control: 'text', description: 'Name for ActivityUpdateCard' },
    date: { control: 'text', description: 'Date for ActivityUpdateCard' },
        },
};


export default meta;


export const defaultProps = {
    activityUpdate: {
        cardTitle: 'Title',
        showHeader: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'outline',
        btn2style: 'filled',
        btn1Label: 'Button',
        btn2Label: 'Click Here',
        showDismiss: false,
        closeIcon: false,
         cardText:
                'Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.',
        name: 'Jane Doe',
        date: 'Created Wed, 30 Apr 2025',
        activityProps: {
            avatar:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU',
            radioOptions: [
                { value: 'option1', label: 'Sub - Title 1', desc: 'Description' },
                { value: 'option2', label: 'Sub - Title 2', desc: 'Description' },
            ],
        },
    },
    calenderReminder: {
        cardTitle: 'Title',
        showHeader: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'outline',
        btn2style: 'outline',
        btn1Label: 'Snooze',
        btn2Label: "I'll be Late",
        block: false,
        smallText: '20:30 - 09:30',
        label: 'Conf Room 112/3377 (10)',
        showDismiss: false,
        closeIcon: false,
    },
    imageGallery: {
        cardTitle: 'Here are some cool photos',
        smallText: 'Sorry some of them are repeats',
        images: [
            '/assets/Image1.png',
            '/assets/Image2.png',
            '/assets/Image3.png',
            '/assets/Image4.png',
            '/assets/Image5.png',
            '/assets/Image6.png',
            '/assets/Image7.png',
            '/assets/Image8.png',
            '/assets/Image9.png',
            '/assets/Image10.png',
            '/assets/Image11.png',
            '/assets/Image12.png',
        ],
    },
    inputForm: {
        cardTitle: 'Tell us about yourself',
        showHeader: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: 'filled',
        btn1Label: 'Submit',
        block: true,
        smallText: "Don't worry, we'll never share or sell your information.",
        label:
            'We just need a few more details to get you booked for the trip of a lifetime!',
        showDismiss: false,
        closeIcon: false,
    },
    restaurantOrder: {
        cardTitle: 'Malt & Vine Order Form',
        showHeader: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: 'filled',
        btn1Label: 'Place Order',
        block: true,
        showDismiss: false,
        closeIcon: false,
    },
    footballScorecard: {
        closeIcon: true,
        leagueName: 'La Liga',
        leagueAvatar: 'assets/scorecard1.png',
        isLive: true,
        matchDate: '30th Apr 2025',
        isFinal: true,
        homeTeamName: 'Real Madrid',
        homeTeamLogo: 'assets/scorecard1.png',
        homeTeamStatus: 'Home',
        awayTeamName: 'Barcelona',
        awayTeamLogo: 'assets/scorecard2.png',
        awayTeamStatus: 'Away',
        homeScore: 2,
        awayScore: 2,
        time: '90:00',
    },
};



export const ActivityUpdate: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'ActivityUpdateCard',
        ...defaultProps.activityUpdate,
    },
};

export const CalendarReminder: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'CalenderReminder',
        ...defaultProps.calenderReminder,
    },
};

export const ImageGallery: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'ImageGallery',
        ...defaultProps.imageGallery,
    },
};

export const InputForm: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'InputForm',
        ...defaultProps.inputForm,
    },
};

export const RestaurantOrder: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'RestaurantOrder',
        ...defaultProps.restaurantOrder,
    },
};

export const FootballScorecard: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'FootballScorecard',
        ...defaultProps.footballScorecard,
    },
};



