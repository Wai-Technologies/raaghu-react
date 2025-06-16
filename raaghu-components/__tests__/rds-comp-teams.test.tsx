import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTeams from '../src/rds-comp-teams/rds-comp-teams';

// Mock the RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsLabel: (props: any) => (
    <div 
      data-testid="rds-label"
      data-label={props.label}
      data-multiline={props.multiline ? 'true' : 'false'}
      data-size={props.size}
      data-fontweight={props.fontWeight}
    >
      {props.label}
    </div>
  ),
  RdsIcon: (props: any) => (
    <span 
      data-testid={`rds-icon-${props.name}`}
      data-name={props.name}
      data-fill={props.fill ? 'true' : 'false'}
      data-stroke={props.stroke ? 'true' : 'false'}
      data-width={props.width}
      data-height={props.height}
      onClick={props.onClick}
      style={{ 
        cursor: props.isCursorPointer ? 'pointer' : 'default',
        width: props.width,
        height: props.height 
      }}
    >
      {props.name}
    </span>
  ),
  RdsTeamMember: (props: any) => (
    <div data-testid="rds-team-member">
      {props.teamItem.map((item: any, index: number) => (
        <div key={index} data-testid="team-member-item" className="team-member-card">
          <div data-testid="team-member-img-link">{item.imgLink}</div>
          <div data-testid="team-member-title">{item.title}</div>
          <div data-testid="team-member-subtitle">{item.subTitle}</div>
          <div data-testid="team-member-description">{item.description}</div>
          <div data-testid="team-member-twitter-icon">{item.twitterIcon}</div>
        </div>
      ))}
    </div>
  )
}));

describe('RdsCompTeams Component', () => {
  // Sample team data for testing
  const mockTeamData = [
    [
      {
        imgLink: 'https://example.com/profile1.jpg',
        title: 'John Doe',
        subTitle: 'CEO & Founder',
        description: 'John has 20+ years of experience in tech leadership.',
        twitterIcon: 'twitter'
      },
      {
        imgLink: 'https://example.com/profile2.jpg',
        title: 'Jane Smith',
        subTitle: 'CTO',
        description: 'Jane is an expert in AI and machine learning.',
        twitterIcon: 'twitter'
      }
    ],
    [
      {
        imgLink: 'https://example.com/profile3.jpg',
        title: 'Mike Johnson',
        subTitle: 'Lead Developer',
        description: 'Mike specializes in frontend development.',
        twitterIcon: 'twitter'
      }
    ]
  ];

  const defaultProps = {
    teamItem: mockTeamData
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompTeams {...defaultProps} />);
      expect(screen.getByText('Meet the Team')).toBeInTheDocument();
    });

    it('renders the correct number of team members', () => {
      render(<RdsCompTeams {...defaultProps} />);
      const teamMembers = screen.getAllByTestId('rds-team-member');
      expect(teamMembers).toHaveLength(mockTeamData.length);
    });

    it('renders navigation arrows', () => {
      render(<RdsCompTeams {...defaultProps} />);
      expect(screen.getByTestId('rds-icon-arrow_right')).toBeInTheDocument();
      expect(screen.getByTestId('rds-icon-arrow_left')).toBeInTheDocument();
    });
  });

  // Component Structure Tests
  describe('Component Structure', () => {
    it('has the correct container structure', () => {
      const { container } = render(<RdsCompTeams {...defaultProps} />);
      
      // Check for main container
      expect(container.querySelector('.container')).toBeInTheDocument();
      
      // Check for row structure
      const rows = container.querySelectorAll('.row');
      expect(rows.length).toBeGreaterThan(1); // Should have at least 2 rows
      
      // Check column structure for team members
      expect(container.querySelectorAll('.col-lg-4')).toHaveLength(mockTeamData.length);
    });
    
    it('renders the header section correctly', () => {
      render(<RdsCompTeams {...defaultProps} />);
      
      // Check for header label
      expect(screen.getByText('Meet the Team')).toBeInTheDocument();
      
      // Check for navigation controls
      const rightArrow = screen.getByTestId('rds-icon-arrow_right');
      const leftArrow = screen.getByTestId('rds-icon-arrow_left');
      
      expect(rightArrow).toBeInTheDocument();
      expect(leftArrow).toBeInTheDocument();
      
      // Verify arrow properties
      expect(rightArrow).toHaveAttribute('data-width', '15px');
      expect(rightArrow).toHaveAttribute('data-height', '15px');
      expect(rightArrow).toHaveAttribute('data-stroke', 'true');
      expect(rightArrow).toHaveAttribute('data-fill', 'false');
      
      expect(leftArrow).toHaveAttribute('data-width', '15px');
      expect(leftArrow).toHaveAttribute('data-height', '15px');
      expect(leftArrow).toHaveAttribute('data-stroke', 'true');
      expect(leftArrow).toHaveAttribute('data-fill', 'false');
    });
  });

  // Props Testing
  describe('Props Handling', () => {
    it('passes team items to RdsTeamMember correctly', () => {
      render(<RdsCompTeams {...defaultProps} />);
      
      const teamMembers = screen.getAllByTestId('rds-team-member');
      expect(teamMembers).toHaveLength(mockTeamData.length);
      
      // This tests that each array in teamItem is passed to a separate RdsTeamMember component
      for (let i = 0; i < mockTeamData.length; i++) {
        expect(teamMembers[i]).toBeInTheDocument();
      }
    });
    
    it('renders correctly with empty team data', () => {
      render(<RdsCompTeams teamItem={[]} />);
      
      // Should still render the header
      expect(screen.getByText('Meet the Team')).toBeInTheDocument();
      
      // But no team members
      expect(screen.queryAllByTestId('rds-team-member')).toHaveLength(0);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles single team member data correctly', () => {
      const singleTeamData = [
        [
          {
            imgLink: 'https://example.com/profile1.jpg',
            title: 'Single Member',
            subTitle: 'Solo Position',
            description: 'This is a test for a single team member.',
            twitterIcon: 'twitter'
          }
        ]
      ];
      
      render(<RdsCompTeams teamItem={singleTeamData} />);
      
      const teamMembers = screen.getAllByTestId('rds-team-member');
      expect(teamMembers).toHaveLength(1);
    });
    
    it('handles large team data sets correctly', () => {
      // Create a large team data set
      const largeTeamData = Array(10).fill(0).map((_, i) => [
        {
          imgLink: `https://example.com/profile${i}.jpg`,
          title: `Team Member ${i}`,
          subTitle: `Position ${i}`,
          description: `Description ${i}`,
          twitterIcon: 'twitter'
        }
      ]);
      
      render(<RdsCompTeams teamItem={largeTeamData} />);
      
      const teamMembers = screen.getAllByTestId('rds-team-member');
      expect(teamMembers).toHaveLength(10);
    });
  });
});
