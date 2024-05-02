import React, { useEffect, useReducer } from "react";
import "./rds-checkbox-parent-child.css";

export interface RdsCheckboxParentChildProps {
    userData: any[];
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
                        return { ...parents, isIntermediate: true, isSelected: true, childList: tempUser };
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
const RdsCheckboxParentChild = (props: RdsCheckboxParentChildProps) => {
    const [users, dispatch] = useReducer(reducer, props.userData);
    const parentHandleChange = (parents: any) => {
        dispatch({ type: "PARENT", p_id: parents.id });
    };
    const childHandleChange = (child: any) => {
        dispatch({ type: "CHILD", c_id: child.id, p_id: child.parent_id });
    };

    useEffect(() => {
        dispatch({ type: "INITIAL_STATE" });
    }, []);

    return (
        <>
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
                                                className={`${parents?.isIntermediate
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
        </>
    );
};
export default RdsCheckboxParentChild;
