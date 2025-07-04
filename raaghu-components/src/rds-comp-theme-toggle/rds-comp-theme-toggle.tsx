import React, { useState } from "react";
import "./rds-comp-theme-toggle.css";

export interface RdsCompThemeToggleProps {}

const RdsCompThemeToggle = (props: RdsCompThemeToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div id="theme-toggle" className="container mt-2 position-relative">
      <label className="form-check form-switch position-relative">
        <input
          className="form-check-input"
          type="checkbox"
          id="toggleSwitch"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className="tooltip-text">{isChecked ? "Dark" : "Light"}</span>
        <label className="form-check-label" htmlFor="toggleSwitch"></label>
      </label>
    </div>
  );
};

export default RdsCompThemeToggle;
