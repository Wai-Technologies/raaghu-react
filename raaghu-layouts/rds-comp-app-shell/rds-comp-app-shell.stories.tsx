import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompAppShell, { AppShellDisplayType } from "./rds-comp-app-shell";
import RdsAppBar from "../../raaghu-elements/rds-app-bar/rds-app-bar";
import { BrowserRouter } from "react-router-dom";
import "./rds-comp-app-shell.scss";
import RdsCompDetailsPane from "../../raaghu-components/rds-comp-details-pane/rds-comp-details-pane";
import RdsSidebar from "../../raaghu-elements/rds-sidebar/rds-sidebar";
import {
  Home,
  Dashboard,
  Person,
  Settings,
  Help,
  Inbox,
  Star,
  Send,
  Drafts,
  CalendarToday as CalendarIcon,
  Folder as ProjectsIcon,
  People as DirectoryIcon,
  LocalActivity as ActivitiesIcon,
} from "@mui/icons-material";
import { ProfileMenu } from "../../raaghu-elements/rds-app-bar/ProfileMenu";
import { Notifications as BellIcon } from "@mui/icons-material";

const meta: Meta<typeof RdsCompAppShell> = {
  title: "Application Shells",
  component: RdsCompAppShell,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The **Application Shell** component is a versatile and customizable UI layout designed to provide a structured framework for building applications. It supports features such as top navigation, side navigation, and a combination of both, enabling seamless navigation and content organization. This component is ideal for applications requiring a consistent and responsive layout, such as admin dashboards, SaaS platforms, or enterprise systems. Fully customizable, the Application Shell component ensures seamless integration with your design system while offering an intuitive and user-friendly interface for managing application layouts effectively.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    displayType: {
      control: { type: "select" },
      options: [
        AppShellDisplayType.DoubleNav,
        AppShellDisplayType.Relaxing, 
        AppShellDisplayType.SideNav,
        AppShellDisplayType.Default,
        AppShellDisplayType.TriPane,
        AppShellDisplayType.TopNav,
      ],
      description: "Select the application shell layout type",
    },
  },
  args: {
    displayType: AppShellDisplayType.Default,
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

// Main story that responds to displayType control
const AppShellStory = (args: any) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [mobileToolbarOpen, setMobileToolbarOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleMobileSidebarToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
    if (mobileToolbarOpen) setMobileToolbarOpen(false);
  };

  const handleBackdropClick = () => {
    setMobileSidebarOpen(false);
  };

  const handleMobileToolbarToggle = () => {
    setMobileToolbarOpen(!mobileToolbarOpen);
    if (mobileSidebarOpen) setMobileSidebarOpen(false);
  };

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderTopbar = () => {
    if (args.displayType === AppShellDisplayType.TopNav) {
      return (
        <RdsAppBar
          actions={<><BellIcon /><ProfileMenu email="john.doe@example.com" name="John Doe"/></>}
          color="default"
          logo={<img alt="Logo" className="rds-story-logo" src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"/>}
          onSearchChange={() => {}}
          onTabChange={handleTabChange}
          searchPlaceholder="Search…"
          searchValue=""
          showLogo
          subHeader={
            <div className="rds-header__sub-header-layout rds-story-sub-header-layout">
              <div className="rds-header__sub-tabs rds-story-sub-tabs">
                <button type="button" className="rds-story-sub-tab-button rds-story-sub-tab-button--primary" onClick={() => {}}>
                  <Home className="rds-story-sub-tab-icon" /> Dashboard
                </button>
                <button type="button" className="rds-story-sub-tab-button rds-story-sub-tab-button--inherit" onClick={() => {}}>
                  <ActivitiesIcon className="rds-story-sub-tab-icon" /> Activities
                </button>
                <button type="button" className="rds-story-sub-tab-button rds-story-sub-tab-button--inherit" onClick={() => {}}>
                  <DirectoryIcon className="rds-story-sub-tab-icon" /> Directory
                </button>
                <button type="button" className="rds-story-sub-tab-button rds-story-sub-tab-button--inherit" onClick={() => {}}>
                  <ProjectsIcon className="rds-story-sub-tab-icon" /> Projects
                </button>
                <button type="button" className="rds-story-sub-tab-button rds-story-sub-tab-button--inherit" onClick={() => {}}>
                  <CalendarIcon className="rds-story-sub-tab-icon" /> Calendar
                </button>
              </div>
            </div>
          }
          tabValue={selectedTab}
          tabs={['Home', 'News', 'Marketplace', 'Jobs']}
          title=""
        />
      );
    }

    if (args.displayType === AppShellDisplayType.SideNav) {
      return (
        <RdsAppBar
          color="default"
          logo={
            <img
              alt="Logo"
              className="rds-story-logo"
              src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
            />
          }
          onTabChange={handleTabChange}
          showLogo={true}
          showMenuButton={true}
          onMenuClick={handleMobileSidebarToggle}
          tabValue={selectedTab}
          tabs={["HOME", "NEWS", "MARKETPLACE", "JOBS"]}
          title=""
        />
      );
    }

    return (
      <div className="rds-appshell-appbar rds-appshell-appbar--fixed">
        <RdsAppBar
          color="default"
          logo={
            <img
              alt="Logo"
              className="rds-story-logo"
              src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
            />
          }
          onTabChange={handleTabChange}
          showLogo={args.displayType !== AppShellDisplayType.Default}
          showMenuButton={true}
          onMenuClick={handleMobileSidebarToggle}
          tabValue={selectedTab}
          tabs={["HOME", "NEWS", "MARKETPLACE", "JOBS"]}
          title=""
          rightActions={
            (args.displayType === AppShellDisplayType.TriPane || args.displayType === AppShellDisplayType.DoubleNav) ? (
              <button 
                className="rds-toolbar-toggle-btn"
                onClick={handleMobileToolbarToggle}
                aria-label="toggle toolbar"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              </button>
            ) : undefined
          }
        />
      </div>
    );
  };

  const renderSidebar = () => {
    const sidebarItems = [
      {
        icon: <Home />,
        label: "Home",
        onClick: () => {},
      },
      {
        active: true,
        icon: <Dashboard />,
        label: "Dashboard",
        onClick: () => {},
      },
      {
        icon: <Person />,
        label: "Profile",
        onClick: () => {},
      },
      {
        icon: <Settings />,
        label: "Settings",
        onClick: () => {},
      },
      {
        icon: <Help />,
        label: "Help",
        onClick: () => {},
      },
    ];

    if (args.displayType === AppShellDisplayType.SideNav) {
      return (
        <div className="rds-appshell-side-nav-layout d-flex flex-row align-items-stretch w-100">
          {mobileSidebarOpen && (
            <div 
              className="mobile-sidebar-backdrop" 
              onClick={handleBackdropClick}
            />
          )}
          
          <div className="rds-appshell-side-nav-left">
            <BrowserRouter>
              <RdsSidebar
                avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                isOpen
                items={sidebarItems}
                variant="permanent"
                layout="raaghu"
                showLogo
              />
            </BrowserRouter>
          </div>
          
          <div className="rds-appshell-add-layout-flex-center">
            <span className="rds-appshell-add-layout-text">Add Layout</span>
          </div>
          
          <div className="rds-appshell-side-nav-right d-flex align-items-end justify-content-end rds-story-side-nav-right-container">
            <div className="rds-story-side-nav-right-content" id="side-nav-icon-list">
              <BrowserRouter>
                <RdsSidebar
                  avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                  avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  isOpen
                  items={sidebarItems}
                  variant="permanent"
                  layout="toolbar"
                  typeOf="collapse"
                  anchor="right"
                  showLogo
                />
              </BrowserRouter>
            </div>
          </div>
        </div>
      );
    }

    if (args.displayType === AppShellDisplayType.DoubleNav) {
      return (
        <div className="double-nav-sidebar rds-story-double-nav-layout">
          <div className="rds-story-double-nav-content">
            <BrowserRouter>
              <RdsSidebar
                avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                isOpen
                items={sidebarItems}
                variant="permanent"
                layout="raaghu"
                typeOf="collapse"
                anchor="left"
              />
              <RdsSidebar
                avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                isOpen
                items={sidebarItems}
                variant="permanent"
                layout="raaghu"
                typeOf="expanded"
              />
            </BrowserRouter>
          </div>
          <div className="rds-appshell-add-layout-flex-center">
            <span className="rds-appshell-add-layout-text">Add Layout</span>
          </div>
          <div id="details-pane-app-shell">
            <RdsCompDetailsPane
              headerSubText="Agent Information"
              headerText="Bayshore Transportation System"
              style="Selection"
            />
          </div>
        </div>
      );
    }

    if (args.displayType === AppShellDisplayType.TriPane) {
      return (
        <div className="tripane-sidebar rds-story-tripane-layout">
          <div>
            <RdsSidebar
              avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
              avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              isOpen
              items={sidebarItems}
              variant="permanent"
              layout="raaghu"
              showLogo={false}
            />
          </div>
          <div className="rds-appshell-add-layout-flex-center">
            <span className="rds-appshell-add-layout-text">Add Layout</span>
          </div>
          <div id="detail-pane-one-three-one">
            <RdsCompDetailsPane 
              style="Toolbar" 
              headerText={""} 
              figmaIconSrc="assets/figma.png"
              storybookIconSrc="assets/storybook.png"
            />
          </div>
        </div>
      );
    }

    // Default sidebar for Standard, Relaxing, Default, etc.
    return (
      <BrowserRouter>
        <RdsSidebar
          avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
          avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          isOpen
          items={sidebarItems}
          variant="permanent"
          layout="raaghu"
          showLogo={args.displayType !== AppShellDisplayType.Default}
        />
      </BrowserRouter>
    );
  };

  const renderChildren = () => {
    if (args.displayType === AppShellDisplayType.TopNav) {
      return (
        <div className="rds-story-topnav-content">
          <div className="rds-appshell-add-layout-center">Add Layout</div>
        </div>
      );
    }

    if (args.displayType === AppShellDisplayType.SideNav) {
      return (
        <div className="sidenav-mobile-content">
          <div className="rds-appshell-add-layout-flex-center">
            <span className="rds-appshell-add-layout-text">Add Layout</span>
          </div>
        </div>
      );
    }

    if (args.displayType === AppShellDisplayType.Relaxing) {
      return (
        <div className="rds-story-relaxing-layout">
          {mobileSidebarOpen && (
            <div 
              className="mobile-sidebar-backdrop" 
              onClick={handleBackdropClick}
            />
          )}
          
          <div className="rds-story-relaxing-content">
            <div className="rds-story-relaxing-sidebar">
              <BrowserRouter>
                <RdsSidebar
                  avatarCollapsedSrc="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                  avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  isOpen
                  items={[
                    {
                      icon: <Home />,
                      label: "Home",
                      onClick: () => {},
                    },
                    {
                      active: true,
                      icon: <Dashboard />,
                      label: "Dashboard",
                      onClick: () => {},
                    },
                    {
                      icon: <Person />,
                      label: "Profile",
                      onClick: () => {},
                    },
                    {
                      icon: <Settings />,
                      label: "Settings",
                      onClick: () => {},
                    },
                    {
                      icon: <Help />,
                      label: "Help",
                      onClick: () => {},
                    },
                  ]}
                  variant="permanent"
                  layout="raaghu"
                />
              </BrowserRouter>
            </div>
            <div className="rds-appshell-add-layout-flex-center">
              <span className="rds-appshell-add-layout-text">Add Layout</span>
            </div>
          </div>
        </div>
      );
    }

    if (args.displayType === AppShellDisplayType.DoubleNav || args.displayType === AppShellDisplayType.TriPane) {
      return (
        <>
          {mobileSidebarOpen && (
            <div 
              className="mobile-sidebar-backdrop" 
              onClick={handleBackdropClick}
            />
          )}
          
          <div className={args.displayType === AppShellDisplayType.DoubleNav ? "doublenav-mobile-content" : "tripane-mobile-content"}>
            <div className="rds-appshell-add-layout-flex-center">
              <span className="rds-appshell-add-layout-text">Add Layout</span>
            </div>
          </div>
          
          <div className={`${args.displayType === AppShellDisplayType.DoubleNav ? 'doublenav' : 'tripane'}-mobile-toolbar ${mobileToolbarOpen ? 'open' : ''}`}>
            <div className={`${args.displayType === AppShellDisplayType.DoubleNav ? 'doublenav' : 'tripane'}-toolbar-content`}>
              <RdsCompDetailsPane
                headerSubText="Agent Information"
                headerText={args.displayType === AppShellDisplayType.TriPane ? "Toolbar" : "Bayshore Transportation System"}
                style={args.displayType === AppShellDisplayType.TriPane ? "Toolbar" : "Selection"}
                figmaIconSrc={args.displayType === AppShellDisplayType.TriPane ? "assets/figma.png" : undefined}
                storybookIconSrc={args.displayType === AppShellDisplayType.TriPane ? "assets/storybook.png" : undefined}
              />
            </div>
          </div>
          
          {mobileToolbarOpen && (
            <div 
              className={`${args.displayType === AppShellDisplayType.DoubleNav ? 'doublenav' : 'tripane'}-toolbar-backdrop`}
              onClick={handleMobileToolbarToggle}
            />
          )}
        </>
      );
    }

    // Default/Standard content
    return (
      <div className="rds-story-standard-content">
        {mobileSidebarOpen && (
          <div 
            className="mobile-sidebar-backdrop" 
            onClick={handleBackdropClick}
          />
        )}
        
        <div className="rds-appshell-add-layout-center">Add Layout</div>
      </div>
    );
  };

  return (
    <RdsCompAppShell
      displayType={args.displayType}
      mobileSidebarOpen={mobileSidebarOpen}
      onMobileSidebarToggle={handleMobileSidebarToggle}
      topbar={args.displayType !== AppShellDisplayType.SideNav ? renderTopbar() : renderTopbar()}
      sidebar={args.displayType !== AppShellDisplayType.TopNav ? renderSidebar() : undefined}
      children={renderChildren()}
    />
  );
};

export const DoubleNav: Story = {
  args: {
    displayType: AppShellDisplayType.DoubleNav,
  },
  render: AppShellStory,
};

export const Relaxing: Story = {
  args: {
    displayType: AppShellDisplayType.Relaxing,
  },
  render: AppShellStory,
};

export const SideNav: Story = {
  args: {
    displayType: AppShellDisplayType.SideNav,
  },
  render: AppShellStory,
};

export const Standard: Story = {
  args: {
    displayType: AppShellDisplayType.Default,
  },
  render: AppShellStory,
};

export const TopNav: Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
  },
  render: AppShellStory,
};

export const TriPane: Story = {
  args: {
    displayType: AppShellDisplayType.TriPane,
  },
  render: AppShellStory,
};
