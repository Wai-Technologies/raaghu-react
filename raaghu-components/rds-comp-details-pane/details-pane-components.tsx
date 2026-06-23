import { useState, useMemo, useCallback } from "react";
import clsx from 'clsx';
import { 
  History, 
  StarBorder, 
  Star, 
  Edit,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsCarousel from "../../raaghu-elements/rds-carousel/rds-carousel";
import RdsTypography from "../../raaghu-elements/rds-typography/rds-typography";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsCounter from "../../raaghu-elements/rds-counter/rds-counter";
import RdsSearch from "../../raaghu-elements/rds-search/rds-search";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import RdsAccordion from "../../raaghu-elements/rds-accordion/rds-accordion";
import RdsRadio from "../../raaghu-elements/rds-radio/rds-radio";
import RdsCheckbox from "../../raaghu-elements/rds-checkbox/rds-checkbox";
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
  figmaIconSrc?: string;
  storybookIconSrc?: string;
}

export interface ThumbnailViewContentProps {
  thumbnailButtonName?: string;
}

export interface FigmaUIKitButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  storybookIconSrc?: string;
  figmaIconSrc?: string;
  iconAlt?: string;
}

export interface StorybookButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  figmaIconSrc?: string;
  storybookIconSrc?: string;
  iconAlt?: string;
}

const EMPTY_HISTORY_ITEMS: { id: number; name: string }[] = [];
const EMPTY_CAROUSEL_IMAGES: { src: string; alt: string }[] = [];

export const FigmaUIKitButton = ({ 
  text = "Download the Figma UI Kit",
  onClick,
  figmaIconSrc,
  storybookIconSrc,
  iconAlt = "Figma",
  className = ""
}) => {
  return (
    <button 
      className={`rds-comp-details-pane__figma-ui-kit-button ${className}`}
      onClick={onClick}
      type="button"
    >
       {figmaIconSrc && (
        <span className="rds-comp-details-pane__figma-icon-wrapper" aria-hidden>
          <img 
            src={figmaIconSrc} 
            alt={iconAlt} 
            className="rds-comp-details-pane__figma-icon"
          />
        </span>
      )}
      <span className="rds-comp-details-pane__figma-button-text">{text}</span>
    </button>
  );
};

export const StorybookButton = ({ 
  text = "Go to Storybook",
  onClick,
  className = "",
  figmaIconSrc,
  storybookIconSrc,
  iconAlt = "Storybook"
}) => {
  return (
    <button 
      className={`rds-comp-details-pane__storybook-ui-kit-button ${className}`}
      onClick={onClick}
      type="button"
    >
      {storybookIconSrc && (
        <span className="rds-comp-details-pane__storybook-icon-wrapper" aria-hidden>
          <img 
            src={storybookIconSrc} 
            alt={iconAlt} 
            className="rds-comp-details-pane__storybook-icon"
          />
        </span>
      )}
    
      <span className="rds-comp-details-pane__storybook-button-text">{text}</span>
    </button>
  );
};

