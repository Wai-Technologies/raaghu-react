import React, { useEffect, useReducer } from "react";
import "./rds-checkbox-group.css";

export enum CheckboxState {
    Checkbox = "Checkbox",
    Indeterminate = "Indeterminate",
    ErrorCheckbox = "ErrorCheckbox",
  }  
export interface RdsCheckboxGroupProps {
    isSwitch?: boolean;
    isInline?: boolean;
    itemList: any;
    label?: string;
    id?: number;
    state?: CheckboxState;
    errorMessage?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    userData?: any[];
    multiOptionCheck?: boolean;
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INITIAL_STATE":
      return state.map((parents: any, index: any) => {
        if (
          parents.childList.filter((child: any) => child?.isSelected == true)
            .length >= 1 &&
          parents.childList.filter((child: any) => child?.isSelected == true)
            .length < parents.childList.length
        ) {
          return { ...parents, isIntermediate: true, isSelected: false };
        } else if (
          parents.childList.filter((child: any) => child?.isSelected == true)
            .length == parents.childList.length
        ) {
          return { ...parents, isIntermediate: false, isSelected: true };
        } else {
          return { ...parents, isIntermediate: false, isSelected: false };
        }
      });

    case "PARENT":
      return state.map((parents: any) => {
        if (parents.id === action.p_id) {
          const tempUser = parents.childList.map((child: any) => {
            return {
              ...child,
              isSelected: !parents.isSelected,
              isIntermediate: false,
            };
          });
          return {
            ...parents,
            isSelected: !parents.isSelected,
            childList: tempUser,
            isIntermediate: false,
          };
        } else {
          return parents;
        }
      });

    case "CHILD":
      return state.map((parents: any) => {
        if (parents.id === action.p_id) {
          const tempUser = parents.childList.map((child: any) => {
            if (child.id === action.c_id) {
              return { ...child, isSelected: !child.isSelected };
            } else {
              return child;
            }
          });
          const selecteds = tempUser.filter(
            (child: any) => child.isSelected == true
          ).length;

          if (selecteds == parents.childList.length) {
            return {
              ...parents,
              isSelected: true,
              isIntermediate: false,
              childList: tempUser,
            };
          } else if (selecteds > 0 && selecteds < parents.childList.length) {
            return {
              ...parents,
              isIntermediate: true,
              isSelected: true,
              childList: tempUser,
            };
          } else {
            return {
              ...parents,
              isSelected: false,
              isIntermediate: false,
              childList: tempUser,
            };
          }
        } else {
          return parents;
        }
      });
    default:
      return state;
  }
};

const RdsCheckboxGroup = (props: RdsCheckboxGroupProps) => {
  // Only use reducer if multiOptionCheck is false
  const [users, dispatch] = props.multiOptionCheck
    ? [[], () => {}]
    : useReducer(reducer, props.userData || []);

  const parentHandleChange = (parents: any) => {
    if (!props.multiOptionCheck) dispatch({ type: "PARENT", p_id: parents.id });
  };
  const childHandleChange = (child: any) => {
    if (!props.multiOptionCheck)
      dispatch({ type: "CHILD", c_id: child.id, p_id: child.parent_id });
  };

    const Switch1 = `${props.isSwitch === true ? " mb-3 form-switch " : " mb-3 form-check "
        } `;
    const Inline1 = `${props.isInline === true && props.isSwitch == false
        ? " form-check-inline"
        : ""
        } `;
    const state = props.state || "Checkbox";

  useEffect(() => {
    if (!props.multiOptionCheck) dispatch({ type: "INITIAL_STATE" });
  }, []);

    return (
      <>
        {props.multiOptionCheck === true ? (
          <div key={props.id}>
            <div>
              <label className="d-flex my-2 fw-semibold">{props.label}</label>

              {state == "ErrorCheckbox" && (
                <span className="error_Msg me-3"> {props.errorMessage}</span>
              )}
              {props.itemList.map((item: any, idx: any) => (
                <div key={item.id} className={`${Switch1} ${Inline1}`}>
                  {item.title && (
                    <div className="item___title__checkbox__group">
                      {item.title}
                    </div>
                  )}
                  <div>
                    <input
                      type="checkbox"
                      className={
                        props.state == "Indeterminate"
                          ? "form-check-input form-check-input-intermediate"
                          : props.state == "ErrorCheckbox"
                          ? "form-check-input form-check-input-error"
                          : "form-check-input"
                      }
                      name={item.name}
                      value={item.label}
                      defaultChecked={item.checked}
                      id={item.id}
                      disabled={item.disabled}
                      onClick={props.onClick}
                    />
                    <label htmlFor={item.id} className="ms-2 form-check-label">
                      {item.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container p-0 m-0">
            <form className="form  p-0 m-0 w-100">
              <ul className=" p-0 m-0 list-unstyled">
                {users.map((parents: any, index: number) => {
                  return (
                    <li className="line1 mb-3 p-0 m-0" key={index}>
                      <div className="form-check  ">
                        <label className="form-check-label ms-2">
                          <input
                            type="checkbox"
                            className={`${
                              parents?.isIntermediate
                                ? "form-check-input"
                                : "form-check-input"
                            }`}
                            name={parents?.label}
                            data-testid={parents.label}
                            checked={parents?.isSelected}
                            disabled={parents?.disabled}
                            onChange={() => parentHandleChange(parents)}
                          />
                          {parents?.label}
                        </label>
                      </div>
                      <ul className="list-unstyled ms-4">
                        {parents.childList.map((child: any, idx: any) => {
                          return (
                            <li className="line1 my-3" key={idx}>
                              <div className="form-check">
                                <label className="form-check-label ms-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={child?.id}
                                    data-testid={child.label}
                                    disabled={child?.disabled}
                                    checked={child?.isSelected}
                                    onChange={() => childHandleChange(child)}
                                  />
                                  {child?.label}
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </form>
          </div>
        )}
      </>
    );
};
export default RdsCheckboxGroup;
