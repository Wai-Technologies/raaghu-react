import React, { useState } from "react";
import { 
  History, 
  StarBorder, 
  Star, 
  Edit, 
  Delete,
} from '@mui/icons-material';
import { 
  RdsButton,
  RdsCarousel,
  RdsTypography,
  RdsBadge,
  RdsCounter,
  RdsSearch,
  RdsAvatar,
  RdsAccordion
} from "../../raaghu-elements";
import RdsCompTreeStructure, { IconType, TreeLevel } from '../rds-comp-tree-structure/rds-comp-tree-structure';

export interface HistoryFavoriteTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  historyTabLabel?: string;
  favouritesTabLabel?: string;
  addtoscreen?: string;
  addtofolder?: string;
  style?: string;
  historyItems: { id: number; name: string }[];
  olderHistoryItems: { id: number; name: string }[];
  handleDeleteHistoryItem: (id: number) => void;
  handleDeleteOlderHistoryItem: (id: number) => void;
  favouriteCardTitle?: string;
  favouriteCardImage?: string;
}

export interface RealEstateContentProps {
  estateTitle?: string;
  estateDescription?: string;
  carouselImages?: { src: string; alt: string }[];
}

export interface SelectionContentProps {
  headerText?: string;
  headerSubText?: string;
}

export interface ToolbarContentProps {
  initialTab?: string;
}

export interface ThumbnailViewContentProps {
  thumbnailButtonName?: string;
}

