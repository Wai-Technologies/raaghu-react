import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAdaptiveCards from './rds-comp-adaptive-cards';

const meta: Meta = {
    title: "Components/Adaptive Cards",
    component: RdsCompAdaptiveCards,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: '**Adaptive Cards**'
            },
        }
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'boolean', description: 'Show card title' },
        titleIcon: { control: 'boolean', description: 'Show title icon' },
        cardTitle: { control: 'text', description: 'Card title text' },
        showBtn1: { control: 'boolean', description: 'Show Button 1' },
        showBtn2: { control: 'boolean', description: 'Show Button 2' },
        btn1style: { control: 'text', description: 'Button 1 style' },
        btn2style: { control: 'text', description: 'Button 2 style' },
        btn1Label: { control: 'text', description: 'Button 1 label' },
        btn2Label: { control: 'text', description: 'Button 2 label' },
        smallText: { control: 'text', description: 'Small text below title' },
        cardText: { control: 'text', description: 'Main card text' },
        type: {
            control: { type: 'select' },
            options: [
                'ActivityUpdateCard',
                'CalenderReminder',
                'Default',
                'ImageGallery',
                'InputForm',
                'RestaurantOrder',
                'FootballScorecard'
            ],
            description: 'Select the adaptive card type',
        },
        closeIcon: { control: 'boolean', description: 'Show close icon' },
        label: { control: 'text', description: 'Label for input form' },
        // inputForm: { control: 'boolean', description: 'Show input form' },
        block: { control: 'boolean', description: 'Block style' },
        images: { control: 'object', description: 'Image array' },
        footballProps: { control: 'object', description: 'Football scorecard props' },
        activityProps: { control: 'object', description: 'Activity update card props' },
    },
} satisfies Meta<typeof RdsCompAdaptiveCards>;


export default meta;
type Story = StoryObj<typeof RdsCompAdaptiveCards>;

export const Default: Story = {
    args: {
        cardTitle: "Title",
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: "transparent",
        btn2style: "filled",
        block: false,
        type: "Default",
        titleIcon: true,
        closeIcon: true,
    }
} satisfies Story;
