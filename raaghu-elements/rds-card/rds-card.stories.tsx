import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCard from './rds-card';
import RdsButton from '../rds-button/rds-button';
import RdsBadge from '../rds-badge/rds-badge';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsInput from '../rds-input/rds-input';
import { Typography, CardContent, CardActions } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';

const meta: Meta<typeof RdsCard> = {
  title: 'Elements/Card',
  component: RdsCard,
  parameters: {
    layout: 'padded',
    // hide auto-generated `component` control from Controls panel
  controls: { exclude: ['component', 'elevation'] },
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'text',
      description: 'Padding for the card content',
    },
    elevation: {
      control: 'number',
      description: 'Elevation (shadow) of the card',
    },
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description: 'Variant of the card',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'disabled'],
      description: 'Choose between four states Default, Hover, Disabled, and Selected to visually indicate the card\'s interaction status.',
    },
    showIndicator: {
      control: 'boolean',
      description: 'Toggle this switch to show or hide the card\'s indicator, depending on the design needs.',
    },
    style: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Pick from three styles: Default for a clean look, Filled for a solid background, and Outlined for a bordered appearance.',
    },
    showTitle: {
      control: 'boolean',
      description: 'Toggle this switch to show or hide the card\'s Title, depending on the design needs.',
    },
    showSubtext: {
      control: 'boolean',
      description: 'Toggle this to hide or display a subtitle under the header.',
    },
    showDescription: {
      control: 'boolean',
      description: 'Toggle this to hide or display the description text.',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Choose the layout orientation of the card content.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Toggle this switch to show or hide the card\'s icon.',
    },
    changeIcon: {
      control: 'select',
      options: [
        'person', 'home', 'settings', 'favorite', 'star', 'email', 'phone', 'location', 
        'camera', 'image', 'music', 'video', 'document', 'folder', 'calendar', 'clock', 
        'search', 'add', 'edit', 'delete', 'check', 'close', 'arrow_forward', 'arrow_back', 
        'download', 'upload', 'share', 'notification'
      ],
      description: 'Choose the icon to display.',
    },
    title: {
      control: 'text',
      description: 'Set the main title text for the card. This will be displayed as the primary heading.',
    },
    cardSubtext: {
      control: 'text',
      description: 'Set the subtitle text for the card. This will be displayed below the title.',
    },
    description: {
      control: 'text',
      description: 'Set the description text for the card. This will be displayed below the subtitle as body content.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: true,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
    description: 'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo',
    children: (
      <RdsButton 
        text="Link Button >"
        style="transparent"
        size="small"
        sx={{ mt: 1, p: 0, textTransform: 'none' }}
      />
    ),
  },
};
Default.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    showDescription: true,
    description: 'This card has increased elevation (shadow).',
    elevation: 8,
    children: (
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          Elevated Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has increased elevation (shadow).
        </Typography> */}
      </CardContent>
    ),
  },
};
Elevated.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    showDescription: true,
    description: 'This is an outlined card variant.',
  },
};
Outlined.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding']  
  } 
};

