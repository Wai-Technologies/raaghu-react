import React, { useState } from "react";
import { 
  History, 
  StarBorder, 
  Star, 
  Edit, 
  Delete,
  Group
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

/**
 * HistoryFavoritesTabs - Component for displaying history and favorites tabs
 */
export const HistoryFavoritesTabs: React.FC<{
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
}> = ({
  activeTab,
  setActiveTab,
  historyTabLabel,
  favouritesTabLabel,
  addtoscreen,
  addtofolder,
  style,
  historyItems,
  olderHistoryItems,
  handleDeleteHistoryItem,
  handleDeleteOlderHistoryItem
}) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const TABS = [
    { key: "history", label: historyTabLabel || "History", icon: "history_watch" },
    { key: "favourites", label: favouritesTabLabel || "Favourites", icon: "starempty_outline" },
  ];

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
              <span className="rds-comp-details-pane__tab-icon">
                {tab.icon === "history_watch" ? (
                  <History />
                ) : (
                  <StarBorder />
                )}
              </span>
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
            <div className="rds-comp-details-pane__section-heading mb-2">
              <span className="rds-comp-details-pane__section-heading-text">Today</span>
              <span className="rds-comp-details-pane__section-heading-line"></span>
            </div>
            <div>
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="rds-comp-details-pane__activity-item mb-3"
                >
                  <div className="rds-comp-details-pane__activity-icon">
                    <History style={{ color: "#969696" }} />
                  </div>
                  <span className="rds-comp-details-pane__activity-text">{item.name}</span>
                  <div className="rds-comp-details-pane__activity-delete">
                    <Delete
                      color="error"
                      style={{ height: "15px", width: "15px", cursor: "pointer" }}
                      onClick={() => handleDeleteHistoryItem(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="rds-comp-details-pane__section-heading mt-3 mb-2">
              <span className="rds-comp-details-pane__section-heading-text">Older</span>
              <span className="rds-comp-details-pane__section-heading-line"></span>
            </div>
            <div>
              {olderHistoryItems.map((item) => (
                <div
                  key={item.id}
                  className="rds-comp-details-pane__activity-item mb-3"
                >
                  <div className="rds-comp-details-pane__activity-icon">
                    <History style={{ color: "#969696" }} />
                  </div>
                  <span className="rds-comp-details-pane__activity-text">{item.name}</span>
                  <div className="rds-comp-details-pane__activity-delete">
                    <Delete
                      color="error"
                      style={{ height: "15px", width: "15px", cursor: "pointer" }}
                      onClick={() => handleDeleteOlderHistoryItem(item.id)}
                    />
                  </div>
                </div>
              ))}
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
                  onClick={() => {
                    setSelectedIndexes((prev) =>
                      prev.includes(idx)
                        ? prev.filter((i) => i !== idx)
                        : [...prev, idx]
                    );
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="rds-comp-details-pane__favourite-card-header">
                    <input
                      type="checkbox"
                      className="rds-comp-details-pane__favourite-checkbox"
                      checked={selectedIndexes.includes(idx)}
                      readOnly
                    />
                    <span className="rds-comp-details-pane__favourite-title">
                      Create a Login page for signing up with a discount offer. It
                      should have a field for the user's email and a "Get Discount"
                      button.
                    </span>
                    <span className="rds-comp-details-pane__favourite-edit-icon-wrapper">
                      <Edit style={{ width: "17px", height: "17px", color: "#7D7D7D" }} />
                    </span>
                  </div>
                  <div className="rds-comp-details-pane__favourite-card-image-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                      alt="Login page"
                      className="rds-comp-details-pane__favourite-card-image"
                    />
                    <span className="rds-comp-details-pane__favourite-card-image-star">
                      <Star
                        style={{ width: "19px", height: "13px" }}
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
                  text={`${addtoscreen}`}
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
export const RealEstateContent: React.FC<{
  estateTitle?: string;
  estateDescription?: string;
}> = ({
  estateTitle,
  estateDescription
}) => {
  return (
    <div className="custom-content-wrapper" id="details-pane-container">
      <div className="rds-comp-details-pane__detail-pane-container p-0">
        <div className="rds-comp-details-pane__real-estate-carousel" id="carousel-indicator">
          <RdsCarousel
            autoPlay={false}
            height="200px"
            showArrows={true}
            showDots={true}
            style="default"
            type="circle"
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Night Sky"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
                alt="Mountain View"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
                alt="Nature View"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </RdsCarousel>
        </div>
        
        <div className="p-3">
          <div className="rds-comp-details-pane__real-estate-title" id="text-color-change">
            <RdsTypography
              variant="h6"
              fontWeight="bold"
            >
              {estateTitle || "Serene Studio Housing"}
            </RdsTypography>
          </div>

          <div className="rds-comp-details-pane__real-estate-badges mt-2">
            <span className="rds-comp-details-pane__badge-item me-2">
              <RdsBadge 
                badgeContent="O Badge" 
                color="secondary" 
                size="small"
              />
            </span>
            <span className="rds-comp-details-pane__badge-item me-2">
              <RdsBadge 
                badgeContent="O Badge" 
                color="secondary" 
                size="small"
              />
            </span>
            <span className="rds-comp-details-pane__badge-item">
              <RdsBadge 
                badgeContent="O Badge" 
                color="secondary" 
                size="small"
              />
            </span>
          </div>

          <div className="mt-2 rds-comp-details-pane__real-estate-description" id="estate-description">
            <RdsTypography
              variant="body2"
              fontWeight="normal"
            >
              {estateDescription || "This studio room is located in Major city. The famous Amazon and Amazonia beaches are approximately 10 minutes walk from here. The room has a kitchenette with basic utensils for cooking. There is a private attached bathroom. We have a smart tv for your entertainment. We provide complimentary Wi-Fi to our guests who also want to work."}
            </RdsTypography>
          </div>

          <div className="mt-4 mb-2 rds-comp-details-pane__real-estate-footer">
            <RdsTypography
              variant="body1"
              fontWeight="600"
            >
              1 Adult, 0 Children
            </RdsTypography>
          </div>

          <div className="rds-comp-details-pane__guest-selection-container d-flex align-items-center justify-content-between">
            <div className="rds-comp-details-pane__guest-counter">
              <RdsCounter
                value={1}
                onChange={() => {}}
                max={10}
                min={0}
              />
            </div>
            <div className="rds-comp-details-pane__counter-button-left">
              <RdsButton
                color="primary"
                layout="icon+text"
                text="Add Guests"
                shape="rectangle"
                size="small"
                state="default"
                style="filled"
                startIcon={<Group />}
                fullWidth
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
export const SelectionContent: React.FC<{
  headerText?: string;
  headerSubText?: string;
}> = ({
  headerText,
  headerSubText
}) => {
  return (
    <div className="custom-content-wrapper" id="detail-pane-container-2">
      <div className="detail-pane-container px-4 py-4 rds-comp-details-pane__selection-container" id="detail-pain-lable">
        <div className="rds-comp-details-pane__header-container">
          <h2 className="rds-comp-details-pane__title">
            {headerText || "Bayshore Transportation System"}
          </h2>
          <p className="rds-comp-details-pane__subtitle">
            {headerSubText || "Agent Information"}
          </p>
        </div>
        <hr className="rds-comp-details-pane__divider" />
        <div className="rds-comp-details-pane__search-container">
          <RdsSearch
            value=""
            onChange={() => {}}
            iconPosition="right"
            labelPosition="top"
            placeholder="Search for Agents by Name or # ID"
            size="small"
            fullWidth
            className="rds-comp-details-pane__search-field rds-comp-details-pane__search-field--compact"
          />
        </div>
        <div className="d-flex flex-column">
          {[
            { id: 1, image: "https://i.pravatar.cc/150?img=5" },
            { id: 2, image: "https://i.pravatar.cc/150?img=5" },
            { id: 3, image: "https://i.pravatar.cc/150?img=5" }
          ].map((item) => (
            <div key={item.id} className="rds-comp-details-pane__agent-card">
              <div className="rds-comp-details-pane__agent-left">
                <div className="rds-comp-details-pane__agent-avatar">
                  <RdsAvatar
                    color="primary"                          
                    src={item.image}
                    size="medium"
                    style={{ width: '45px', height: '45px' }}
                  />
                </div>
                <div className="rds-comp-details-pane__agent-info">
                  <div className="rds-comp-details-pane__agent-name">Jane Doe</div>
                  <div className="rds-comp-details-pane__agent-designation">Designation</div>
                </div>
              </div>
              <div className="rds-comp-details-pane__agent-actions">
                <div className="rds-comp-details-pane__agent-badge">4</div>
                <div className="rds-comp-details-pane__agent-radio">
                  <input type="radio" name="agent-select" className="rds-comp-details-pane__agent-radio-input" />
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
  const [selectedSpacingSize, setSelectedSpacingSize] = useState<number>(0);

  return (
    <div className="custom-content-wrapper">
      <div className="rds-comp-details-pane__toolbar-pane-container p-3">
        <div className="rds-comp-details-pane__toolbar-content">
          <div>
            <h3 className="mb-3">Toolbar</h3>
            <div className="rds-comp-details-pane__toolbar-buttons-row mb-3">
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='add'
                  showLeftIcon
                  size="medium"
                  layout="icon-only"
                  shape="rectangle"
                  state="default"
                  style="filled"
                  text="Default Button"
                />
              </div>
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='add'
                  showLeftIcon
                  size="medium"
                  layout="icon-only"
                  shape="rectangle"
                  state="default"
                  style="filled"
                  text="Default Button"
                />
              </div>
              <div className="rds-comp-details-pane__circle-btn-container">
                <RdsButton
                  color="primary"
                  changeLeftIcon='add'
                  showLeftIcon
                  layout="icon-only"
                  shape="rectangle"
                  size="medium"
                  state="default"
                  style="filled"
                  text="Default Button"
                />
              </div>
            </div>
            <hr className="rds-comp-details-pane__toolbar-divider mb-4" />
            {/* Toolbar tab content */}
            <div>
              {activeToolbarTab === 'icon_font' && (
                <div>
                  <div className="mb-3">
                    <p className="rds-comp-details-pane__font-name fw-bold mb-2">Font Name : Poppins</p>
                    <hr className="rds-comp-details-pane__toolbar-divider mt-2 mb-4"/>
                  </div>
                  <div className="rds-comp-details-pane__font-size-btn-group mb-4">
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
                  
                  <div className="rds-comp-details-pane__font-weight-btn-group mt-4 mb-3">
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
                      <div className="rds-comp-details-pane__row mt-2">
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
                    sx={{ mt: 3 }}
                  >
                    Font Size
                  </RdsTypography>
                  <div className="font-weight-btn-group mt-2">
                    <button type="button" className="font-weight-btn bg-primary text-white">Primary</button>
                    <button type="button" className="font-weight-btn bg-primary text-white">Primary</button>
                  </div>
                  <div className="font-weight-btn-group mt-3">
                    <button type="button" className="font-weight-btn bg-primary text-white">Primary</button>
                    <button type="button" className="font-weight-btn bg-primary text-white">Primary</button>
                  </div>
                </div>
              )}
              {activeToolbarTab === 'icon_frame' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                    sx={{ mt: 3 }}
                  >
                    Corner Radius Size
                  </RdsTypography>
                  <div className="font-size-btn-group mt-2 mb-4">
                    {[0, 2, 4, 6, 8, 12, 24, 48, 96, "MAX"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`font-size-btn${selectedCornerRadius === size ? ' selected' : ''}`}
                        onClick={() => setSelectedCornerRadius(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeToolbarTab === 'icon_line_height' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                    sx={{ mt: 3 }}
                  >
                    Spacing Size
                  </RdsTypography>
                  <div className="font-size-btn-group mt-2 mb-4">
                    {[0, 2, 4, 8, 12, 16, 20, 24, 32, 40].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`font-size-btn${selectedSpacingSize === size ? ' selected' : ''}`}
                        onClick={() => setSelectedSpacingSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeToolbarTab === 'icon_block' && (
                <div>
                  <RdsTypography
                    variant="body2"
                    fontWeight="600"
                    sx={{ mt: 3 }}
                  >
                    Component List
                  </RdsTypography>
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

/**
 * ThumbnailViewContent - Component for the thumbnail view
 */
export const ThumbnailViewContent: React.FC<{
  thumbnailButtonName?: string;
}> = ({
  thumbnailButtonName
}) => {
  return (
    <div className="rds-comp-details-pane__thumbnail-view-wrapper">
      <div className="rds-comp-details-pane__thumbnail-content p-0">
        <div className="rds-comp-details-pane__pages-header p-3">
          Pages
        </div>

        <div className="rds-comp-details-pane__download-button-container px-3 pb-3 pt-0">
          <button className="rds-comp-details-pane__download-button" onClick={() => {}}>
            {thumbnailButtonName || "Download Project"}
          </button>
        </div>

        <div className="rds-comp-details-pane__accordion-list px-0">
          <>
            <>
              <RdsAccordion
                size="medium"
                state="default"
                title="Accordion Title 1"
              >
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </div>
              </RdsAccordion>
              <RdsAccordion
                size="medium"
                state="default"
                title="Accordion Title 2"
              >
                <div>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </div>
              </RdsAccordion>
              <RdsAccordion
                size="medium"
                state="default"
                title="Accordion Title 3"
              >
                <div>
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                </div>
              </RdsAccordion>
            </>
          </>
        </div>
      </div>
    </div>
  );
};
