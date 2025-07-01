import React, { useState, useEffect, useReducer } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import "./rds-comp-claim.css";
import RdsDatatable from "../../../raaghu-elements/src/rds-data-table";
import { ActionPosition } from "../../../raaghu-elements/src/rds-data-table/rds-data-table";
import RdsCompSelectList from "../rds-comp-select-list";

export interface RdsCompClaimProps {
    resources?: any[];
    onCreate?: (State: any) => void;
    onCancel?: (State: any) => void;
    claim?: string;
    allClaimsArray?: any[];
    claimsTable?: any[];
    id?: any;
    getEditClaimData?: any;
    tableHeaders?: any[];
    onActionSelection?: any;
    reset?: boolean;
    actions?: any;
    claimsData?: any;
    valueType: { option: any, value: any }[];
    onSaveHandler?: (data: any) => void;
}

export interface SelectedItem {
    type: string;
    value: string;
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "Parent":
            return state.map((parent: any) => {
                if (parent.id === action.P_id) {
                    const tempRes = parent.children.map((child: any) => ({
                        ...child,
                        selected: !parent.selected,
                    }));
                    return {
                        ...parent,
                        selected: !parent.selected,
                        children: tempRes,
                    };
                }
                return { ...parent };
            });
        case "Child":
            return state.map((parent: any) => {
                if (parent.id === action.P_id) {
                    const tempChi = parent.children.map((child: any) =>
                        child.id === action.C_id
                            ? { ...child, selected: !child.selected }
                            : { ...child }
                    );

                    const selected = tempChi.filter((child: any) => child.selected).length;

                    return {
                        ...parent,
                        selected: selected === parent.children.length,
                        children: tempChi,
                    };
                }
                return { ...parent };
            });

        case "grand":
            return state.map((parent: any) => {
                const tempChi = parent.children.map((child: any) => ({
                    ...child,
                    selected: action.event.target.checked,
                }));

                return {
                    ...parent,
                    selected: action.event.target.checked,
                    children: tempChi,
                };
            });

        case "RESET":
            return action.payload;
        default:
            return state;
    }
};