export const HistoryFavoritesTabs = ({
  activeTab,
  setActiveTab,
  historyTabLabel = "History",
  favouritesTabLabel = "Favourites",
  addtoscreen = "Add to screen",
  addtofolder = "Add to folder",
  style,
  historyItems,
  olderHistoryItems,
  handleDeleteHistoryItem,
  handleDeleteOlderHistoryItem,
  favouriteCardTitle = 'Create a Login page for signing up with a discount offer. It should have a field for the user\'s email and a "Get Discount" button.',
  favouriteCardImage = "https://dummyimage.com/400x260/007bff/ffffff&text=Login+Page",
}) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const resolvedHistoryItems = historyItems ?? EMPTY_HISTORY_ITEMS;
  const resolvedOlderHistoryItems = olderHistoryItems ?? EMPTY_HISTORY_ITEMS;

  const TABS = useMemo(() => [
    { key: "history", label: historyTabLabel, icon: <History /> },
    { key: "favourites", label: favouritesTabLabel, icon: <StarBorder /> },
  ], [favouritesTabLabel, historyTabLabel]);

  const toggleSelection = useCallback((idx: number) => {
    setSelectedIndexes(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  }, []);
  const renderHistoryItem = useCallback((item: { id: number; name: string }, handleDelete: (id: number) => void) => (
    <div key={item.id} className="rds-comp-details-pane__history-wrapper">
      <div className="rds-comp-details-pane__activity-item rds-comp-details-pane__history-item">
        <div className="rds-comp-details-pane__history-icon" aria-hidden>
          <History fontSize="small" className="rds-comp-details-pane__icon-history" />
        </div>
        <div className="rds-comp-details-pane__activity-body">
          <div
            className="rds-comp-details-pane__activity-text"
            title={item.name}
          >
            {item.name}
          </div>
        </div>
        <div className="rds-comp-details-pane__activity-delete rds-comp-details-pane__history-delete">
          <DeleteIcon
            color="error"
            fontSize="small"
            onClick={() => handleDelete(item.id)}
            className="rds-comp-details-pane__icon-delete"
            aria-label={`Delete ${item.name}`}
          />
        </div>
      </div>
      <div className="rds-comp-details-pane__history-divider" />
    </div>
  ), []);

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
            className={clsx("rds-comp-details-pane__tab-underline", "rds-comp-details-pane__tab-underline--")}
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
            <div className="rds-comp-details-pane__section-heading">
              <span className="rds-comp-details-pane__section-heading-text">Today</span>
              <span className="rds-comp-details-pane__section-heading-line"></span>
            </div>
            <div>
              {resolvedHistoryItems.map(item => renderHistoryItem(item, handleDeleteHistoryItem))}
            </div>
            
            <div className="rds-comp-details-pane__section-heading">
              <span className="rds-comp-details-pane__section-heading-text">Older</span>
              <span className="rds-comp-details-pane__section-heading-line"></span>
            </div>
            <div>
              {resolvedOlderHistoryItems.map(item => renderHistoryItem(item, handleDeleteOlderHistoryItem))}
            </div>
          </div>
        )}
        
        {activeTab === "favourites" && (
          <div
            className="rds-comp-details-pane__tab-pane"
            id="favourites"
            role="tabpanel"          >
            <div className="rds-comp-details-pane__favourite-list">
              {["fav-card-1", "fav-card-2"].map((cardKey, idx) => (
                <button
                  type="button"
                  className={`rds-comp-details-pane__favourite-card${
                    selectedIndexes.includes(idx) ? " rds-comp-details-pane__favourite-card--selected" : ""
                  }`}
                  key={cardKey}
                  onClick={() => toggleSelection(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSelection(idx);
                    }
                  }}
                >
                  <div className="rds-comp-details-pane__favourite-card-header">
                    <RdsCheckbox
                      className="rds-comp-details-pane__favourite-checkbox"
                      showText={false}
                      status={selectedIndexes.includes(idx) ? 'checked' : 'unchecked'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => { e.stopPropagation(); toggleSelection(idx); }}
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
                </button>
              ))}
            </div>
          </div>          
        )}
        {activeTab === "favourites" && (
          <div className="rds-comp-details-pane__footer-fixed">
            {style === "Favourites - New Folder" ? (
              <RdsButton
                color="primary"
                size="medium"
                fullWidth
                text={`${addtofolder} (${selectedIndexes.length})`}
              />
            ) : (
              <RdsButton
                color="primary"
                size="medium"
                fullWidth
                text={addtoscreen}
              />
            )}
          </div>
        )}
      </div>      
    </div>
  );
};

const REAL_ESTATE_BADGES: { content: string; color: "primary" | "secondary" | "success" | "default" | "error" | "info" | "warning"; size: "small" | "medium" | "large"; shape?: "rectangle" | "pill" }[] = [
  { content: "O Badge", color: "primary", size: "small", shape: "rectangle" },
  { content: "O Badge", color: "primary", size: "small", shape: "rectangle" },
  { content: "O Badge", color: "primary", size: "small", shape: "rectangle" }
];