export const HistoryFavoritesTabs: React.FC<HistoryFavoriteTabsProps> = ({
  activeTab,
  setActiveTab,
  historyTabLabel = "History",
  favouritesTabLabel = "Favourites",
  addtoscreen = "Add to screen",
  addtofolder = "Add to folder",
  style,
  historyItems = [],
  olderHistoryItems = [],
  handleDeleteHistoryItem,
  handleDeleteOlderHistoryItem,
  favouriteCardTitle = 'Create a Login page for signing up with a discount offer. It should have a field for the user\'s email and a "Get Discount" button.',
  favouriteCardImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
}) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const TABS = [
    { key: "history", label: historyTabLabel, icon: <History /> },
    { key: "favourites", label: favouritesTabLabel, icon: <StarBorder /> },
  ];

  // Helper for toggling selection of favorites
  const toggleSelection = (idx: number) => {
    setSelectedIndexes(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Render history item row
  const renderHistoryItem = (item: { id: number; name: string }, handleDelete: (id: number) => void) => (
    <div key={item.id} className="rds-comp-details-pane__activity-item">
      <div className="rds-comp-details-pane__activity-icon">
        <History className="rds-comp-details-pane__icon-history" />
      </div>
      <span className="rds-comp-details-pane__activity-text">{item.name}</span>
      <div className="rds-comp-details-pane__activity-delete">
        <Delete
          color="error"
          className="rds-comp-details-pane__icon-delete"
          onClick={() => handleDelete(item.id)}
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="rds-comp-details-pane__tab-container">
        <div className="rds-comp-details-pane__tab-buttons">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`rds-comp-details-pane__tab-btn${
                activeTab === tab.key ? " rds-comp-details-pane__tab-btn--active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="rds-comp-details-pane__tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="rds-comp-details-pane__tab-underline-wrapper">
          <div
            className={`rds-comp-details-pane__tab-underline rds-comp-details-pane__tab-underline--${activeTab}`}
          ></div>
        </div>
      </div>

      <div className="rds-comp-details-pane__content">
        {activeTab === "history" && (
          <div
            className="rds-comp-details-pane__tab-pane"
            id="history"
            role="tabpanel"
          >
            {/* Today's history */}
            <div className="rds-comp-details-pane__section-heading">
              <span className="rds-comp-details-pane__section-heading-text">Today</span>
              <span className="rds-comp-details-pane__section-heading-line"></span>
            </div>
            <div>
              {historyItems.map(item => renderHistoryItem(item, handleDeleteHistoryItem))}
            </div>
            
            {/* Older history */}
            <div className="rds-comp-details-pane__section-heading">
              <span className="rds-comp-details-pane__section-heading-text">Older</span>
              <span className="rds-comp-details-pane__section-heading-line"></span>
            </div>
            <div>
              {olderHistoryItems.map(item => renderHistoryItem(item, handleDeleteOlderHistoryItem))}
            </div>
          </div>
        )}
        
        {activeTab === "favourites" && (
          <div
            className="rds-comp-details-pane__tab-pane"
            id="favourites"
            role="tabpanel"
          >
            <div className="rds-comp-details-pane__favourite-list">
              {[0, 1].map((idx) => (
                <div
                  className={`rds-comp-details-pane__favourite-card${
                    selectedIndexes.includes(idx) ? " rds-comp-details-pane__favourite-card--selected" : ""
                  }`}
                  key={idx}
                  onClick={() => toggleSelection(idx)}                 
                >
                  <div className="rds-comp-details-pane__favourite-card-header">
                    <input
                      type="checkbox"
                      className="rds-comp-details-pane__favourite-checkbox"
                      checked={selectedIndexes.includes(idx)}
                      readOnly
                    />
                    <span className="rds-comp-details-pane__favourite-title">
                      {favouriteCardTitle}
                    </span>
                    <span className="rds-comp-details-pane__favourite-edit-icon-wrapper">
                      <Edit className="rds-comp-details-pane__icon-edit" />
                    </span>
                  </div>
                  <div className="rds-comp-details-pane__favourite-card-image-wrapper">
                    <img
                      src={favouriteCardImage}
                      alt="Login page"
                      className="rds-comp-details-pane__favourite-card-image"
                    />
                    <span className="rds-comp-details-pane__favourite-card-image-star">
                      <Star
                        className="rds-comp-details-pane__icon-star"
                        color="primary"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rds-comp-details-pane__footer-fixed">
              {style === "Favourites - New Folder" ? (
                <RdsButton
                  color="primary"
                  size="medium"
                  fullWidth
                  text={`${addtofolder} (${selectedIndexes.length})`}
                />
              ) : style === "Favourites" ? (
                <RdsButton
                  color="primary"
                  size="medium"
                  fullWidth
                  text={addtoscreen}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * RealEstateContent - Component for the real estate view
 */
export const RealEstateContent: React.FC<RealEstateContentProps> = ({
  estateTitle,
  estateDescription,
  carouselImages = []
}) => {
  // Define badges array with sample data
  const badges: { content: string; color: "primary" | "secondary" | "success" | "default" | "error" | "info" | "warning"; size: "small" | "medium" | "large"; shape?: "rectangle" | "pill" }[] = [
    { content: "O Badge", color: "primary", size: "small", shape: "rectangle" },
    { content: "O Badge", color: "primary", size: "small", shape: "rectangle" },
    { content: "O Badge", color: "primary", size: "small", shape: "rectangle" }
  ];

  return (
    <div className="custom-content-wrapper" id="details-pane-container">
      <div className="rds-comp-details-pane__detail-pane-container">
        {/* Image Carousel */}
        <div className="rds-comp-details-pane__real-estate-carousel" id="carousel-indicator">
          <RdsCarousel
            autoPlay={false}
            height="200px"
            showArrows={false}
            showDots={true}
            style="default"
            type="circle"
          >
            {carouselImages.map((image, index) => (
              <div key={index}>
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="rds-comp-details-pane__thumbnail-img-square"
                />
              </div>
            ))}
          </RdsCarousel>
        </div>
        
        <div>
          {/* Title */}
          <div className="rds-comp-details-pane__real-estate-title" id="text-color-change">
            <RdsTypography variant="h6" fontWeight="bold">
              {estateTitle}
            </RdsTypography>
          </div>

          {/* Badges */}
          <div className="rds-comp-details-pane__real-estate-badges">
            {badges.map((badge, index) => (
              <span 
                key={index} 
                className={`rds-comp-details-pane__badge-item`}
              >
                <RdsBadge 
                  badgeContent={badge.content} 
                  color={badge.color} 
                  size={badge.size}
                  shape={badge.shape}
                />
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="rds-comp-details-pane__real-estate-description" id="estate-description">
            <RdsTypography variant="body2" fontWeight="normal">
              {estateDescription}
            </RdsTypography>
          </div>

          {/* Guest Information */}
          <div className="rds-comp-details-pane__real-estate-footer">
            <RdsTypography variant="body1" fontWeight="600">
              1 Adult, 0 Children
            </RdsTypography>
          </div>

          {/* Guest Selection Controls */}
          <div className="rds-comp-details-pane__guest-selection-container">
            <div className="rds-comp-details-pane__guest-counter">
              <div>
<RdsCounter
  max={98}
  min={1}
  onChange={function OY(){}}
  placeholder={5}
  showInput
  size="small"
  step={2}  
  variant="default"
/>
              </div>
            </div>
            <div className="rds-comp-details-pane__counter-button-left">
              <RdsButton
  changeLeftIcon="circle"
  changeRightIcon="circle"
  color="primary"
  layout="icon+text"
  shape="rectangle"
  showLeftIcon
  showRightIcon
  size="medium"
  state="default"
  style="filled"
  text=" Add Guests"
  textCase="uppercase"
/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SelectionContent - Component for the selection view
 */
export const SelectionContent: React.FC<SelectionContentProps> = ({
  headerText = "Bayshore Transportation System",
  headerSubText = "Agent Information"
}) => {
  // Sample agent data
  const agents = [
    { id: 1, name: "Jane Doe", designation: "Designation", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", count: 4 },
    { id: 2, name: "Jane Doe", designation: "Designation", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", count: 4 },
    { id: 3, name: "Jane Doe", designation: "Designation", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", count: 4 }
  ];

  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="custom-content-wrapper" id="detail-pane-container-2">
      <div className="detail-pane-container rds-comp-details-pane__selection-container" id="detail-pain-lable">
        {/* Header */}
        <div className="rds-comp-details-pane__header-container">
          <h2 className="rds-comp-details-pane__title">{headerText}</h2>
          <p className="rds-comp-details-pane__subtitle">{headerSubText}</p>
        </div>
        
        <hr className="rds-comp-details-pane__divider" />
        
        {/* Search */}
        <div className="rds-comp-details-pane__search-container">
          <RdsSearch
            value={searchValue}
            onChange={value => setSearchValue(value)}
            iconPosition="right"
            labelPosition="top"
            placeholder="Search for Agents by Name or # ID"
            size="small"
            fullWidth
            className="rds-comp-details-pane__search-field rds-comp-details-pane__search-field--compact"
          />
          
        </div>
        
        {/* Agent list */}
        <div>
          {agents.map((agent) => (
            <div key={agent.id} className="rds-comp-details-pane__agent-card">
              <div className="rds-comp-details-pane__agent-left">
                <div className="rds-comp-details-pane__agent-avatar">
                  <RdsAvatar
                    alt="User Avatar"
                    displayStyle="with-name"
                    showDesignation
                    showName
                    src={agent.avatar}
                    subText={agent.designation}
                    title={agent.name}
                  />
                </div>                
              </div>
              <div className="rds-comp-details-pane__agent-actions">
                <div className="rds-comp-details-pane__agent-badge">{agent.count}</div>
                <div className="rds-comp-details-pane__agent-radio">
                  <input 
                    type="radio" 
                    name="agent-select" 
                    className="rds-comp-details-pane__agent-radio-input" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * ToolbarContent - Component for the toolbar view
 */
export const ToolbarContent: React.FC<{
  initialTab?: string;
}> = ({
  initialTab = 'icon_font'
}) => {
  const [activeToolbarTab, setActiveToolbarTab] = useState<string>(initialTab);
  const [selectedFontSize, setSelectedFontSize] = useState<number>(16);
  const [selectedFontWeight, setSelectedFontWeight] = useState<string>('Regular');
  const [selectedCornerRadius, setSelectedCornerRadius] = useState<string | number>(0);
  const [selectedSpacingSize, setSelectedSpacingSize] = useState<number | string>(0);

  return (
    <div className="custom-content-wrapper">
      <div className="rds-comp-details-pane__toolbar-pane-container">
        <div className="rds-comp-details-pane__toolbar-content">
          <div>
            <h3>Toolbar</h3>
            <div className="rds-comp-details-pane__toolbar-buttons-row">
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='circle'
                  showLeftIcon
                  layout="icon-only"
                  shape="rectangle"
                  size="medium"
                  state="default"
                  style={activeToolbarTab === 'icon_font' ? 'filled' : 'transparent'}
                  text="Default Button"
                  textCase="uppercase"
                  onClick={() => setActiveToolbarTab('icon_font')}
                />
              </div>
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='circle'
                  showLeftIcon
                  layout="icon-only"
                  shape="rectangle"
                  size="medium"
                  state="default"
                  style={activeToolbarTab === 'icon_color' ? 'filled' : 'transparent'}
                  text="Default Button"
                  textCase="uppercase"
                  onClick={() => setActiveToolbarTab('icon_color')}
                />
              </div>
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='circle'
                  showLeftIcon  
                  layout="icon-only"
                  shape="rectangle"
                  size="medium"
                  state="default"
                  style={activeToolbarTab === 'icon_frame' ? 'filled' : 'transparent'}
                  text="Default Button"
                  textCase="uppercase"
                  onClick={() => setActiveToolbarTab('icon_frame')}
                />
              </div>
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='circle'
                  showLeftIcon
                  layout="icon-only"
                  shape="rectangle"
                  size="medium"
                  state="default"
                  style={activeToolbarTab === 'icon_line_height' ? 'filled' : 'transparent'}
                  text="Default Button"
                  textCase="uppercase"
                  onClick={() => setActiveToolbarTab('icon_line_height')}
                />
              </div>
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='circle'
                  showLeftIcon
                  layout="icon-only"
                  shape="rectangle"
                  size="medium"
                  state="default"
                  style={activeToolbarTab === 'icon_block' ? 'filled' : 'transparent'}
                  text="Default Button"
                  textCase="uppercase"
                  onClick={() => setActiveToolbarTab('icon_block')}
                />
              </div>
            </div>
            <hr className="rds-comp-details-pane__toolbar-divider" />
            {/* Toolbar tab content */}
            <div>
              {activeToolbarTab === 'icon_font' && (
                <div>
                  <div className="mb-3">
                    <p className="rds-comp-details-pane__font-name fw-bold">Font Name : Poppins</p>
                    <hr className="rds-comp-details-pane__toolbar-divider"/>
                  </div>
                  <div className="rds-comp-details-pane__font-size-btn-group">
                    <p className="rds-comp-details-pane__font-label">Font Size</p>
                    <div className="rds-comp-details-pane__font-size-grid">
                      <div className="rds-comp-details-pane__row">
                        {[14, 16, 18, 20, 24].map(size => (
                          <div key={size} className="rds-comp-details-pane__grid-cell">
                            <button
                              type="button"
                              className={`rds-comp-details-pane__font-size-btn${selectedFontSize === size ? ' rds-comp-details-pane__font-size-btn--selected' : ''}`}
                              onClick={() => setSelectedFontSize(size)}
                            >
                              {size}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="rds-comp-details-pane__row">
                        {[32, 36, 48, 60, 72].map(size => (
                          <div key={size} className="rds-comp-details-pane__grid-cell">
                            <button
                              type="button"
                              className={`rds-comp-details-pane__font-size-btn${selectedFontSize === size ? ' rds-comp-details-pane__font-size-btn--selected' : ''}`}
                              onClick={() => setSelectedFontSize(size)}
                            >
                              {size}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="rds-comp-details-pane__font-weight-btn-group">
                    <p className="rds-comp-details-pane__font-label">Font Weight</p>
                    <div className="rds-comp-details-pane__font-weight-grid">
                      <div className="rds-comp-details-pane__row">
                        {['Regular', 'Medium'].map(weight => (
                          <div key={weight} className="rds-comp-details-pane__grid-cell rds-comp-details-pane__weight-cell">
                            <button 
                              type="button" 
                              className={`rds-comp-details-pane__font-weight-btn${selectedFontWeight === weight ? ' rds-comp-details-pane__font-weight-btn--selected' : ''}`} 
                              onClick={() => setSelectedFontWeight(weight)}
                            >
                              {weight}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="rds-comp-details-pane__row">
                        {['Semi Bold', 'Bold'].map(weight => (
                          <div key={weight} className="rds-comp-details-pane__grid-cell rds-comp-details-pane__weight-cell">
                            <button 
                              type="button" 
                              className={`rds-comp-details-pane__font-weight-btn${selectedFontWeight === weight ? ' rds-comp-details-pane__font-weight-btn--selected' : ''}`} 
                              onClick={() => setSelectedFontWeight(weight)}
                            >
                              {weight}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeToolbarTab === 'icon_color' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                  >
                    Your Color Palette
                  </RdsTypography>
                  <div className="rds-comp-details-pane__palette-grid">
                    <RdsButton
                      color="primary"
                      size="small"
                      layout="text-only"
                      style="filled"
                      text="Primary"
                      fullWidth
                    />
                    <RdsButton
                      color="primary"
                      size="small"
                      layout="text-only"
                      style="filled"
                      text="Primary"
                      fullWidth
                    />
                    <RdsButton
                      color="primary"
                      size="small"
                      layout="text-only"
                      style="filled"
                      text="Primary"
                      fullWidth
                    />
                    <RdsButton
                      color="primary"
                      size="small"
                      layout="text-only"
                      style="filled"
                      text="Primary"
                      fullWidth
                    />
                  </div>
                </div>
              )}
              {activeToolbarTab === 'icon_frame' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                  >
                    Corner Radius Size
                  </RdsTypography>
                   <div className="rds-comp-details-pane__corner-size-grid">
                      <div className="rds-comp-details-pane__row">
                        {[0, 2, 4, 6, 8].map(size => (
                          <div key={size} className="rds-comp-details-pane__grid-cell">
                            <button
                              type="button"
                              className={`rds-comp-details-pane__font-size-btn${selectedCornerRadius === size ? ' rds-comp-details-pane__font-size-btn--selected' : ''}`}
                              onClick={() => setSelectedCornerRadius(size)}
                            >
                              {size}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="rds-comp-details-pane__row">
                        {[12, 24, 48, 96, 'MAX'].map(size => (
                          <div key={size} className="rds-comp-details-pane__grid-cell">
                            <button
                              type="button"
                              className={`rds-comp-details-pane__font-size-btn${selectedCornerRadius === size ? ' rds-comp-details-pane__font-size-btn--selected' : ''}`}
                                onClick={() => setSelectedCornerRadius(size)}
                            >
                              {size}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              )}
              {activeToolbarTab === 'icon_line_height' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                  >
                    Spacing Size
                  </RdsTypography>
                 <div className="rds-comp-details-pane__spacing-size-grid">
                      <div className="rds-comp-details-pane__row">
                        {[0, 2, 4, 6, 8].map(size => (
                          <div key={size} className="rds-comp-details-pane__grid-cell">
                            <button
                              type="button"
                              className={`rds-comp-details-pane__font-size-btn${selectedSpacingSize === size ? ' rds-comp-details-pane__font-size-btn--selected' : ''}`}
                              onClick={() => setSelectedSpacingSize(size)}
                            >
                              {size}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="rds-comp-details-pane__row">
                        {[12, 24, 48, 96, 'MAX'].map(size => (
                          <div key={size} className="rds-comp-details-pane__grid-cell">
                            <button
                              type="button"
                              className={`rds-comp-details-pane__font-size-btn${selectedSpacingSize === size ? ' rds-comp-details-pane__font-size-btn--selected' : ''}`}                             
                              onClick={() => setSelectedSpacingSize(size)}
                            >
                              {size}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              )}
              {activeToolbarTab === 'icon_block' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                  >
                    Component List
                  </RdsTypography>
                  <div>
                    <RdsCompTreeStructure
                      Language="TypeScript"
                      level={TreeLevel.Level3}
                      showActions
                      showChewron
                      showFolder
                      text="Name"
                      treeData={[
                        {
      children: [
        {
          children: [
            {
              children: [
                {
                  icon: 'file',
                  id: 4,
                  name: 'Name'
                }
              ],
              icon: 'file',
              id: 3,
              name: 'Name'
            }
          ],
          icon: 'folder',
          id: 2,
          name: 'Elements'
        }
      ],
      icon: 'folder',
      id: 1,
      name: 'Name'
    },
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  icon: 'file',
                  id: 8,
                  name: 'Name'
                }
              ],
              icon: 'file',
              id: 7,
              name: 'Name'
            }
          ],
          icon: 'folder',
          id: 6,
          name: 'Name'
        }
      ],
      icon: 'folder',
      id: 5,
      name: 'Name'
    },
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  icon: 'file',
                  id: 12,
                  name: 'Name'
                }
              ],
              icon: 'file',
              id: 11,
              name: 'Name'
            }
          ],
          icon: 'folder',
          id: 10,
          name: 'Name'
        }
      ],
      icon: 'folder',
      id: 9,
      name: 'Name'
    },
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  icon: 'file',
                  id: 16,
                  name: 'Name'
                }
              ],
              icon: 'file',
              id: 15,
              name: 'Name'
            }
          ],
          icon: 'folder',
          id: 14,
          name: 'Name'
        }
      ],
      icon: 'folder',
      id: 13,
      name: 'Name'
    }
  ]}
  type={IconType.Folder}
/>
<RdsCompTreeStructure
  Language="TypeScript"
  level={TreeLevel.Level2}
  showActions
  showChewron
  showFolder 
  text="App Shell"
  
  treeData={[
    {
      children: [
        {
          children: [
            {
              children: [
                
              ],
              icon: 'file',
              id: 3,
              name: 'App Shell'
            }
          ],
          icon: 'folder',
          id: 2,
          name: 'App Shell'
        }
      ],
     
    },
    {
      children: [
        {
          children: [
            {
              children: [
               
              ],
              icon: 'file',
              id: 7,
              name: 'App Shell'
            }
          ],
          icon: 'folder',
          id: 6,
          name: 'Layout'
        }
      ],
      icon: 'folder',
      id: 5,
      name: 'Layout'
    },
    ]}
  type={IconType.Circle}
/>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="rds-comp-details-pane__detail-pane-footer">
          <button className="rds-comp-details-pane__figma-button">                 
            Download the Figma UI Kit
          </button>
          <button className="rds-comp-details-pane__storybook-button">
            Go to Storybook
          </button>
        </div>
      </div>
    </div>
  );
};

export const ThumbnailViewContent: React.FC<{
  thumbnailButtonName?: string;
}> = ({
  thumbnailButtonName
}) => {
  const accordionItems = [
    { title: "Title", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
    { title: "Title", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
    { title: "Title", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="rds-comp-details-pane__thumbnail-view-wrapper">
      <div className="rds-comp-details-pane__thumbnail-content">
        <div className="rds-comp-details-pane__pages-header">
          Pages
        </div>

        <div className="rds-comp-details-pane__download-button-container">
          <button className="rds-comp-details-pane__download-button" onClick={() => {}}>
            {thumbnailButtonName || "Download Project"}
          </button>
        </div>

        <div className="rds-comp-details-pane__accordion-list">
          {accordionItems.map((item, idx) => (
            <RdsAccordion
              key={idx}
              size="medium"
              state="default"
              title={item.title}
              ShowLeftIcon={false}
            >
              <div>
                <img 
                  src={item.imgSrc}
                  alt="Night Sky"
                  className="rds-comp-details-pane__thumbnail-img-square"
                />
              </div>
            </RdsAccordion>
          ))}
        </div>
      </div>
    </div>
  );
};