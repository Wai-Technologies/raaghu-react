import React, { FC } from 'react';
import { RdsCompLayoutWrapper } from './rds-comp-layout.styled';

interface RdsCompLayoutProps {
   displayType?: 'layout1' | 'layout2'| 'layout3';
}

const LayoutComponents: {
  [key in RdsCompLayoutProps["displayType"]]: React.ReactNode;
} = {
  layout1: (
    <div className="layout1">
      <header>
        <h1>Header</h1>
      </header>
      <div className="main">
        <aside className="left">Sidebar</aside>
        <main className="right">
        <div className="container">
          <div className="row bg-white">
            <div className="content">Content</div>
          </div>
        </div>
        </main>
      </div>
    </div>
  ),
  layout2: (
    <div className="layout2">
      <header>
        <h1>Header</h1>
      </header>
      <div className="main">
        <aside className="left">Sidebar</aside>
        <main className="right">
          <div className="container">
            <div className="row">
              <div className="col bg-white">Column 1</div>
              <div className="col bg-white">Column 2</div>
              <div className="col bg-white">Column 3</div>
            </div>
            <div className="row bg-white">
              <div className="content">Content</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
  layout3: (
    <div className="layout3">
      <header>
        <h1>Header</h1>
      </header>
      <div className="main">
        <aside className="left">Sidebar</aside>
        <main className="right">
          <div className="container">
            <div className="row bg-white">
              <div className="col bg-white">Column 1</div>
            </div>
            <div className="row">
              <div className="col bg-white">Column 1</div>
              <div className="col bg-white">Column 2</div>
              <div className="col bg-white">Column 3</div>
            </div>
            <div className="row bg-white">
              <div className="content">Content</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};

const RdsCompLayout: FC<RdsCompLayoutProps> = ({ displayType = 'layout1' }) => (
  <RdsCompLayoutWrapper>
    {LayoutComponents[displayType]}
  </RdsCompLayoutWrapper>
);

export default RdsCompLayout;
