import React, { useState, useEffect, useReducer } from "react";
import { RdsButton } from "../rds-elements";
import "./rds-comp-claim.css";

export interface RdsCompClaimProps {
    resources: any[];
    onCreate?: (State: any) => void;
    onCancel?: (State: any) => void;
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "Parent":
            return state.map((parent: any, i: any) => {
                if (parent.id === action.P_id) {
                    const tempRes = parent.children.map((child: any) => {
                        return { ...child, selected: !parent.selected };
                    });

                    return {
                        ...parent,
                        selected: !parent.selected,
                        children: tempRes,
                    };
                } else {
                    return {
                        ...parent,
                    };
                }
            });
        case "Child":
            return state.map((parent: any) => {
                if (parent.id === action.P_id) {
                    const tempChi = parent.children.map((child: any) => {
                        if (child.id === action.C_id) {
                            return { ...child, selected: !child.selected };
                        } else {
                            return { ...child, selected: child.selected };
                        }
                    });

                    const selected = tempChi.filter(
                        (child: any) => child.selected == true
                    ).length;

                    if (selected === parent.children.length) {
                        return {
                            ...parent,
                            selected: true,
                            children: tempChi,
                        };
                    } else {
                        return {
                            ...parent,
                            selected: false,
                            children: tempChi,
                        };
                    }
                } else {
                    return {
                        ...parent,
                    };
                }
            });
        case "grand":
            return state.map((parent: any) => {
                const tempChi = parent.children.map((child: any) => {
                    if (action.event.target.checked) {
                        return { ...child, selected: true };
                    } else {
                        return { ...child, selected: false };
                    }
                });
                const t = 1;
                const tempT = parent.children.map((chil: any) => {
                    chil.selected ? t + 1 : t;
                    return t;
                });

                const selected = tempChi.filter(
                    (child: any) => child.selected == true
                ).length;

                if (selected === parent.children.length) {
                    return {
                        ...parent,
                        selected: true,
                        children: tempChi,
                    };
                } else {
                    return {
                        ...parent,
                        selected: false,
                        children: tempChi,
                    };
                }
            });

        case "RESET":
            return action.payload;
        default:
            return state;
    }
};

const RdsCompClaim = (props: RdsCompClaimProps) => {
    const [Res, dispatch] = useReducer(reducer, props.resources);
    const [check, setcheck] = useState(false);

    useEffect(() => {
        const selected = Res.filter((Parent: any) => Parent.selected == true).length;

        if (selected === Res.length) {
            setcheck(true);
        } else {
            setcheck(false);
        }


    });

    const ChandleChange = (Child: any, Parent: any, e: any) => {
        dispatch({ type: "Child", P_id: Parent.id, C_id: Child.id });
    };
    const Phandlechange = (resource: any) => {
        dispatch({ type: "Parent", P_id: resource.id });
    };
    const Ghandlechange = (event: any) => {
        dispatch({ type: "grand", event: event });
        setcheck(!check);
    };
    const resetForm = () => {
        dispatch({ type: "RESET", payload: props.resources });
    };

    return (
        <>
            <div className="form">
                <div className="custom-content-scroll">
                    <input
                        type="checkbox"
                        name="select all"
                        checked={check}
                        onChange={(event) => Ghandlechange(event)}
                        id="flexCheckDefault"
                        className="form-check-input"
                    ></input>{" "}
                    <label htmlFor="flexCheckDefault" className="form-check-label">
                        Select all
                    </label>
                    <div className="col-md-12 mt-3">
                        {Res.map((resource: any, i: number) => {
                            return (
                                <div key={i}>
                                    <>
                                        <h6 className="mt-4">{resource.displayName}</h6>
                                        <hr />
                                        <div className="mt-2">
                                            {" "}
                                            <input
                                                type="checkbox"
                                                name="select everything"
                                                checked={resource.selected}
                                                onChange={(event) => Phandlechange(resource)}
                                                id={`${i}`}
                                                className="form-check-input"
                                            ></input>{" "}
                                            <label className="form-check-label" htmlFor={`${i}`}>
                                                Select all
                                            </label>
                                        </div>

                                        <div className="accbodycheck mt-3 row">
                                            {resource.children.map((check: any, idd: number) => (
                                                <div key={idd} className="col-md-4 pb-2">
                                                    <input
                                                        id={`${i}${idd}`}
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name={check.displayName}
                                                        checked={check.selected}
                                                        onChange={(event) =>
                                                            ChandleChange(check, resource, event)
                                                        }
                                                    ></input>{" "}
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`${i}${idd}`}
                                                    >
                                                        {check.displayName}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                    <RdsButton
                        class="me-2"
                        tooltipTitle={""}
                        type={"button"}
                        label="Cancel"
                        colorVariant="outline-primary"
                        size="small"
                        databsdismiss="offcanvas"
                    ></RdsButton>
                    <RdsButton
                        class="me-2"
                        label="Save"
                        size="small"
                        colorVariant="primary"
                        tooltipTitle={""}
                        type={"submit"}
                        databsdismiss="offcanvas"
                        onClick={() => {
                            props.onCreate && props.onCreate(Res);
                            resetForm();
                        }}
                    ></RdsButton>
                </div>
            </div>
        </>
    );
};

export default RdsCompClaim;
