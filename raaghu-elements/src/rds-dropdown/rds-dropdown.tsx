import React, { useState, useEffect } from "react";
import RdsIcon from "../rds-icon";
import Tooltip from "../rds-tooltip/rds-tooltip";
import './rds-dropdown.css';

export interface RdsDropdownProps {
  colorVariant: string;
  size: string;
  darkDropdown: boolean;
  label: string;
  displayType?: 'dropdown' | 'split';
  listItems: any[];
  id: string;
  buttonIcon?: string;
  showChevron?: boolean;
  iconFill?: boolean;
  shape?: 'rectangle' | 'pill';
  style?: 'primary' | 'secondary' | 'outline' | 'transparent';
  iconStroke?: boolean;
  disable?: boolean;
  layout?: 'Textonly' | 'IconBefore' | 'onlyIcon';
  isSelected?: boolean;
  selectIcon?: string;
  profileImage?: string;
  states?: 'default' | 'hover' | 'disabled' | 'selected';
  tooltip?: boolean;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  tooltipTitle?: string;
  state?: string;
}

const RdsDropdown = (props: RdsDropdownProps) => {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleShow = () => {
    if (!props.disable) {
      setShow(!show);
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter(id => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  useEffect(() => {
    if (props.state === 'selected') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props.state]);

  const renderContent = () => {
    switch (props.layout) {
      case "IconBefore":
        return (
          <>
            {props.buttonIcon && (
              <span className="icon-before ">
                <RdsIcon name={props.buttonIcon} stroke />
              </span>
            )}
            {props.label && <span className="mx-1 ">{props.label}</span>}
          </>
        );
      case "Textonly":
        return <span>{props.label}</span>;
      case "onlyIcon":
        return (
          <>
            {props.buttonIcon && (
              <span className="only-icon ps-2">
                <RdsIcon name={props.buttonIcon} stroke />
              </span>
            )}
          </>
        );
      default:
        return <span>{props.label}</span>;
    }
  };

  const getSizeClass = () => {
    switch (props.size) {
      case 'small- sm':
        return '';
      case 'medium':
        return 'btn-md px-4';
      case 'large':
        return 'btn-lg';
      default:
        return '';
    }
  };

  const getStateClass = () => {
    switch (props.states) {
      case 'hover':
        return 'btn-hover';
      case 'disabled':
        return 'btn-disabled';
      case 'selected':
        return 'btn-selected';
      default:
        return 'btn-default';
    }
  };

  const getStyleClass = () => {
    switch (props.style) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'transparent':
        return 'btn-transparent';
      default:
        return '';
    }
  };

  const getShapeClass = () => {
    switch (props.shape) {
      case 'pill':
        return 'btn-pill';
      case 'rectangle':
      default:
        return 'btn-rectangle';
    }
  };

  const buttonClass = `btn ${getStyleClass()} ${getShapeClass()} btn-${props.colorVariant} ${getSizeClass()} ${getStateClass()}`;

  const renderButton = () => (
    <button className={`${buttonClass} ${show ? 'show' : ''}`}
      type="button"
      id="chevron"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      onClick={toggleShow}
      disabled={props.disable}
      style={props.style === 'transparent' ? { backgroundColor: 'transparent', border: 'none' } : {}}
    >
      {renderContent()}
      <span className={`ms-2 chevron-icon ${show ? 'chevron-up' : 'chevron-down'}`}> 
        {props.showChevron && (
          <RdsIcon
            name={show ? "chevron_up" : "chevron_down"}
            height="8px"
            width="12px"
            fill={props.iconFill}
            stroke={props.iconStroke}
            colorVariant={props.style === 'primary' ? 'white' : props.colorVariant} // Apply white color to chevron for primary style
          />
        )}
      </span>
    </button>
  );

  return (
    <>
      {props.displayType === 'dropdown' && (
        <div className="dropdown">
          {props.tooltip ? (
            <Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
              {renderButton()}
            </Tooltip>
          ) : (
            renderButton()
          )}
          <ul className={`dropdown-menu ${show ? 'show' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ''}`} aria-labelledby="chevron">
            {props.listItems.map((listItem) => (
              <li id={listItem.id} role="menuitem" key={listItem.id} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                {props.isSelected && (
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(listItem.id)}
                    onChange={() => handleCheckboxChange(listItem.id)}
                    className="me-1"
                  />
                )}
                {props.profileImage && (
                  <img src={props.profileImage} className="me-1" alt="" height={20} width={20} />
                )}
                {props.selectIcon && (
                  <RdsIcon
                    colorVariant="dark"
                    stroke
                    height="20px"
                    isCursorPointer
                    name={props.selectIcon}
                    width="20px"
                  />
                )}
                <a className="dropdown-item text-wrap" href={listItem.path}>
                  {listItem.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RdsDropdown;