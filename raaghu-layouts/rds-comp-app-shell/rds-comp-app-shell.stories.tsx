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
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

export const DoubleNav: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [375, 768, 1024, 1920],
    },
  },
  args: {
    displayType: AppShellDisplayType.DoubleNav,
    topbar: (
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
          onTabChange={() => {}}
          showLogo={true}
          tabValue={0}
          tabs={["HOME", "NEWS", "MARKETPLACE", "JOBS"]}
          title=""
        />
      </div>
    ),
    sidebar: (
      <div className="double-nav-sidebar rds-story-double-nav-layout">
        <div className="rds-story-double-nav-content">
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
              typeOf="collapse"
              anchor="left"
            />
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
              typeOf="expanded"
            />
          </BrowserRouter>
        </div>
        {/* Add Layout message in the center, full height */}
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
    ),
  },
};

//Relaxing Story
export const Relaxing: Story = {
  // hide these autogenerated controls from the Controls panel
  parameters: {
    controls: { exclude: ['sidebar'] },
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [375, 768, 1024, 1920],
    },
  },
  args: {
    displayType: AppShellDisplayType.Relaxing,
    topbar: (
      <div>
        <RdsAppBar
          color="default"
          logo={
            <img
              alt="Logo"
              className="rds-story-logo"
              src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
            />
          }
          onTabChange={() => {}}
          showLogo={true}
          tabValue={0}
          tabs={["HOME", "NEWS", "MARKETPLACE", "JOBS"]}
          title=""
        />
      </div>
    ),
    children: (
      <div className="rds-story-relaxing-layout">
        {/* Content Row: Sidebar + Add Layout */}
        <div className="rds-story-relaxing-content">
          {/* Sidebar */}
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
          {/* Add Layout Text */}
          <div className="rds-appshell-add-layout-flex-center">
            <span className="rds-appshell-add-layout-text">Add Layout</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const SideNav: Story = {
   // hide these autogenerated controls from the Controls panel
  parameters: {
    controls: { exclude: ['topbar'] },
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [375, 768, 1024, 1920],
    },
  },
  args: {
    displayType: AppShellDisplayType.SideNav,
    sidebar: (
      <div className="rds-appshell-side-nav-layout d-flex flex-row align-items-stretch w-100">
        {/* Left Side Navigation */}
        <div className="rds-appshell-side-nav-left">
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
              showLogo
            />
          </BrowserRouter>
        </div>
        {/* Center Add Layout Text with Default story style - order: 2 on mobile */}
        <div className="rds-appshell-add-layout-flex-center" style={{ order: 2 }}>
          <span className="rds-appshell-add-layout-text">Add Layout</span>
        </div>
        {/* Right Side Navigation aligned to end */}
        <div className="rds-appshell-side-nav-right d-flex align-items-end justify-content-end rds-story-side-nav-right-container">
          <div className="rds-story-side-nav-right-content" id="side-nav-icon-list">
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
                layout="toolbar"
                typeOf="collapse"
                anchor="right"
                showLogo
              />
            </BrowserRouter>
          </div>
        </div>
      </div>
    ),
  },
};

export const Standard: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [375, 768, 1024, 1920],
    },
  },
  args: {
    displayType: AppShellDisplayType.Default,
    sidebar: (
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
          showLogo={true}
        />
      </BrowserRouter>
    ),
    topbar: (
      <RdsAppBar
        color="default"
        logo={
          <img
            alt="Logo"
            className="rds-story-logo"
            src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
          />
        }
        onTabChange={() => {}}
        showLogo={false}
        tabValue={0}
        tabs={["HOME", "NEWS", "MARKETPLACE", "JOBS"]}
        title=""
      />
    ),
    children: (
      <div className="rds-story-standard-content">
        <div className="rds-appshell-add-layout-center">Add Layout</div>
      </div>
    ),
  },
};

//TopNav Story
export const TopNav: Story = {
    // hide these autogenerated controls from the Controls panel
  parameters: {
    controls: { exclude: ['sidebar'] },
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [375, 768, 1024, 1920],
    },
  },
  args: {
    displayType: AppShellDisplayType.TopNav,

    topbar: (
      <RdsAppBar
  actions={<><BellIcon /><ProfileMenu email="john.doe@example.com" name="John Doe"/></>}
  color="default"
  logo={<img alt="Logo" className="rds-story-logo" src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"/>}
  onSearchChange={() => {}}
  onTabChange={() => {}}
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
  tabValue={0}
  tabs={[
    'Home',
    'News',
    'Marketplace',
    'Jobs'
  ]}
  title=""
/>
    ),
    children: (
      <div className="rds-story-topnav-content">
        <div className="rds-appshell-add-layout-center">Add Layout</div>
      </div>
    ),
  },
};

//OneThreeOne Story
export const TriPane: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [375, 768, 1024, 1920],
    },
  },
  args: {
    displayType: AppShellDisplayType.TriPane,
    topbar: (
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
          onTabChange={() => {}}
          showLogo={true}
          tabValue={0}
          tabs={["HOME", "NEWS", "MARKETPLACE", "JOBS"]}
          title=""
        />
      </div>
    ),

    sidebar: (
      <div className="tripane-sidebar rds-story-tripane-layout">
        <div>
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
    ),
  },
};
