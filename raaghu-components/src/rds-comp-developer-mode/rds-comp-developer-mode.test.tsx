import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import RdsCompDeveloperMode from './rds-comp-developer-mode';

// Mock the RDS components
jest.mock('../rds-elements', () => ({
    RdsButton: (props: any) => <button data-testid="rds-button">{props.label}</button>,
    RdsCheckbox: (props: any) => <input type="checkbox" data-testid={props.dataTestId || "checkbox"} />,
    RdsInput: (props: any) => <input data-testid={props.dataTestId || "input"} value={props.value || ""} readOnly />,
    RdsLabel: (props: any) => <label data-testid="label">{props.label}</label>,
    RdsRadioButton: (props: any) => <div data-testid="radio-group"></div>,
    RdsSelectList: (props: any) => <select data-testid="grant-type-select"></select>
}));

// Initialize i18next
i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                'Configuration': 'Configuration',
                'Settings': 'Settings',
                'RESTORE TO DEFAULT': 'RESTORE TO DEFAULT',
                'Apply': 'Apply'
            }
        }
    }
});

describe('RdsCompDeveloperMode', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders developer mode component', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <RdsCompDeveloperMode grantType={[{ option: 'Password', value: 'password' }]} />
            </I18nextProvider>
        );
        
        // Basic rendering checks
        expect(screen.getByTestId('env')).toBeInTheDocument();
        expect(screen.getByTestId('applicationUrl')).toBeInTheDocument();
        expect(screen.getByTestId('applicationClient')).toBeInTheDocument();
        expect(screen.getByTestId('grant-type-select')).toBeInTheDocument();
    });
    
    it('loads values from localStorage', () => {
        // Set up localStorage
        localStorage.setItem('REACT_APP_API_URL', 'http://test-api.com');
        localStorage.setItem('REACT_APP_CLIENT_ID', 'test-client-id');
        
        render(
            <I18nextProvider i18n={i18n}>
                <RdsCompDeveloperMode grantType={[{ option: 'Password', value: 'password' }]} />
            </I18nextProvider>
        );
        
        // Check localStorage values are loaded into the component
        expect(screen.getByTestId('applicationUrl')).toHaveValue('http://test-api.com');
        expect(screen.getByTestId('applicationClient')).toHaveValue('test-client-id');
    });
});