export const WithActions: Story = {
  args: {
    state: 'default',
    title: 'Card with Actions',
    showDescription: true,
    description: 'This card includes action buttons at the bottom.',
    children: (
      <>
        <CardActions style={{ marginLeft: '-12px' }}>
          <RdsButton text="Learn More" size="small" textCase='capitalize' style="transparent" />
          <RdsButton text="Share" size="small" textCase='capitalize' style="transparent" />
        </CardActions>
      </>
    ),
  },
};
WithActions.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};
export const WithAvatar: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: false,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
  } as any,
  parameters: {
    controls: {
      include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'isEditing'],
    },
  },
  argTypes: {
    isEditing: {
      control: 'boolean',
      description: 'Toggle to show or hide the edit icon functionality.',
      defaultValue: false,
    },
  } as any,
  render: (args) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableData, setEditableData] = useState({
      title: args.title || 'Card Title',
      cardSubtext: args.cardSubtext || 'Card Subtitle',
      avatarName: 'Jane Doe',
      avatarDesignation: 'Designation'
    });
    const [tempData, setTempData] = useState(editableData);

    // Get the isEditing control value, defaulting to true
    const isEditingEnabled = (args as any).isEditing !== undefined ? (args as any).isEditing : true;

    const handleEditClick = () => {
      setTempData(editableData);
      setIsEditMode(true);
    };

    const handleSave = () => {
      setEditableData(tempData);
      setIsEditMode(false);
    };

    const handleCancel = () => {
      setTempData(editableData);
      setIsEditMode(false);
    };

    const handleInputChange = (field: string, value: string) => {
      setTempData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <RdsCard
        {...args}
        title={isEditMode ? undefined : editableData.title}
        cardSubtext={isEditMode ? undefined : editableData.cardSubtext}
      >
        {isEditMode && (
          <div className="rds-card__editable-field">
            <RdsInput
              value={tempData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Card Title"
              variant="outlined"
              size="small"
              fullWidth
              className="rds-card__input--title"
            />
            <RdsInput
              value={tempData.cardSubtext}
              onChange={(e) => handleInputChange('cardSubtext', e.target.value)}
              placeholder="Card Subtitle"
              variant="outlined"
              size="small"
              fullWidth
              className="rds-card__input--subtitle"
            />
          </div>
        )}
        <div className={`rds-card__avatar-section${isEditMode ? ' rds-card__avatar-section--editable' : ''}`}>
          <div className="rds-card__avatar-row">
            <RdsAvatar 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b9ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              alt="Jane Doe"
              size="small"
              activityRing={true}
            />
            <div className="rds-card__avatar-info">
              {isEditMode ? (
                <div className="rds-card__editable-field">
                  <RdsInput
                    value={tempData.avatarName}
                    onChange={(e) => handleInputChange('avatarName', e.target.value)}
                    placeholder="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="rds-card__input--avatar-name"
                  />
                  <RdsInput
                    value={tempData.avatarDesignation}
                    onChange={(e) => handleInputChange('avatarDesignation', e.target.value)}
                    placeholder="Designation"
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="rds-card__input--avatar-designation"
                  />
                </div>
              ) : (
                <>
                  <div className="rds-card__avatar-name">
                    {editableData.avatarName}
                  </div>
                  <div className="rds-card__avatar-designation">
                    {editableData.avatarDesignation}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="rds-card__edit-controls">
            {isEditingEnabled && (
              <>
                {!isEditMode ? (
                  <div className="rds-card__edit-icon" onClick={handleEditClick} style={{ marginTop: '10px', marginRight: '10px' }}>
                    <Edit />
                  </div>
                ) : (
                  <div className="rds-card__edit-actions">
                    <RdsButton 
                      text="Save"
                      style="filled"
                      textCase='capitalize'
                      color="primary"
                      size="small"
                      onClick={handleSave}
                    />
                    <RdsButton 
                      text="Cancel"
                      style="outlined"
                      textCase='capitalize'
                      color="primary"
                      size="small"
                      onClick={handleCancel}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </RdsCard>
    );
  },
};
WithAvatar.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding']  
  } 
};

export const WithBadges: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: false,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
    children: (
      <div className="rds-card__badges">
        <RdsBadge 
          badgeContent="Design System"
          colorVariant="secondary"
          styleType="primary"
          size="medium"
          shape="rectangle"
        />
        <RdsBadge 
          badgeContent="Javascript"
          colorVariant="primary"
          styleType="primary"
          size="medium"
          shape="rectangle"
        />
      </div>
    ),
  },
};
WithBadges.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};

export const WithButton: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: true,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
    description: 'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo',
    children: (
      <div className="rds-card__button-group">
        <RdsButton
          text="Cancel"
          style="transparent"
          textCase='capitalize'
          color="primary"
          size="small"
        />
        <RdsButton
          text="Okay"
          style="filled"
          textCase='capitalize'
          color="primary"
          size="small"
        />
      </div>
    ),
  },
};
WithButton.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding']   } 
};

export const WithCustomPadding: Story = {
  args: {
    title: 'Card with Custom Padding',
    showDescription: true,
    description: 'This card has custom padding applied.',
    padding: '24px',
  },
};
WithCustomPadding.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding']  
  } 
};

export const WithImage: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: false,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
    children: (
      <>
        <div className="rds-card__image">
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Modern living room interior"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '16px'
            }}
          />
        </div>
        <div className="rds-card__description">
          In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
        </div>
        <div className="rds-card__button-group">
          <RdsButton
            text="Cancel"
            style="transparent"
            textCase='capitalize'
            color="primary"
            size="small"
          />
          <RdsButton
            text="Okay"
            style="filled"
            textCase='capitalize'
            color="primary"
            size="small"
          />
        </div>
      </>
    ),
  },
};
WithImage.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};

export const WithLinkButton: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: true,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
    description: 'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo',
    children: (
      <RdsButton
        text="Link Button >"
        style="transparent"
        size="small"
        sx={{ mt: 1, p: 0, textTransform: 'none' }}
      />
    ),
  },
};
WithLinkButton.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};

export const WithTags: Story = {
  args: {
    state: 'default',
    style: 'default',
    showIndicator: true,
    showTitle: true,
    showSubtext: true,
    showDescription: false,
    layout: 'vertical',
    showIcon: true,
    changeIcon: 'person',
    title: 'Card Title',
    cardSubtext: 'Card Subtitle',
    children: (
      <>
        <div className="rds-card__tags">
          <RdsBadge 
            badgeContent="Javascript"
            colorVariant="primary"
            styleType="primary"
            size="medium"
            shape="rectangle"
          />
        </div>
        <div className="rds-card__long-description">
          In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo In a laoreet purus. Integer turpis quam, laoreet id orci n...
        </div>
        <div className="rds-card__metadata">
          210 Questions
        </div>
      </>
    ),
  },
};
WithTags.parameters = { 
  controls: { 
    include: ['state', 'style', 'showIndicator', 'showTitle', 'showSubtext', 'showDescription', 'layout', 'showIcon', 'changeIcon', 'title', 'cardSubtext', 'description', 'children', 'variant', 'padding'] 
  } 
};