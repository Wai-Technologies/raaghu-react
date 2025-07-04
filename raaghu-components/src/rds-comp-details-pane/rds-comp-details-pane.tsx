import React, { useState } from "react";
import "./rds-comp-details-pane.css";
import { RdsAlert, RdsBadge, RdsButton, RdsButtonGrid, RdsCard, RdsCarousel } from "../rds-elements";
import RdsCounter, { CounterState, LayoutOptions } from "../../../raaghu-elements/src/rds-counter/rds-counter";
import { AlertBorder, AlertPosition, AlertType } from "../../../raaghu-elements/src/rds-alert/rds-alert";
import RdsAvatar, { AvatarSize, AvatarStyle } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";
import { color } from "html2canvas/dist/types/css/types/color";
import RdsTreeStructure, { IconType, NodeState, TreeLevel } from "../../../raaghu-elements/src/rds-tree-structure/rds-tree-structure";
import RdsAccordion, { AccordionBorder, AccordionSize, AccordionState, AccordionType } from "../../../raaghu-elements/src/rds-accordion/rds-accordion";
import RdsCompIcon from "../rds-comp-icon";
import RdsCompLabel from "../rds-comp-label";
import RdsCompSearch, { IconPosition } from "../rds-comp-search/rds-comp-search";

export interface RdsCompDetailsPaneProps {
  headerText: string; 
  historyTabLabel?: string;
  favouritesTabLabel?: string;
  addtoscreen?: string;
  addtofolder?: string;
  style?: string;
  headerSubText?: string;
  estateTitle?: string;
  estateDescription?: string;
  thumbnailButtonName?: string;
}

