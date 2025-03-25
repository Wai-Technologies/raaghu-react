import React, { useState } from "react";
import "./rds-detail-pane.css";
import RdsSearch from "../rds-search";

export interface RdsDetailPaneProps {}

const RdsDetailPane = (props: RdsDetailPaneProps) => {

  return (
    <div className="rds-detail-pane">
      <div className="rds-card">
        <h2 className="rds-card-title">Bayshore Transportation System</h2>
        <p className="rds-card-content">Agent Information</p>
        <hr/>
        <RdsSearch
        iconPosition="right"
        label=""
        labelPosition="right"
        placeholder="Search for Agnets by Name or #ID"
        size="small"
        />
        
      </div>
    </div>
  );
};

export default RdsDetailPane;
