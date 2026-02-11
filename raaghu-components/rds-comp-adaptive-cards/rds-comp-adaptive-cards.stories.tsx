import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAdaptiveCards from './rds-comp-adaptive-cards';

const createActionLogger = (actionName: string) => {
    return (...args: any[]) => {
        
        try {
            const addons = (window as any)?.__STORYBOOK_ADDONS_CHANNEL__;
            if (addons) {
                addons.emit('storybook/actions/action-event', {
                    id: `action-${Date.now()}`,
                    count: 1,
                    data: {
                        name: actionName,
                        args: args
                    },
                    options: {
                        allowFunction: false,
                        allowSymbol: false,
                        maxDepth: 10,
                        allowUndefined: true
                    }
                });
            }
        } catch (e) {
           
        }
    };
};

const meta: Meta<typeof RdsCompAdaptiveCards> = {
    title: 'Components/Adaptive Cards',
    component: RdsCompAdaptiveCards,
    parameters: {
        layout: 'padded',
 
    },
    tags: ['autodocs'],
    argTypes: {
        showHeader: { control: 'boolean', description: 'Show header of the card' },
        showDismiss: { control: 'boolean', description: 'Show circle button' },
        cardTitle: { control: 'text', description: 'Title of the card' },
        showBtn1: { control: 'boolean', description: 'Show Button 1' },
        showBtn2: { control: 'boolean', description: 'Show Button 2' },
        btn1style: { control: 'text', description: 'Style of Button 1' },
        btn2style: { control: 'text', description: 'Style of Button 2' },
        btn1Label: { control: 'text', description: 'Label of Button 1' },
        btn2Label: { control: 'text', description: 'Label of Button 2' },
        smallText: { control: 'text', description: 'Small text below the title' },
        cardText: { control: 'text', description: 'Text for ActivityUpdateCard' },
        closeIcon: { control: 'boolean', description: 'Show close icon' },
        label: { control: 'text', description: 'Label for InputFormCard' },
        nameLabel: { control: 'text', description: 'Label for Name field in InputFormCard' },
        namePlaceholder: { control: 'text', description: 'Placeholder for Name field in InputFormCard' },
        emailLabel: { control: 'text', description: 'Label for Email field in InputFormCard' },
        emailPlaceholder: { control: 'text', description: 'Placeholder for Email field in InputFormCard' },
        phoneLabel: { control: 'text', description: 'Label for Phone field in InputFormCard' },
        phonePlaceholder: { control: 'text', description: 'Placeholder for Phone field in InputFormCard' },
        requiredText: { control: 'text', description: 'Required field indicator in InputFormCard' },
        calendarReminderPlaceholder: { control: 'text', description: 'Calendar Reminder Placeholder' },
        calendarReminderLabel: { control: 'text', description: 'Calendar Reminder Label' },
        block: { control: 'boolean', description: 'Block layout' },
        images: { control: 'object', description: 'Images for ImageGalleryCard' },
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
        sideOptions: { control: 'object', description: 'Options for ActivityUpdateCard' },
        sidePlaceholder: { control: 'text', description: 'Select Placeholder for CalendarReminderCard' },
        onBtn1Click: { action: 'button clicked' },
    },
};

export default meta;

export const Default: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        cardTitle: 'Title',
        showHeader: true,
        showBtn1: true,
        showBtn2: true,
        btn1Label: 'Cancel',
        btn2Label: 'Done',
        showDismiss: true,
        closeIcon: false,
    },
    parameters: {
        controls: {
            include: ['cardTitle', 'showHeader', 'showBtn1', 'showBtn2', 'btn1Label', 'btn2Label', 'showDismiss', 'closeIcon'],
        },
    },
    render: (args) => <RdsCompAdaptiveCards {...args} />,
};

export const ActivityUpdateCard: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'ActivityUpdateCard',
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
            avatar: 'assets/your-logo.png',
            radioOptions: [
                { value: 'option1', label: 'Sub - Title 1', desc: 'Description' },
                { value: 'option2', label: 'Sub - Title 2', desc: 'Description' },
            ],
        },
    },
    parameters: {
        controls: {
            include: [
                'type', 'cardTitle', 'showHeader', 'showBtn1', 'showBtn2', 'btn1style', 'btn2style', 'btn1Label', 'btn2Label', 'showDismiss', 'closeIcon',
                'cardText', 'name', 'date', 'activityProps'
            ],
        },
    },
    render: (args) => <RdsCompAdaptiveCards {...args} />,
};

