import React, { useState } from "react";
import "./rds-comp-transfer-list.css";
import { RdsButton, RdsCheckbox } from "../rds-elements";
import { CheckboxStyle } from "../../../raaghu-elements/src/rds-checkbox/rds-checkbox";

export interface RdsCompTransferListProps {
  selectAllType?: "default" | "advanced";
}

const RdsCompTransferList = (props: RdsCompTransferListProps) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [left, setLeft] = useState<number[]>([0, 1, 2, 3, 4]);
  const [right, setRight] = useState<number[]>([5, 6, 7, 8, 9]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items: number[], isChecked: boolean) => {
    if (isChecked) {
      setChecked([
        ...checked,
        ...items.filter((item) => !checked.includes(item)),
      ]);
    } else {
      setChecked(checked.filter((item) => !items.includes(item)));
    }
  };

  const numberOfChecked = (items: number[]) =>
    checked.filter((value) => items.indexOf(value) !== -1).length;

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleMoveAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleMoveAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const not = (a: number[], b: number[]) => {
    return a.filter((value) => b.indexOf(value) === -1);
  };

  const intersection = (a: number[], b: number[]) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  return (
    <div className="transfer-list-container">
      <div className="transfer-list">
        {props.selectAllType === "advanced" && (
          <>
            <div className="transfer-list-header">
              <RdsCheckbox
                style={CheckboxStyle.Square}
                checked={
                  numberOfChecked(left) === left.length && left.length !== 0
                }
                onChange={(e) => handleToggleAll(left, e.target.checked)}
                labelText="Choices"
              />
            </div>
            <div className="selected-counter">
              {numberOfChecked(left)}/{left.length} selected
            </div>
            <hr />
          </>
        )}
        {left.map((value) => (
          <div key={value} className="transfer-list-item">
            <RdsCheckbox
               style={CheckboxStyle.Square}
              checked={checked.indexOf(value) !== -1}
              onChange={handleToggle(value)}
              labelText={`List item ${value + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="button-controls gap-2">
        {props.selectAllType === "default" && (
          <RdsButton
            label=">>"
            colorVariant="primary"
            size="small"
            onClick={handleMoveAllRight}
            isDisabled={left.length === 0}
          />
        )}
        <RdsButton
          label=">"
          colorVariant="primary"
          size="small"
          onClick={handleCheckedRight}
          isDisabled={leftChecked.length === 0}
        />
        <RdsButton
          label="<"
          colorVariant="primary"
          size="small"
          onClick={handleCheckedLeft}
          isDisabled={rightChecked.length === 0}
        />
        {props.selectAllType === "default" && (
          <RdsButton
            label="<<"
            colorVariant="primary"
            size="small"
            onClick={handleMoveAllLeft}
            isDisabled={right.length === 0}
          />
        )}
      </div>
      <div className="transfer-list">
        {props.selectAllType === "advanced" && (
          <>
            <div className="transfer-list-header">
              <RdsCheckbox
                style={CheckboxStyle.Square}
                checked={
                  numberOfChecked(right) === right.length && right.length !== 0
                }
                onChange={(e) => handleToggleAll(right, e.target.checked)}
                labelText="Chosen"
              />
            </div>
            <div className="selected-counter">
              {numberOfChecked(right)}/{right.length} selected
            </div>
            <hr />
          </>
        )}
        {right.map((value) => (
          <div key={value} className="transfer-list-item">
            <RdsCheckbox
              style={CheckboxStyle.Square}
              checked={checked.indexOf(value) !== -1}
              onChange={handleToggle(value)}
              labelText={`List item ${value + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RdsCompTransferList;
