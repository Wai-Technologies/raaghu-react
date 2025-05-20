import "./rds-comp-permission-tree-new.css";
import React, { useState, useEffect } from "react";
import { RdsCheckbox } from "../rds-elements";
import { CheckboxStatus } from "../../../raaghu-elements/src/rds-checkbox/rds-checkbox";

export interface RdsCompPermissionTreeNewProps {
    permissions: any[];
    selectedPermissions?: (data: any) => any;
    editedPermissions?: any
}

const RdsCompPermissionTreeNew = (props: RdsCompPermissionTreeNewProps) => {
    const modifiedPermissionData = props.permissions?.map(
        (parent, parentIndex) => {
            const mainParentChildren = props.permissions[parentIndex].permissions ?? [];
            const checkedChildren = mainParentChildren?.filter(
                (x: any) => x.isGranted
            );
            return mainParentChildren?.length === checkedChildren?.length
                ? {
                    ...parent,
                    isGranted: true,
                    isIntermediate: false,
                    mainParentIndex: parentIndex,
                    permissions: addMainParentIndex(parent, parentIndex),
                }
                : checkedChildren?.length > 0 && checkedChildren?.length
                    ? {
                        ...parent,
                        isGranted: true,
                        isIntermediate: true,
                        mainParentIndex: parentIndex,
                        permissions: addMainParentIndex(parent, parentIndex),
                    }
                    : checkedChildren?.length === 0
                        ? {
                            ...parent,
                            isGranted: false,
                            isIntermediate: false,
                            mainParentIndex: parentIndex,
                            permissions: addMainParentIndex(parent, parentIndex),
                        }
                        : {
                            ...parent,
                            mainParentIndex: parentIndex,
                            permissions: addMainParentIndex(parent, parentIndex),
                        };
        }
    );

    useEffect(() => {
        handlerAll(modifiedPermissionData);
        const allData: any = [];
        for (let i = 0; i < modifiedPermissionData?.length; i++) {
            modifiedPermissionData[i].permissions.forEach((ele: any) =>
                allData.push(ele)
            );
        }
        console.log("allData", allData)
        localStorage.setItem("initailStateData", JSON.stringify(allData));
    }, []);

    const [treeData, setTreeData] = useState(modifiedPermissionData);
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllInter, setSelectAllInter] = useState(false);

    const [emittedData, setEmittedData] = useState<any>([]);


    useEffect(() => {
        setTreeData(modifiedPermissionData)
        handlerAll(modifiedPermissionData);
    }, [props.permissions]);

    function addMainParentIndex(parent: any, parentIndex: number) {
        return parent.permissions?.length > 0
            ? parent.permissions?.map((child: any) => {
                return { ...child, mainParentIndex: parentIndex };
            })
            : [];
    }
    function selectAllFn(event: any) {
        const allCheck = treeData?.map((item: any) => ({
            ...item,
            isGranted: event,
            isIntermediate: false,
            permissions: item.permissions?.map((permItems: any) => ({
                ...permItems,
                isGranted: event,
            })),
        }));
        emitData(allCheck);
        setSelectAll(event);
        setSelectAllInter(false);
        setTreeData(allCheck);
        props.editedPermissions && props.editedPermissions(allCheck)
    }

    function selectParentFn(event: any, checkData: any, mainParentIndex: number) {
        checkData.isGranted = event;
        checkData.isIntermediate = false;
        const selectAllChild = treeData?.map((parent: any) => {
            return {
                ...parent,
                isGranted: checkData.name === parent.name ? event : parent.isGranted,
                mainParentIndex: mainParentIndex,
                isIntermediate:
                    checkData.name === parent.name ? false : parent.isIntermediate,
                permissions: parent.permissions?.map((child: any) => ({
                    ...child,
                    isGranted: checkData.name === parent.name ? event : child.isGranted,
                    mainParentIndex: mainParentIndex,
                })),
            };
        });
        emitData(selectAllChild);
        handlerAll(selectAllChild);
        setTreeData(selectAllChild);
        props.editedPermissions && props.editedPermissions(selectAllChild);
    }

    function selectChild(checked: any, checkData: any, mainParentIndex: number) {
        checkData.mainParentIndex = mainParentIndex;
        checkData.isGranted = checked;

        const data = treeData?.map((parent: any) => {
            return {
                ...parent,
                permissions: parent.permissions?.map((child: any) => {
                    if (parent.permissions?.length > 0) {
                        if (checkData.parentName !== null) {
                            if (checkData.name === child.name) {
                                return {
                                    ...child,
                                    isGranted: checked,
                                    mainParentIndex: mainParentIndex,
                                };
                            }
                            if (checkData.parentName === child.name && checkData.isGranted) {
                                return {
                                    ...child,
                                    isGranted: true,
                                    mainParentIndex: mainParentIndex,
                                };
                            } else {
                                return { ...child, mainParentIndex: mainParentIndex };
                            }
                        } else if (checkData.parentName === null) {
                            const childrenLength = parent.permissions?.filter(
                                (x: any) => x.parentName === checkData.name
                            )?.length;
                            if (childrenLength > 0) {
                                if (
                                    checkData.name === child.parentName &&
                                    !checkData.isGranted
                                ) {
                                    return {
                                        ...child,
                                        isGranted: false,
                                        mainParentIndex: mainParentIndex,
                                    };
                                } else {
                                    return {
                                        ...child,
                                        isGranted: child.isGranted,
                                        mainParentIndex: mainParentIndex,
                                    };
                                }
                            } else {
                                return {
                                    ...child,
                                    isGranted:
                                        checkData.name === child.name ? checked : child.isGranted,
                                    mainParentIndex: mainParentIndex,
                                };
                            }
                        }
                    }
                }),
            };
        });
        emitData(data);
        const mainParentChildren = data[mainParentIndex].permissions;
        const checkedChildren = mainParentChildren?.filter((x: any) => x.isGranted);
        const itemData = data?.map((parent: any, i: any) => {
            return mainParentIndex === i
                ? mainParentChildren?.length === checkedChildren?.length
                    ? {
                        ...parent,
                        isGranted: true,
                        isIntermediate: false,
                        mainParentIndex: mainParentIndex,
                    }
                    : checkedChildren?.length > 0 && checkedChildren?.length
                        ? {
                            ...parent,
                            isGranted: true,
                            isIntermediate: true,
                            mainParentIndex: mainParentIndex,
                        }
                        : {
                            ...parent,
                            isGranted: false,
                            isIntermediate: false,
                            mainParentIndex: mainParentIndex,
                        }
                : { ...parent, mainParentIndex: mainParentIndex };
        });
        handlerAll(itemData);
        setTreeData(itemData);
        props.editedPermissions && props.editedPermissions(itemData);
    }

    function emitData(allData: any) {
        const data: any = [];
        for (let i = 0; i < allData?.length; i++) {
            allData[i].permissions.forEach((ele: any) => data.push(ele));
        }
        setEmittedData(data);
    }

    useEffect(() => {
        const spliceMainParentUndefined = emittedData?.filter(
            (x: any) => x.parentName !== undefined
        );
        const initailStateData = JSON.parse(
            localStorage.getItem("initailStateData") as string
        );
        for (let mainIndex = 0; mainIndex < initailStateData?.length; mainIndex++) {
            for (
                let resultIndex = 0;
                resultIndex < spliceMainParentUndefined?.length;
                resultIndex++
            ) {
                const valueFromResult = spliceMainParentUndefined[resultIndex];
                const valueFromMain = initailStateData[mainIndex];
                if (
                    valueFromMain !== undefined &&
                    valueFromMain.name === valueFromResult.name &&
                    valueFromMain.isGranted === valueFromResult.isGranted
                ) {
                    const startIndex = spliceMainParentUndefined.findIndex(
                        (x: any) => x.name === valueFromMain.name
                    );
                    spliceMainParentUndefined.splice(startIndex, 1);
                }
            }
        }
        const data = spliceMainParentUndefined?.map((x: any) => ({
            name: x.name,
            isGranted: x.isGranted,
        }));
        props.selectedPermissions && props.selectedPermissions(data);
    }, [emittedData]);

    // Show Vertical Line
    function showVerticalLine(node: any, mainParentIndex: number) {
        const per = modifiedPermissionData[mainParentIndex]?.permissions;
        const data = per?.length;
        const lastElementName = per[per?.length - 1].name;
        return data > 0 && data <= 1
            ? false
            : lastElementName === node.name
                ? false
                : true;
    }

    // Set SelectAll Main Checkbox
    function handlerAll(data: any) {
        if (data) {
            const getGrantedLength = data?.filter((x: any) => x.isGranted).length;
            const getInterLength = data?.filter((x: any) => x.isIntermediate).length;
            setSelectAllInter(
                getGrantedLength === data.length
                    ? getInterLength > 0
                        ? true
                        : false
                    : getGrantedLength > 0 && getGrantedLength < data?.length
                        ? true
                        : false
            );
            setSelectAll(
                getGrantedLength === data.length ||
                    (getGrantedLength > 0 && getGrantedLength < data?.length)
                    ? true
                    : false
            );
        }
    }

    // Custom height of vertical line for child
    function customHeightChild(node: any, mainParentIndex: number) {
        const lastChildElement =
            modifiedPermissionData[mainParentIndex].permissions[
            modifiedPermissionData[mainParentIndex].permissions?.length - 1
            ];
        if (lastChildElement.name === node.name) return "0%";
        return "100%";
    }

    return (
        <>
            <div className="checkedstyle dottedstyle pb-5 pt-3">
                <div className="position-relative">
                    <div className="vertical-dotted-line-select-all"></div>
                    <RdsCheckbox
                        labelText="Select All"
                        checked={selectAll}
                        onChange={(e) => selectAllFn(e.target.checked)}
                        status={selectAllInter ? CheckboxStatus.Indeterminate : CheckboxStatus.Checked}
                        dataTestId="select-all"
                    />
                    {treeData?.map((mainParent: any, mainParentIndex: any) => (
                        <div className="ms-4 position-relative">
                            <div
                                className="vertical-dotted-line"
                            ></div>
                            {/* style={{ height: customHeightParent(mainParent) }} */}
                            <div className="position-relative pt-4">
                                <RdsCheckbox
                                    labelText={mainParent.displayName}
                                    checked={mainParent.isGranted}
                                    status={mainParent.isIntermediate ? CheckboxStatus.Indeterminate : CheckboxStatus.Checked}
                                    onChange={(e) =>
                                        selectParentFn(e.target.checked, mainParent, mainParentIndex)
                                    }
                                />
                                <div className="horizontal-dotted-line dottedstyle"></div>
                            </div>
                            {mainParent.permissions?.map((parent: any, i: number) => (
                                <div className="ms-4 position-relative">
                                    <div
                                        className={
                                            "vertical-dotted-line " +
                                            `${!showVerticalLine(parent, mainParentIndex) ? "d-none" : ""
                                            }`
                                        }
                                        style={{ height: customHeightChild(parent, mainParentIndex) }}
                                    ></div>
                                    <div
                                        className={
                                            "position-relative pt-4 " +
                                            `${parent.parentName === null ? "" : "ms-4"}`
                                        }
                                    >
                                        <RdsCheckbox
                                            labelText={parent.displayName}
                                            status={parent.isIntermediate ? CheckboxStatus.Indeterminate : CheckboxStatus.Checked}
                                            checked={parent.isGranted}
                                            onChange={(e) =>
                                                selectChild(e.target.checked, parent, mainParentIndex)
                                            }
                                        />
                                        <div className="horizontal-dotted-line dottedstyle"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default RdsCompPermissionTreeNew;
