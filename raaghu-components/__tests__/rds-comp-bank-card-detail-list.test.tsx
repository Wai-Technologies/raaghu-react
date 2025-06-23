import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBankCardDetailList from '../src/rds-comp-bank-card-detail-list/rds-comp-bank-card-detail-list';

// Define the card data type
interface CardData {
  cardID: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  icon: string;
  iconHeight: string;
  iconWidth: string;
  iconFill: boolean;
  iconstroke: boolean;
  iconColorVarient: string;
}

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsBankCardDetail: ({ 
    cardDatas, 
    isSelectable, 
    isEditable, 
    onEdit, 
    onActiveButton
  }: {
    cardDatas: CardData[];
    isSelectable?: boolean;
    isEditable?: boolean;
    onEdit?: (cardID: string) => void;
    onActiveButton?: (cardID: string) => void;
  }) => (
    <div data-testid="rds-bank-card-detail">
      {cardDatas.map((card, index) => (
        <div key={index} data-testid={`card-${index}`}>
          <div data-testid="card-name">{card.cardName}</div>
          <div data-testid="card-number">{card.cardNumber}</div>
          <div data-testid="card-expiry">{card.cardExpiry}</div>
          {isSelectable && <input type="radio" data-testid="card-radio" />}
          {isEditable && (
            <div>
              <button 
                data-testid="set-default-button"
                onClick={() => {}}
              >
                Set as default
              </button>
              <button 
                data-testid="edit-button" 
                onClick={(e) => onEdit && onEdit(card.cardID)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  ),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {})
    }
  })
}));

describe('RdsCompBankCardDetailList', () => {
  const mockCardData = [
    {
      cardID: 'card1',
      cardName: 'Visa',
      cardNumber: '4242',
      cardExpiry: '12/25',
      icon: 'credit_card',
      iconHeight: '24px',
      iconWidth: '24px',
      iconFill: false,
      iconstroke: true,
      iconColorVarient: 'primary'
    },
    {
      cardID: 'card2',
      cardName: 'Mastercard',
      cardNumber: '5555',
      cardExpiry: '06/24',
      icon: 'credit_card',
      iconHeight: '24px',
      iconWidth: '24px',
      iconFill: false,
      iconstroke: true,
      iconColorVarient: 'primary'
    }
  ];

  it('renders without crashing', () => {
    const { container } = render(<RdsCompBankCardDetailList cardDatas={mockCardData} />);
    expect(container).toBeTruthy();
  });

  it('renders all cards in the list', () => {
    render(<RdsCompBankCardDetailList cardDatas={mockCardData} />);
    
    expect(screen.getByTestId('rds-bank-card-detail')).toBeInTheDocument();
    expect(screen.getByTestId('card-0')).toBeInTheDocument();
    expect(screen.getByTestId('card-1')).toBeInTheDocument();
  });

  it('displays card information correctly', () => {
    render(<RdsCompBankCardDetailList cardDatas={mockCardData} />);
    
    // Check first card
    expect(screen.getAllByTestId('card-name')[0]).toHaveTextContent('Visa');
    expect(screen.getAllByTestId('card-number')[0]).toHaveTextContent('4242');
    expect(screen.getAllByTestId('card-expiry')[0]).toHaveTextContent('12/25');
    
    // Check second card
    expect(screen.getAllByTestId('card-name')[1]).toHaveTextContent('Mastercard');
    expect(screen.getAllByTestId('card-number')[1]).toHaveTextContent('5555');
    expect(screen.getAllByTestId('card-expiry')[1]).toHaveTextContent('06/24');
  });

  it('renders with selectable option when isSelectable is true', () => {
    render(<RdsCompBankCardDetailList cardDatas={mockCardData} isSelectable={true} />);
    expect(screen.getAllByTestId('card-radio')).toHaveLength(mockCardData.length);
  });

  it('renders with editable option when isEditable is true', () => {
    render(<RdsCompBankCardDetailList cardDatas={mockCardData} isEditable={true} />);
    expect(screen.getAllByTestId('set-default-button')).toHaveLength(mockCardData.length);
    expect(screen.getAllByTestId('edit-button')).toHaveLength(mockCardData.length);
  });

  it('renders without selectable and editable options by default', () => {
    render(<RdsCompBankCardDetailList cardDatas={mockCardData} />);
    expect(screen.queryByTestId('card-radio')).not.toBeInTheDocument();
    expect(screen.queryByTestId('set-default-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });
});