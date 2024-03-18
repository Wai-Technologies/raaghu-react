import React, { useState } from "react";
import "./rds-tab-group.css";

export interface RdsTabGroupProps {
  tabList: any;
  onClickTab?: any
}

const RdsTabGroup = (props: RdsTabGroupProps) => {
  const [activeTab, setActiveTabs] = useState<string[]>([]);

  const onClickSkill = (label: string) => {
    setActiveTabs(prevSkills => {
      if (prevSkills.includes(label)) {
        // If the skill is already active, remove it from the array
        return prevSkills.filter(skill => skill !== label);
      } else {
        // If the skill is not active, add it to the array
        return [...prevSkills, label];
      }
    });
  };
  return (<>
    {/* <div>RdsTabGroup</div> */}
    <div className="d-flex gap-3">
      {props.tabList && props.tabList.map((item: any, index: any) => (
        <div
          key={index}
          className={`skill-selector cursor-pointer rounded-3 px-3 py-2 ${activeTab.includes(item.label) ? 'active' : ''}`}
          onClick={() => onClickSkill(item.label)}
        >
          <p className="mb-0">{item.label}</p>
        </div>
      ))}
    </div>

  </>);
};

export default RdsTabGroup;