export const RealEstateContent = ({
  estateTitle,
  estateDescription,
  carouselImages
}) => {
  const resolvedCarouselImages = carouselImages ?? EMPTY_CAROUSEL_IMAGES;
  const badges = REAL_ESTATE_BADGES;

  return (
    <div className="custom-content-wrapper" id="details-pane-container">
      <div className="rds-comp-details-pane__detail-pane-container">
        <div className="rds-comp-details-pane__real-estate-carousel" id="carousel-indicator">
          <RdsCarousel
            autoPlay={false}
            height="200px"
            showArrows={false}
            showDots={true}
            style="default"
            type="circle"
          >
            {resolvedCarouselImages.map((image, index) => (
              <div key={image.src || image.alt || `carousel-image-${index + 1}`}>
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
          <div className="rds-comp-details-pane__real-estate-title" id="text-color-change">
            <RdsTypography variant="h6" fontWeight="bold">
              {estateTitle}
            </RdsTypography>
          </div>

          <div className="rds-comp-details-pane__real-estate-badges">
            {badges.map((badge) => (
              <span 
                key={`${badge.content}-${badge.color}-${badge.size}-${badge.shape}`} 
                className={`rds-comp-details-pane__badge-item`}
              >
                <RdsBadge 
                  badgeContent={badge.content} 
                  color={badge.color} 
                  colorVariant="secondary"
                  size={badge.size}
                  shape={badge.shape}
                />
              </span>
            ))}
          </div>

          <div className="rds-comp-details-pane__real-estate-description" id="estate-description">
            <RdsTypography variant="body2" fontWeight="normal">
              {estateDescription}
            </RdsTypography>
          </div>

          <div className="rds-comp-details-pane__real-estate-footer">
            <RdsTypography variant="body1" fontWeight="600">
              1 Adult, 0 Children
            </RdsTypography>
          </div>

          <div className="rds-comp-details-pane__guest-selection-container">
            <div className="rds-comp-details-pane__guest-counter">
              <div>
<RdsCounter
  defaultValue={5}
  max={1000}
  min={0}
  size="medium"
  step={1}
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

const SELECTION_AGENTS = [
  { id: 1, name: "Jane Doe", designation: "Designation", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", count: 4 },
  { id: 2, name: "Jane Doe", designation: "Designation", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", count: 4 },
  { id: 3, name: "Jane Doe", designation: "Designation", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", count: 4 }
];

export const SelectionContent = ({
  headerSubText = "Agent Information"
}) => {
  const agents = SELECTION_AGENTS;

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const handleSearchChange = useCallback((value: string) => setSearchValue(value), []);
  const handleAgentSelect = useCallback((agentId: string) => setSelectedAgent(agentId), []);
  const handleAgentCardKeyDown = useCallback((e: KeyboardEvent, agentId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedAgent(agentId);
    }
  }, []);

  return (
    <div className="custom-content-wrapper" id="detail-pane-container-2">
      <div className="detail-pane-container rds-comp-details-pane__selection-container" id="detail-pain-lable">
        <div className="rds-comp-details-pane__header-container">
          <h3 className="rds-comp-details-pane__title"> Bayshore Transportation System </h3>
          <p className="rds-comp-details-pane__subtitle">{headerSubText}</p>
        </div>
        
        <hr className="rds-comp-details-pane__divider" />
        
        <div className="rds-comp-details-pane__search-container">
          <RdsSearch
            value={searchValue}
            onChange={handleSearchChange}
            iconPosition="right"
            labelPosition="top"
            placeholder="Search for Agents by Name or # ID"
            size="small"
            fullWidth
            className="rds-comp-details-pane__search-field rds-comp-details-pane__search-field--compact"
          />
          
        </div>
        
        <div>
          {agents.map((agent) => (
            <button
              type="button"
              key={agent.id}
              className={clsx("rds-comp-details-pane__agent-card", selectedAgent === String(agent.id) && " rds-comp-details-pane__agent-card--selected")}
                onClick={() => handleAgentSelect(String(agent.id))}
              onKeyDown={(e) => handleAgentCardKeyDown(e, String(agent.id))}
            >
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
                  <RdsRadio
                    direction="row"
                    label=""
                    layout="icon"
                    onChange={(val: React.ChangeEvent<HTMLInputElement>) => {
                      const parsed = typeof val === 'object' && val?.target ? String(val.target.value) : String(val);
                      handleAgentSelect(parsed);
                    }}
                    options={[
                      {
                        text: '',
                        value: String(agent.id),
                      },
                    ]}
                    radioProps={{ name: 'agent-selection' }}
                    state="default"
                    value={selectedAgent}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ToolbarContent = ({
  initialTab = 'icon_font',
  figmaIconSrc,
  storybookIconSrc
}) => {
  const [toolbarState, setToolbarState] = useState({
    activeToolbarTab: initialTab,
    selectedFontSize: 16,
    selectedFontWeight: 'Regular',
    selectedCornerRadius: 0 as string | number,
    selectedSpacingSize: 0 as number | string,
  });
  const { activeToolbarTab, selectedFontSize, selectedFontWeight, selectedCornerRadius, selectedSpacingSize } = toolbarState;
  const updateToolbarState = (updates: Partial<typeof toolbarState>) => {
    setToolbarState((prev) => ({ ...prev, ...updates }));
  };

  return (
      <>
    <div className="custom-content-wrapper">
      <div className="rds-comp-details-pane__toolbar-pane-container">
        <div className="rds-comp-details-pane__toolbar-content">
          <div>
            <h3>Toolbar</h3>
            <div className="rds-comp-details-pane__toolbar-buttons-row rds-comp-details-pane__toolbar-buttons-row--scrollable">
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
                  onClick={() => updateToolbarState({ activeToolbarTab: 'icon_font' })}
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
                  onClick={() => updateToolbarState({ activeToolbarTab: 'icon_color' })}
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
                  onClick={() => updateToolbarState({ activeToolbarTab: 'icon_frame' })}
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
                  onClick={() => updateToolbarState({ activeToolbarTab: 'icon_line_height' })}
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
                  onClick={() => updateToolbarState({ activeToolbarTab: 'icon_block' })}
                />
              </div>
            </div>
            <hr className="rds-comp-details-pane__toolbar-divider" />
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
                              className={clsx("rds-comp-details-pane__font-size-btn", selectedFontSize === size && " rds-comp-details-pane__font-size-btn--selected")}
                              onClick={() => updateToolbarState({ selectedFontSize: size })}
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
                              className={clsx("rds-comp-details-pane__font-size-btn", selectedFontSize === size && " rds-comp-details-pane__font-size-btn--selected")}
                              onClick={() => updateToolbarState({ selectedFontSize: size })}
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
                              className={clsx("rds-comp-details-pane__font-weight-btn", selectedFontWeight === weight && " rds-comp-details-pane__font-weight-btn--selected")} 
                              onClick={() => updateToolbarState({ selectedFontWeight: weight })}
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
                              className={clsx("rds-comp-details-pane__font-weight-btn", selectedFontWeight === weight && " rds-comp-details-pane__font-weight-btn--selected")} 
                              onClick={() => updateToolbarState({ selectedFontWeight: weight })}
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
                              className={clsx("rds-comp-details-pane__font-size-btn", selectedCornerRadius === size && " rds-comp-details-pane__font-size-btn--selected")}
                              onClick={() => updateToolbarState({ selectedCornerRadius: size })}
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
                              className={clsx("rds-comp-details-pane__font-size-btn", selectedCornerRadius === size && " rds-comp-details-pane__font-size-btn--selected")}
                                onClick={() => updateToolbarState({ selectedCornerRadius: size })}
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
                              className={clsx("rds-comp-details-pane__font-size-btn", selectedSpacingSize === size && " rds-comp-details-pane__font-size-btn--selected")}
                              onClick={() => updateToolbarState({ selectedSpacingSize: size })}
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
                              className={clsx("rds-comp-details-pane__font-size-btn", selectedSpacingSize === size && " rds-comp-details-pane__font-size-btn--selected")}                             
                                onClick={() => updateToolbarState({ selectedSpacingSize: size })}
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
      icon: 'folder',
      id: 1,
      name: 'App Shell'
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
          </div>
        </div>
        <div className="rds-comp-details-pane__detail-pane-footer">
          <FigmaUIKitButton 
            text="Download the Figma UI Kit"
            onClick={() => {
            }}
            className="rds-comp-details-pane__figma-button"
            figmaIconSrc={figmaIconSrc}
            iconAlt="Figma"
          />
          <StorybookButton 
            text="Go to Storybook"
            onClick={() => {
            }}
            className="rds-comp-details-pane__storybook-button"
             storybookIconSrc={storybookIconSrc}
            iconAlt="Storybook"
          />
        </div>
      </>
  );
};

const THUMBNAIL_ACCORDION_ITEMS = [
  { id: "thumb-1", title: "Title", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
  { id: "thumb-2", title: "Title", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
  { id: "thumb-3", title: "Title", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" }
];

export const ThumbnailViewContent = ({
  thumbnailButtonName
}) => {
  const accordionItems = THUMBNAIL_ACCORDION_ITEMS;

  return (
    <div className="rds-comp-details-pane__thumbnail-view-wrapper">
      <div className="rds-comp-details-pane__thumbnail-content">
        <div className="rds-comp-details-pane__pages-header">
          Pages
        </div>

        <div className="rds-comp-details-pane__download-button-container">
          <button type="button" className="rds-comp-details-pane__download-button">
            {thumbnailButtonName || "Download Project"}
          </button>
        </div>

      <div className="rds-comp-details-pane__accordion-list-container">
        <div className="rds-comp-details-pane__accordion-list">
          {accordionItems.map((item) => (
            <RdsAccordion
              key={item.id}
              accordionStyle="borderhide"
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
    </div>
  );
};

FigmaUIKitButton.displayName = 'FigmaUIKitButton';
StorybookButton.displayName = 'StorybookButton';
HistoryFavoritesTabs.displayName = 'HistoryFavoritesTabs';
RealEstateContent.displayName = 'RealEstateContent';
SelectionContent.displayName = 'SelectionContent';
ToolbarContent.displayName = 'ToolbarContent';
ThumbnailViewContent.displayName = 'ThumbnailViewContent';