const RdsCompDetailsPaneFavouites = (props: RdsCompDetailsPaneProps) => {
  // Set the default tab based on style prop
  const getInitialTab = () => {
    if (props.style === "Favourites" || props.style === "Favourites - New Folder") {
      return "favourites";
    }
    if (props.style === "Prompt History") {
      return "history";
    }
    return "history";
  };
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  // Add state for toolbar tab
  const [activeToolbarTab, setActiveToolbarTab] = useState<string>('icon_font');
  // Add state for font size, font weight, corner radius, and spacing size selection
  const [selectedFontSize, setSelectedFontSize] = useState<number>(16);
  const [selectedFontWeight, setSelectedFontWeight] = useState<string>('Regular');
  const [selectedCornerRadius, setSelectedCornerRadius] = useState<string | number>(0);
  const [selectedSpacingSize, setSelectedSpacingSize] = useState<number>(0);
  const [historyItems, setHistoryItems] = useState([
    { id: 1, name: "Login Page Creation" },
    { id: 2, name: "Finance Dashboard Design" },
    { id: 3, name: "E-commerce Product Page" },
    { id: 4, name: "Social Media Profile Setup" },
    { id: 5, name: "Onboarding Flow Builder" },
    { id: 6, name: "Analytics Overview Dashboard" },
  ]);
  const [olderHistoryItems, setOlderHistoryItems] = useState([
    { id: 1, name: "Signup Form Generator" },
    { id: 2, name: "Task Management Board UI" },
  ]);

  // Switch to correct tab if style changes
  React.useEffect(() => {
    if (props.style === "Favourites" || props.style === "Favourites - New Folder") {
      setActiveTab("favourites");
    } else if (props.style === "Prompt History") {
      setActiveTab("history");
    }
  }, [props.style]);

  const handleDeleteHistoryItem = (id: number) => {
    setHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleDeleteOlderHistoryItem = (id: number) => {
    setOlderHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const TABS = [
    { key: "history", label: props.historyTabLabel || "History", icon: "history_watch" },
    { key: "favourites", label: props.favouritesTabLabel || "Favourites", icon: "starempty_outline" },
  ];

  return (
    <>
      <div className="detail-pane-container" style={{ position: 'relative' }}>
        {(props.style === "Favourites" || props.style === "Favourites - New Folder" || props.style === "Prompt History") ? (
          <div className="p-3">
            <h5 className="fw-bold">{props.headerText}</h5>

            <div className="custom-tabs-container">
              <div className="custom-tab-btns">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`custom-tab-btn${
                      activeTab === tab.key ? " active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span className="custom-tab-icon">
                      <RdsCompIcon
                        name={tab.icon}
                        width="18px"
                        height="18px"
                        colorVariant={activeTab === tab.key ? "primary" : undefined}
                        stroke={true}
                      />
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              <div className="custom-tab-underline-wrapper">
                <div
                  className={`custom-tab-underline custom-tab-underline-${activeTab}`}
                ></div>
              </div>
            </div>

            <div className="tab-content mt-3">
              {activeTab === "history" && (
                <div
                  className="tab-pane fade show active"
                  id="history"
                  role="tabpanel"
                >
                  <div className="section-heading-line mb-2">
                    <span className="section-heading-text">Today</span>
                    <span className="section-heading-linebar"></span>
                  </div>
                  <div className="text-black">
                    {historyItems.map((item) => (
                      <div
                        key={item.id}
                        className="activity-item d-flex align-items-center justify-content-between mb-3"
                      >
                        <RdsCompIcon name="history_watch" strokeColor="#969696"/>
                        <span className="ms-3 flex-grow-1 text-start">{item.name}</span>
                        <RdsCompIcon
                          colorVariant="danger"
                          height="15px"
                          isCursorPointer
                          name="delete"
                          stroke
                          width="15px"
                          onClick={() => handleDeleteHistoryItem(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="section-heading-line mt-3 mb-2">
                    <span className="section-heading-text">Older</span>
                    <span className="section-heading-linebar"></span>
                  </div>
                  <div className="text-black">
                    {olderHistoryItems.map((item) => (
                      <div
                        key={item.id}
                        className="activity-item d-flex align-items-center justify-content-between mb-3"
                      >
                        <RdsCompIcon name="history_watch" />
                        <span className="ms-3 flex-grow-1 text-start">{item.name}</span>
                        <RdsCompIcon
                          colorVariant="danger"
                          height="15px"
                          isCursorPointer
                          name="delete"
                          stroke
                          width="15px"
                          onClick={() => handleDeleteOlderHistoryItem(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "favourites" && (
                <div
                  className="tab-pane fade show active"
                  id="favourites"
                  role="tabpanel"
                >
                  <div className="favourite-list">
                    {[0, 1].map((idx) => (
                      <div
                        className={`favourite-card${
                          selectedIndexes.includes(idx) ? " favourite-card-selected" : ""
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
                          <input
                            type="checkbox"
                            className="favourite-checkbox"
                            checked={selectedIndexes.includes(idx)}
                            readOnly
                          />
                        <div className="favourite-card-content">
                          <div className="favourite-card-header">
                          <span className="favourite-title">
                            Create a Login page for signing up with a discount offer. It
                            should have a field for the user's email and a "Get Discount"
                            button.
                          </span>
                          <span className="favourite-edit-icon-wrapper ">
                            <RdsCompIcon name="edit_underline" width="17px" height="17px" strokeColor="#7D7D7D"/>
                          </span>
                        </div>
                        <div className="favourite-card-image-wrapper">
                          <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                            alt="Login page"
                            className="favourite-card-image"
                          />
                          <span className="favourite-card-image-star">
                            <RdsCompIcon
                              name="star_border"
                              width="21px"
                              height="14px"
                              colorVariant="primary"
                            />
                          </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 real-estate-footer-fixed ">
                    {props.style === "Favourites - New Folder" ? (
                      <RdsButton
                        colorVariant="primary"
                        size="sm"
                        block
                        label={`${props.addtofolder} (${selectedIndexes.length})`}
                      />
                    ) : props.style === "Favourites" ? (
                      <RdsButton
                        colorVariant="primary"
                        size="sm"
                        block
                        label={`${props.addtoscreen} (${selectedIndexes.length})`}
                      />
                    ) : null}
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        ) : props.style === "Real Estate" ? (
          <div className="custom-content-wrapper" id="details-pane-container">
            <div className="detail-pane-container p-3">
              <div className="" id="crausel-indicator">
                  <RdsCarousel
                    Indicators
                    carouselItems={[
                      {
                        id: 1,
                        imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg',
                        name: 'Sam Smith',
                        subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum.'
                      },
                      {
                        id: 2,
                        imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
                        name: 'king John',
                        subTitle: 'this is the caption section were u can add the caption for the image'
                      },
                      {
                        id: 3,
                        imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg',
                        name: 'John Doe',
                        subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum.'
                      },
                      {
                        id: 4,
                        imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
                        name: 'User',
                        subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum.'
                      }
                    ]}
                    state="1"
                    style="Default"
                    type="Circle"
                  />
                  </div>
                    <div className="mt-4 real-estate-title" id="text-color-change">
                  <RdsCompLabel
                    fontWeight="bold"
                    label={props.estateTitle}
                  />
                  </div>

                  <div className="d-flex  mt-3" >
                    <RdsBadge
                    colorVariant="primary"
                    iconName="circle"
                    isIconshow
                    label="Badge"
                    layout="Icon+Text"
                    shape="rectangle"
                    size="small"
                    state="default"
                    style="primary"
                  />
                  <RdsBadge
                    colorVariant="primary"
                    iconName="circle"
                    isIconshow
                    label="Badge"
                    layout="Icon+Text"
                    shape="rectangle"
                    size="small"
                    state="default"
                    style="primary"
                  />
                  <RdsBadge
                    colorVariant="primary"
                    iconName="circle"
                    isIconshow
                    label="Badge"
                    layout="Icon+Text"
                    shape="rectangle"
                    size="small"
                    state="default"
                    style="primary"
                  />
                    </div>

                    <div className="mt-3 fs-7" id="estate-description">
                      <RdsCompLabel
                        fontWeight="normal"
                        label={props.estateDescription}
                      />
                  </div>

                  <div className="real-estate-footer-fixed" id="lable-adult-children-text">
                    <div className="d-flex mb-2" >
                      <RdsCompLabel
                        fontWeight="semibold"
                        label="1 Adult"
                      />,  
                      <RdsCompLabel
                        fontWeight="semibold"
                        label="0 Children"
                      />
                    </div>
                    <div className="d-flex align-items-center" id="rds-counter-text">
                      <div className="counter-button-left" style={{ flex: 1 }}>
                        <RdsCounter
                          colorVariant="primary"
                          layout={LayoutOptions.SideToSide}
                          max={500}
                          min={0}
                          placeholder="00"
                          state={CounterState.Selected}
                          titleText="Label"
                          counterValue={0}
                          width={160}
                        />
                      </div>
                      <div className="ms-1 width_element" style={{ flex: 2 }} id="add-guest-btn">
                        <RdsButton
                          badgeLayout="Text_only"
                          badgeState="default"
                          badgeStyle="primary"
                          colorVariant="primary"
                          databstoggle="tooltip"
                          displayType="Icon + Text"
                          icon="users"
                          label="Add Guests"
                          shape="rectangle"
                          size="small"
                          state="default"
                          style="filled"
                          textCase="unset"
                        />
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        ) : props.style === "Selection" ? (
          <div className="custom-content-wrapper" id="detail-pane-container-2">
            <div className="detail-pane-container p-3" id="detail-pain-lable">
              <RdsCompLabel
                fontWeight="bold"
                label={props.headerText}
                class="fs-5"
              />
              <RdsCompLabel
                fontWeight="normal"
                label={props.headerSubText}
                class="fs-6 mt-2"
              />
              <div className="section-heading-line mb-2 mt-4">
                <span className="section-heading-linebar"></span>
              </div>
              <div className="mt-4">
                <RdsCompSearch
                  iconPosition={IconPosition.Right}
                  labelPosition={IconPosition.Right}
                  placeholder="Search for Agents by Name or # ID"
                  size="small"
                />
              </div>
              <div className="d-flex flex-column gap-3">
                {[1, 2, 3].map((item, idx) => (
                  <div key={idx} className="custom-profile-card d-flex align-items-center p-3 shadow-sm left-border-highlight" style={{ background: '#fff', minHeight: 70 }}>
                    <div className="me-2 position-relative">
                      <RdsAvatar
                        activityRing
                        colorVariant="primary"
                        firstName="Jane"
                        lastName="Doe"
                        maxVisibleAvatars={-1}
                        profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                        role="Developer"
                        size={AvatarSize.medium}
                        style={AvatarStyle.withname}
                        type="image"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold fs-6 user-name-jane" >Jane Doe</div>
                      <div className="text-muted fs-6 user-designation-jane">Designation</div>
                    </div>
                    <div className="d-flex align-items-center ms-auto gap-3">
                      <span className="profile-badge bg-primary text-white rounded-pill d-flex align-items-center px-3" style={{ width: 50, height: 40, fontSize: 18,}}>4</span>
                      <span className="ms-2">
                        <RdsCompIcon
                          colorVariant="primary"
                          height="20px"
                          isCursorPointer
                          name="edit_underline"
                          stroke
                          width="20px"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : props.style === "Toolbar" ? (
          <div className="custom-content-wrapper">
            <div className="detail-pane-container toolbar-pane-container p-3">
              <div className="detail-pane-scroll-content" id="btn-sizes">
                <div>
                  <RdsCompLabel
                    fontWeight="bold"
                    label="Toolbar"
                    class="fs-5"
                    
                  />
                  <div className="d-flex flex-row gap-4 mt-3">
                    <RdsButton
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant={activeToolbarTab === 'icon_font' ? 'primary' : ''}
                      databstoggle="tooltip"
                      displayType="Icon Only"
                      icon="icon_font"
                      label=""
                      shape="rectangle"
                      size="medium"
                      state="default"
                      textCase="unset"
                      tooltipTitle="This is tooltip"
                      onClick={() => setActiveToolbarTab('icon_font')}
                    />
                    <RdsButton
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant={activeToolbarTab === 'icon_color' ? 'primary' : ''}
                      databstoggle="tooltip"
                      displayType="Icon Only"
                      icon="icon_color"
                      label=""
                      shape="rectangle"
                      size="medium"
                      state="default"
                      textCase="unset"
                      tooltipTitle="This is tooltip"
                      onClick={() => setActiveToolbarTab('icon_color')}
                    />
                    <RdsButton
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant={activeToolbarTab === 'icon_frame' ? 'primary' : ''}
                      databstoggle="tooltip"
                      displayType="Icon Only"
                      icon="icon_frame"
                      label=""
                      shape="rectangle"
                      size="medium"
                      state="default"
                      textCase="unset"
                      tooltipTitle="This is tooltip"
                      onClick={() => setActiveToolbarTab('icon_frame')}
                    />
                    <RdsButton
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant={activeToolbarTab === 'icon_line_height' ? 'primary' : ''}
                      databstoggle="tooltip"
                      displayType="Icon Only"
                      icon="icon_line_height"
                      label=""
                      shape="rectangle"
                      size="medium"
                      state="default"
                      textCase="unset"
                      tooltipTitle="This is tooltip"
                      onClick={() => setActiveToolbarTab('icon_line_height')}
                    />
                    <RdsButton
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant={activeToolbarTab === 'icon_block' ? 'primary' : ''}
                      databstoggle="tooltip"
                      displayType="Icon Only"
                      icon="icon_block"
                      label=""
                      shape="rectangle"
                      size="medium"
                      state="default"
                      textCase="unset"
                      tooltipTitle="This is tooltip"
                      onClick={() => setActiveToolbarTab('icon_block')}
                    />
                  </div>
                  <div className="section-heading-line mb-2 mt-4">
                    <span className="section-heading-linebar"></span>
                  </div>
                  {/* Toolbar tab content */}
                  <div>
                    {activeToolbarTab === 'icon_font' && (
                      <div>
                        <RdsCompLabel
                          fontWeight="semibold"
                          label="Font Name : Poppins"
                          class="fs-small-size"
                        />
                        <RdsCompLabel
                          fontWeight="semibold"
                          label="Font Size"
                          class="fs-7 mt-3"
                        />
                        <div className="font-size-btn-group mt-2 mb-4">
                          {[14, 16, 18, 20, 24, 32, 36, 48, 60, 72].map((size) => (
                            <button
                              key={size}
                              type="button"
                              className={`font-size-btn${selectedFontSize === size ? ' selected' : ''}`}
                              onClick={() => setSelectedFontSize(size)}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        <RdsCompLabel
                          fontWeight="semibold"
                          label="Font Weight"
                          class="fs-7 mt-3"
                        />
                        <div className="font-weight-btn-group mt-2">
                          <button type="button" className={`font-weight-btn${selectedFontWeight === 'Regular' ? ' selected' : ''}`} onClick={() => setSelectedFontWeight('Regular')}>Regular</button>
                          <button type="button" className={`font-weight-btn${selectedFontWeight === 'Medium' ? ' selected' : ''}`} onClick={() => setSelectedFontWeight('Medium')}>Medium</button>
                        </div>
                        <div className="font-weight-btn-group mt-3">
                          <button type="button" className={`font-weight-btn fw-semibold${selectedFontWeight === 'Semi Bold' ? ' selected' : ''}`} onClick={() => setSelectedFontWeight('Semi Bold')}>Semi Bold</button>
                          <button type="button" className={`font-weight-btn fw-bold${selectedFontWeight === 'Bold' ? ' selected' : ''}`} onClick={() => setSelectedFontWeight('Bold')}>Bold</button>
                        </div>
                      </div>
                    )}
                    {activeToolbarTab === 'icon_color' && (
                      <div>
                        <RdsCompLabel
                          fontWeight="semibold"
                          label="Font Size"
                          class="fs-7 mt-3"
                        />
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
                        <RdsCompLabel
                          fontWeight="semibold"
                          label="Corner Radius Size"
                          class="fs-7 mt-3"
                        />
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
                        <RdsCompLabel
                          fontWeight="semibold"
                          label="Spacing Size"
                          class="fs-7 mt-3"
                        />
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
                        <RdsCompLabel
                            fontWeight="semibold"
                            label="Component List"
                            class="fs-7 mt-3"
                          />
                      <div>
                      <div className="mt-2">
                        <RdsTreeStructure
                          Language="CSS"
                          level={TreeLevel.Level3}
                          showChewron
                          showFolder
                          state={NodeState.Hover}
                          treeData={[
                            { id: 1, name: 'Elements', children: [] },
                            { id: 2, name: 'Charts', children: [] },
                            { id: 3, name: 'Map', children: [] },
                            { id: 4, name: 'Components', children: [] },
                            { id: 5, name: 'App Shells', type: 'circle', children: [
                              { icon: 'file', id: 11, name: 'Docs' },
                              { icon: 'file', id: 12, name: 'Basic' }
                            ] },
                            { id: 6, name: 'Layouts', type: 'circle', children: [] }
                          ]}
                          type={IconType.Folder}
                        />
                        </div>
                       </div>
                     </div>

                    )}
                  </div>
                </div>
              </div>
              <div className="detail-pane-footer-fixed">
                <div id="toolbar-footer-figma-kit">
                    <RdsButton
                      block
                      displayType="Icon + Text"
                      icon="figma_colored"
                      label="Download the Figma UI Kit"
                      shape="rectangle"
                      size="medium"
                      tooltipTitle="This is tooltip"
                    />
                </div>
                <div className="mt-2" id="toolbar-footer-storybook">
                  <RdsButton
                    block
                    displayType="Icon + Text"
                    icon="storybook_icon"
                    label="Go to Storybook"
                    shape="rectangle"
                    size="medium"
                    tooltipTitle="This is tooltip"
                  />
                </div>
              </div>
            </div>
          </div>
        ) :  props.style === "Thumbnail View" ? (
          <div className="custom-content-wrapper">
            <div className="detail-pane-container p-3">
              <div>
                  <RdsCompLabel
                    fontWeight="bold"
                    label="Pages"
                    class="fs-5"
                  />
              </div>

               <div className="mt-3">
                  <RdsButton
                    block
                    colorVariant="primary"
                    displayType="Only Text"
                    label={props.thumbnailButtonName}
                    shape="rectangle"
                    size="medium"
                  />
                </div>

                <div className="mt-4" id="accordion-section">
                  <RdsAccordion
                    accordionId="1"
                    accordionType={AccordionType.multiple}
                    iconStroke
                    items={[
                      {
                        accordionContent: <div className="border p-4"><div className="favourite-card-image-wrapper">
                          <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                            alt="Login page"
                            className="favourite-card-image"
                          />
                          <span className="thumbnail-image-square">
                            <RdsCompIcon
                              name="downloads"
                              width="19px"
                              height="13px"
                              colorVariant="primary"
                            />
                          </span>
                        </div></div>,
                        id: '1',
                        title: 'Title'
                      },
                      {
                        accordionContent: <div className="border p-4"><div className="favourite-card-image-wrapper">
                          <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                            alt="Login page"
                            className="favourite-card-image"
                          />
                          <span className="thumbnail-image-square">
                            <RdsCompIcon
                              name="downloads"
                              width="19px"
                              height="13px"
                              colorVariant="primary"
                            />
                          </span>
                        </div></div>,
                        id: '2',
                        title: 'Title'
                      },
                      {
                        accordionContent: <div className="border p-4"><div className="favourite-card-image-wrapper">
                          <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                            alt="Login page"
                            className="favourite-card-image"
                          />
                          <span className="thumbnail-image-square">
                            <RdsCompIcon
                              name="downloads"
                              width="19px"
                              height="13px"
                              colorVariant="primary"
                            />
                          </span>
                        </div></div>,
                        id: '3',
                        title: 'Title'
                      }
                    ]}
                    size={AccordionSize.medium}
                    state={AccordionState.default}
                    style={AccordionBorder.borderhide}
                  />
                </div>
            </div>
          </div>
        ) : null        
        }
        
      </div>
    </>
  );
};
export default RdsCompDetailsPaneFavouites;