const RdsCompClaim = (props: RdsCompClaimProps) => {
    const [Res, dispatch] = useReducer(reducer, props.resources ?? []);
    const [check, setcheck] = useState(false);
    const [allClaimsArray, setAllClaimsArray] = useState<any>(props.allClaimsArray);
    const [inputReset, setInputReset] = useState(props.reset);
    const [formData, setFormData] = useState({
        name: "",
        regex: "",
        valueType: "",
        regexDescription: "",
        description: "",
        required: false,
        ...props.claimsData
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedData, setSelectedData] = useState<any>({
        id: 0,
        claimType: null,
        claimValue: "",
        roleId: props.id,
        valueTypeAsString: "",
    });
    const { tableHeaders = [] } = props;
    const [tableData, setTableData] = useState<any>(
        Array.isArray(props.claimsTable) ? props.claimsTable : []
    );
        const [uniqueIdCounter, setUniqueIdCounter] = useState(0);
        const [dropdownKey, setDropdownKey] = useState(0);

    useEffect(() => {
        if (!Array.isArray(Res)) return;

        const selected = Res.filter((Parent: any) => Parent.selected === true).length;
        setcheck(selected === Res.length);
    }, [Res]);

    const ChandleChange = (Child: any, Parent: any) => {
        dispatch({ type: "Child", P_id: Parent.id, C_id: Child.id });
    };
    const Phandlechange = (resource: any) => {
        dispatch({ type: "Parent", P_id: resource.id });
    };
    const Ghandlechange = (event: any) => {
        dispatch({ type: "grand", event });
        setcheck(event.target.checked);
    };
    const resetForm = () => {
        dispatch({ type: "RESET", payload: props.resources ?? [] });
    };

    useEffect(() => {
            setInputReset(props.reset);
        }, [props.reset]);
    
        useEffect(() => {
            checkFormValidity(formData);
        }, [formData]);
    
        const handleSelectChange = (value: any, key: string) => {        
            setFormData({ ...formData, [key]: value });
        };
    
        const checkFormValidity = (formData: any) => {
            const requiredFields = ["name", "regex", "valueType", "regexDescription"];
            const isValid = requiredFields.every((field) => formData[field] && formData[field].toString().trim() !== "");
            setIsFormValid(isValid);
        };
    
        const emitSaveData = (event: any) => {
            event.preventDefault();
            if (isFormValid) {
                props.onSaveHandler && props.onSaveHandler(formData);
    
                setFormData({
                    name: "",
                    regex: "",
                    valueType: "",
                    regexDescription: "",
                    description: "",
                    required: false
                });
                setInputReset(!inputReset);
            }
            console.log("after clearing formData", formData);
        };

    const handleAddItem = () => {
            const newTempData = {
                id: uniqueIdCounter,
                claimType: selectedData.claimType.label,
                claimValue: selectedData.claimValue,
                roleId: props.id,
                valueTypeAsString: selectedData.claimType.value,
            };
        
            setTableData((prev: any) => [...prev, newTempData]);
            setUniqueIdCounter(uniqueIdCounter + 1);
    
        
            if (props.getEditClaimData) {
                props.getEditClaimData(newTempData);
            }
    
            setSelectedData({
                id: 0,
                claimType:null,
                claimValue: "",
                roleId: props.id,
                valueTypeAsString: "",
            });
            setDropdownKey((prevKey) => prevKey + 1);
            setInputReset(true);
        };
    
        const handleDeleteItem = (id: number) => {
            setTableData((prev: any) => prev.filter((item: any) => item.id !== id));
        };
    
        useEffect(() => {
            setAllClaimsArray(props.allClaimsArray);
        }, [props.allClaimsArray]);
    
        useEffect(() => {
            setInputReset(props.reset);
        }, [props.reset]);
    
        const tableActions = [
            {
                id: "delete", 
                displayName: "Delete",
                onClick: (row: any) => handleDeleteItem(row.id),
            },
        ];

    return (
        <>
        {props.claim === "default" && (
            <div className="form">
                <div className="custom-content-scroll">
                    <input
                        type="checkbox"
                        name="select all"
                        checked={check}
                        onChange={(event) => Ghandlechange(event)}
                        id="flexCheckDefault"
                        className="form-check-input"
                    />{" "}
                    <label htmlFor="flexCheckDefault" className="form-check-label">
                        Select all
                    </label>
                    <div className="col-md-12 mt-3">
                            {Res.map((resource: any, i: number) => (
                                <div key={i}>
                                    <h6 className="mt-4">{resource.displayName}</h6>
                                    <hr />
                                    <div className="mt-2">{" "}
                                        <input
                                            type="checkbox"
                                            checked={resource.selected}
                                            onChange={() => Phandlechange(resource)}
                                            id={`${i}`}
                                            className="form-check-input"
                                        />{" "}
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
                                                    checked={check.selected}
                                                    onChange={() =>
                                                        ChandleChange(check, resource)
                                                    }
                                                />{" "}
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`${i}${idd}`}
                                                >
                                                    {check.displayName}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
                    />
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
                    />
                </div>
            </div>
        )}
        
        {props.claim === "advanced" && (
            <div className="form">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <RdsCompSelectList
                            key={dropdownKey}
                            id="claim"                            
                            label="Claim Types"
                            placeholder="Select Claim Type"
                            selectItems={allClaimsArray}
                            selectedValue={selectedData.claimType}
                            onChange={(item: any) => {
                                setSelectedData({ ...selectedData, claimType: item });
                            }}
                            dataTestId="select"
                            color="primary"
                        />
                    </div>

                    <div className="col-md-5">
                        <RdsInput
                           required={true}                           
                            label={true}
                            reset={inputReset}
                            placeholder="Enter Value"
                            name="Value"
                            value={selectedData.claimValue}
                            onChange={(event) =>
                                setSelectedData({
                                    ...selectedData,
                                    claimValue: event.target.value,
                                })
                            }
                            dataTestId="value"
                            />
                    </div>

                    <div className="col-md-2 mt-xxl-1 mt-xl-2 mt-lg-2 mt-md-2 ps-xxl-1 ps-xl-2 ps-lg-2 ps-md-1 pt-xxl-4 pt-xl-4 pt-lg-4 pt-md-4 mt-2">
                        <RdsButton
                            type={"button"}
                            label=""
                            icon="plus"
                            iconHeight="15px"
                            onClick={handleAddItem}
                            class="text-start"
                            isDisabled={!selectedData.claimValue}
                            iconColorVariant="dark"
                            colorVariant="primary"
                            size="medium"
                            dataTestId="add"
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <RdsDatatable
                        key={tableData.length} 
                        actionPosition={ActionPosition.Right}
                        tableHeaders={props.tableHeaders || []}
                        tableData={tableData || []}
                        pagination={true}
                        recordsPerPage={5}
                        actions={tableActions}  
                        recordsPerPageSelectListOption={true}
                        onActionSelection={props.onActionSelection}
                    />
                </div>
            </div>
        )}
        {props.claim === "type" && (
        <>
            <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-md-12">
                        <RdsInput                            
                            label={true}
                            value={formData?.name}
                            placeholder="Enter Name"
                            required={true}
                            name="Name"
                            onChange= {(e) =>{handleSelectChange(e.target.value , "name");}}
                            dataTestId="name"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-6  pt-2">
                        {" "}
                        <RdsInput                           
                            label={true}
                            value={formData?.regex}
                            placeholder="Enter Regex"
                            name="Regex"
                            required={true}
                            onChange= {(e) =>{handleSelectChange(e.target.value , "regex");}}
                            dataTestId="regex"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-6 mb-md-0 pt-2 ">
                        <RdsCompSelectList
                            id="idenval"
                            label="Value Type"
                            placeholder="Select Value Type"
                            selectItems= {props.valueType}
                            selectedValue={formData?.valueType}
                            onChange= {(item: any) =>{handleSelectChange(item.value, "valueType");}}
                            dataTestId="value-type"
                            required={true}
                            key={`valueType-${formData?.valueType}`}
                            color="primary"
                        ></RdsCompSelectList>

                    </div>
                    <div className="col-md-12 pt-2">
                        <RdsInput                          
                            label={true}
                            value={formData?.regexDescription}
                            placeholder="Enter Regex Description"
                            name="Regex Description"
                            required={true}
                            onChange= {(e) =>{handleSelectChange(e.target.value , "regexDescription");}}
                            dataTestId="reges-description"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-12 pt-2">
                        <RdsTextArea
                            label="Description"
                            showTitle={true}
                            placeholder="Enter Description"
                            onChange= {(e) =>{handleSelectChange(e.target.value , "description");}}
                            value={formData?.description}
                            rows={3}
                            dataTestId="description"

                        />
                    </div>

                    <div className="col-md-12 pb-3">
                        <RdsCheckbox
                            labelText="Required"
                            onChange= {(e) =>{handleSelectChange(e.target.checked , "required");}}
                            checked={formData?.required}
                            dataTestId="required"
                        ></RdsCheckbox>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                    label="Cancel"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    dataTestId="cancel"
                    onClick={props.onCancel}
                ></RdsButton>
                <RdsButton
                    label="Save"
                    type={"button"}
                    size="small"
                    databsdismiss="offcanvas"
                    isDisabled={!isFormValid}
                    colorVariant="primary"
                    onClick={(e: any) => emitSaveData(e)}
                    dataTestId="save"
                ></RdsButton>
            </div>            
        </>
        )}
        </>
    );
};

export default RdsCompClaim;