export const CalendarReminder: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'CalenderReminder',
        cardTitle: 'Title',
        showHeader: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'outline',
        btn2style: 'outline',
        btn1Label: 'snooze',
        btn2Label: "I'll be Late",
        smallText: '20:30 - 09:30',
        label: 'Conf Room 112/3377 (10)',
        showDismiss: false,
        closeIcon: false,
        calendarReminderLabel: 'Snooze for',
        namePlaceholder: 'Select duration',
        sideOptions: [
            { value: '5min', label: '5 Minutes' },
            { value: '15min', label: '15 Minutes' },
            { value: '30min', label: '30 Minutes' }
        ],
        sidePlaceholder: 'Select duration',
        snoozeLabel: 'Snooze',
        lateLabel: "I'll be Late"
    },
    parameters: {
        controls: {
            include: [
                    'type', 'cardTitle', 'showHeader', 'showBtn1', 'showBtn2', 'btn1style', 'btn2style', 'smallText', 'label', 'calendarReminderLabel', 'sideOptions', 'sidePlaceholder', 'snoozeLabel', 'lateLabel', 'showDismiss', 'closeIcon'
            ],
        },
    },
    render: (args) => <RdsCompAdaptiveCards {...args} />,
};

export const ImageGallery: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'ImageGallery',
        cardTitle: 'Here are some cool photos',
        showHeader: true,
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
    parameters: {
        controls: {
            include: ['type', 'cardTitle', 'smallText', 'images'],
        },
    },
    render: (args) => <RdsCompAdaptiveCards {...args} />,
};

export const InputForm: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'InputForm',
        cardTitle: 'Tell us about yourself',
        showHeader: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: 'filled',
        btn1Label: 'Submit',
        block: true,
        smallText: "Don't worry, we'll never share or sell your information.",
        label: 'We just need a few more details to get you booked for the trip of a lifetime!',
        showDismiss: false,
        closeIcon: false,
        nameLabel: 'Name (Last, First)',
        namePlaceholder: 'Enter Name',
        emailLabel: 'Email',
        emailPlaceholder: 'Enter Email',
        phoneLabel: 'Phone Number',
        phonePlaceholder: 'Enter Phone Number',
        requiredText: '*',
    },
    parameters: {
        controls: {
            include: [
                'type', 'cardTitle', 'showHeader', 'showBtn1', 'btn1style', 'btn1Label', 'smallText', 'label', 'showDismiss', 'closeIcon',
                'nameLabel', 'namePlaceholder', 'emailLabel', 'emailPlaceholder', 'phoneLabel', 'phonePlaceholder', 'requiredText'
            ],
        },
    },
    render: (args) => {
        const [form, setForm] = React.useState({
            name: '',
            email: '',
            phone: ''
        });

        const [errors, setErrors] = React.useState({
            name: '',
            email: '',
            phone: ''
        });

        const [showErrors, setShowErrors] = React.useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value });
            
            if (errors[name as keyof typeof errors]) {
                setErrors({ ...errors, [name]: '' });
            }
        };

        const validateForm = () => {
            const newErrors = {
                name: '',
                email: '',
                phone: ''
            };

            let hasErrors = false;

            if (!form.name.trim()) {
                newErrors.name = 'Name is required';
                hasErrors = true;
            }

            if (!form.email.trim()) {
                newErrors.email = 'Email is required';
                hasErrors = true;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                newErrors.email = 'Please enter a valid email address';
                hasErrors = true;
            }

            if (!form.phone.trim()) {
                newErrors.phone = 'Phone number is required';
                hasErrors = true;
            } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(form.phone.replace(/\s/g, ''))) {
                newErrors.phone = 'Please enter a valid phone number';
                hasErrors = true;
            }

            setErrors(newErrors);
            return !hasErrors;
        };

        const logFormSubmission = createActionLogger('Form Submitted');
        const logFormError = createActionLogger('Form Validation Error');

        const handleSubmit = () => {
            setShowErrors(true);
            
            if (validateForm()) {
                logFormSubmission({
                    formData: form,
                    timestamp: new Date().toISOString(),
                    message: 'Input form submitted successfully',
                    validationStatus: 'passed'
                });
                
                setForm({ name: '', email: '', phone: '' });
                setErrors({ name: '', email: '', phone: '' });
                setShowErrors(false);
            } else {
                const emptyFields = [];
                if (!form.name.trim()) emptyFields.push('Name');
                if (!form.email.trim()) emptyFields.push('Email');
                if (!form.phone.trim()) emptyFields.push('Phone');

                logFormError({
                    formData: form,
                    errors: errors,
                    emptyFields: emptyFields,
                    timestamp: new Date().toISOString(),
                    message: `Form submission failed: ${emptyFields.join(', ')} field(s) are empty or invalid`,
                    validationStatus: 'failed'
                });
            }
        };

        return (
            <>
                <RdsCompAdaptiveCards
                    {...args}
                    nameValue={form.name}
                    emailValue={form.email}
                    phoneValue={form.phone}
                    onNameChange={handleChange}
                    onEmailChange={handleChange}
                    onPhoneChange={handleChange}
                    onBtn1Click={handleSubmit}
                    nameError={showErrors ? errors.name : ''}
                    emailError={showErrors ? errors.email : ''}
                    phoneError={showErrors ? errors.phone : ''}
                />
                <button style={{display:'none'}} id="inputFormClearBtn" onClick={handleSubmit} />
            </>
        );
    },
};

