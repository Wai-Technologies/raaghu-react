import { RdsButton, RdsInput } from "../rds-elements";
import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { useTranslation } from "react-i18next";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

interface RdsCompPollsOptionProps {
  getPollsOptionData?: any;
  optionsData?: any;
}

const RdsCompPollsOption = (props: RdsCompPollsOptionProps) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [optionData, setOptionData] = useState<{ option: string }>({
    option: "",
  });
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    if (Array.isArray(props.optionsData)) {
      setTableData(props.optionsData);
    }
  }, [props.optionsData]);

  function optionChange(value: string) {
    setOptionData({ option: value });
    if (value.trim() === "") {
      setError("Option cannot be empty");
    } else {
      setError("");
    }
  }

  const tableHeaders = [
    {
      displayName: "Text",
      key: "text",
      datatype: "text",
      sortable: true,
    },
  ];
  const actions = [
    { id: "editPolls", displayName: "Edit" },
    { id: "deletePolls", displayName: "Delete" },
  ];
  const [areWeEditing, setAreWeEditing] = useState(false);
  const [dataId, setDataId] = useState("");

  function generateUniqueID() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const timestamp = Date.now();
    const uniqueID = `${randomNumber}-${timestamp}`;
    return uniqueID;
  }

  function getSwappedData(data: any) {
    setTableData(data);
  }
  const [updateTable, setUpdateTable] = useState(false);

  const onActionHandler = (rowData: any, actionId: any) => {
    if (actionId === "editPolls") {
      setAreWeEditing(true);
      setDataId(rowData.id);
      const editData = tableData.find(
        (element: any) => element.id === rowData.id
      );
      if (editData) {
        setOptionData({ option: editData.text });
      }
    } else if (actionId === "deletePolls") {
      const tempTableData1 = tableData.filter(
        (res: any) => res.id !== rowData.id
      );
      setTableData(tempTableData1);
      setUpdateTable(!updateTable);
    }
  };

  function handleAddItem(event: any) {
    if (optionData.option.trim() === "") {
      setError("Option cannot be empty");
      return;
    }

    setError("");
    event.preventDefault();
    if (areWeEditing) {
      setAreWeEditing(false);
      const tempTableData2: any[] = [];
      tableData?.map((res: any) => {
        if (res.id == dataId) {
          res.text = optionData.option;
        }
        tempTableData2.push(res);
      });
      setTableData(tempTableData2);
    } else {
      const tempTableData3 = tableData?.map((res: any) => {
        const item = {
          id: res.id,
          text: res.text,
          order: res.order,
          voteCount: 0,
          actions: actions,
        };
        return item;
      });
      const id = generateUniqueID();
      const newTempData: any = {
        id: id,
        text: optionData.option,
        order: tableData.length + 1,
        voteCount: 0,
        actions: actions,
      };
      tempTableData3.push(newTempData);
      setTableData(tempTableData3);
    }
    setOptionData({ option: "" });
    setUpdateTable(!updateTable);
  }

  useEffect(() => {
    const tempTableData4 = tableData?.map((res: any) => {
      const item = {
        id: res.id,
        text: res.text,
        order: res.order,
        voteCount: res.voteCount,
        actions: actions,
      };
      return item;
    });
    setTableData(tempTableData4);
  }, [updateTable]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="row align-items-center mt-3">
          <div className="col-10 col-sm-8 col-md-11 position-relative">
            <RdsInput
              name="Options"
              label={true}
              placeholder="Enter Option"
              inputType="text"
              id="passwordfield"
              onChange={(e: any) => {
                optionChange(e.target.value);
              }}
              value={optionData.option}
              dataTestId="option"
            />
            {error && (
              <div className="position-absolute form-control-feedback end-0 top-100 text-danger option-message">
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="col-2 col-sm-4 col-md-1 d-flex justify-content-center mt-2 pt-4">
            <RdsButton
              colorVariant="primary"
              icon="plus"
              isFabIcon={false}
              iconColorVariant="light"
              iconHeight={"12px"}
              iconWidth={"12px"}
              iconFill={false}
              iconStroke={true}
              onClick={handleAddItem}
              tooltipTitle={""}
              type="button"
              dataTestId="add"
            />
          </div>
        </div>
        <div className="mt-3">
          <RdsCompDatatable
            actionPosition={ActionPosition.Right}
            actions={actions}
            onActionSelection={onActionHandler}
            tableHeaders={tableHeaders}
            tableData={tableData}
            pagination={false}
            isSwap={true}
            illustration={false}
            swapRows={(data: any) => {
              getSwappedData(data);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RdsCompPollsOption;