export const RestaurantOrder: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'RestaurantOrder',
        cardTitle: 'Malt & Vine Order Form',
        showHeader: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: 'filled',
        btn1Label: 'Place Order',
        block: true,
        showDismiss: false,
        closeIcon: false,
        entreeLabel: 'Which entree would you like?',
        entreePlaceholder: 'Select an entree',
        entreeOptions: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
        sideLabel: 'Which side would you like?',
        sidePlaceholder: 'Select a side',
        sideOptions: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
        drinkLabel: 'Which drink would you like?',
        drinkPlaceholder: 'Select a drink',
        drinkOptions: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        controls: {
            include: [
                'type', 'cardTitle', 'showHeader', 'showBtn1', 'btn1style', 'btn1Label', 'showDismiss', 'closeIcon',
                'entreeLabel', 'entreePlaceholder', 'entreeOptions',
                'sideLabel', 'sidePlaceholder', 'sideOptions',
                'drinkLabel', 'drinkPlaceholder', 'drinkOptions'
            ],
        },
    },
    render: (args) => {
        const [order, setOrder] = React.useState({
            entree: '',
            side: '',
            drink: ''
        });
        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setOrder({ ...order, [e.target.name]: e.target.value });
        };
        const handlePlaceOrder = () => {
            setOrder({ entree: '', side: '', drink: '' });
        };
        return (
            <>
                <RdsCompAdaptiveCards
                    {...args}
                    entreeValue={order.entree}
                    sideValue={order.side}
                    drinkValue={order.drink}
                    onEntreeChange={handleChange}
                    onSideChange={handleChange}
                    onDrinkChange={handleChange}
                    onBtn1Click={handlePlaceOrder}
                />
                <button style={{display:'none'}} id="restaurantOrderClearBtn" onClick={handlePlaceOrder} />
            </>
        );
    },
};

export const FootballScorecard: StoryObj<typeof RdsCompAdaptiveCards> = {
    args: {
        type: 'FootballScorecard',
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
        finalText: 'Final',
    },
    parameters: {
        controls: {
            include: [
                'type', 'leagueName', 'leagueAvatar', 'isLive', 'matchDate', 'isFinal', 'homeTeamName', 'homeTeamLogo', 'homeTeamStatus', 'awayTeamName', 'awayTeamLogo', 'awayTeamStatus', 'homeScore', 'awayScore', 'time', 'finalText'
            ],
        },
    },
    render: (args) => <RdsCompAdaptiveCards {...args} />,
};



