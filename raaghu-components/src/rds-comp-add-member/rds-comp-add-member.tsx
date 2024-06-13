import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsOffcanvas } from "../rds-elements";

export interface RdsCompAddMemberProps {
  addMemberData?: any;
  assignableRolesList?: any;
  reset?: boolean;
  onAddMemberSaveHandler?: (data: any) => void;
  onClickAddNewMember?: () => void;
}

const RdsCompAddMember = (props: RdsCompAddMemberProps) => {
  const [addMemberData, setAddMemberData] = useState(props.addMemberData || { email: "", roleId: "" });
  const [inputReset, setInputReset] = useState(false);
  const [assignableRolesList, setAssignableRolesList] = useState(props.assignableRolesList || []);

  useEffect(() => {
    setAddMemberData(props.addMemberData || { email: "", roleId: "" });
    console.log("addMemberData updated:", addMemberData);
  }, [props.addMemberData]);

  useEffect(() => {
    setInputReset(prevReset => !prevReset);
  }, [props.reset]);

  useEffect(() => {
    if (props.assignableRolesList) {
      setAssignableRolesList(props.assignableRolesList);
    }
  }, [props.assignableRolesList]);


  const checkboxHandler = (id: number, label: string) => {
    setAssignableRolesList((prevAssignableRolesList: any) => {
      return prevAssignableRolesList.map((assignableRoles: any) => {
        if (assignableRoles.id === id) {
          return { ...assignableRoles, isDefault: true };
        } else {
          return { ...assignableRoles, isDefault: false };
        }
      });
    });
    setAddMemberData((prevAddMemberData: any) => {
      return { ...prevAddMemberData, [label]: id };
    });
  };

  const handleAddMemberDataChanges = (value: any, key: string) => {
    setAddMemberData({ ...addMemberData, [key]: value });
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onAddMemberSaveHandler && props.onAddMemberSaveHandler(addMemberData);
    setAddMemberData({ email: "", roleId: "" });
    setAssignableRolesList((prevAssignableRolesList: any) =>
      prevAssignableRolesList.map((assignableRoles: any) => ({ ...assignableRoles, isDefault: false }))
    );
    setInputReset(!inputReset);
  }

  const onClickCancel = () => {
    setInputReset(!inputReset);
    setAddMemberData({ email: "", roleId: "" });
    setAssignableRolesList(assignableRolesList.map((assignableRoles: any) => ({ ...assignableRoles, isDefault: false })));
  }


  return (
    <div className="pt-md-0 pt-2">
      <RdsOffcanvas
        backDrop="static"
        canvasTitle="ADD NEW MEMBER"
        offId="manage-member-add-off"
        offcanvasbutton={(
            <RdsButton
              icon="plus"
              label="NEW MEMBER"
              iconColorVariant="primary"
              iconHeight="12px"
              iconWidth="12px"
              iconFill={false}
              iconStroke={true}
              block={false}
              size="medium"
              type="button"
              colorVariant="outline-primary"
              // colorVariant={props.isDisableButton ? `outline-primary disabled` : 'outline-primary'}
              showLoadingSpinner={true}
              onClick={props.onClickAddNewMember}
            ></RdsButton>
          )
        }
        offcanvaswidth={544}
        placement="end"
        scrolling={false}
      >
        <div>
          <div className="offcanvas-intive-banner bg-danger bg-gradient bg-opacity-10">
            <div className="d-flex align-items-center gap-3 py-3 px-4">
              <div>
                <img src="assets/offcanvas-invite.svg" alt="offcanvas-invite" width="25px" />
              </div>
              <div>
                <p className="fw-medium mb-0 smaller text-start">
                  Invite a new member by entering their email id and role in fields below. Member will then have access to project files and source code.
                </p>
              </div>
            </div>
          </div>
          <form className="text-start pt-4">
            <div className="mb-2">
              <RdsInput
                id=""
                reset={inputReset}
                inputType="email"
                label="Email"
                labelPosition="top"
                placeholder="Enter Email"
                required
                size="medium"
                value={addMemberData?.email}
                onChange={(e: any) => {
                  handleAddMemberDataChanges(e.target.value, "email");
                }}
                validatonPattern={
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                }
                validationMsg="Please Enter Valid Email Address."
              />
            </div>
            <div>
              <RdsLabel fontWeight="normal" label="Select Role" required />
              <div className="d-flex gap-3 pt-1">
                {assignableRolesList.map((assignRoles: any, index: any) => (
                  <RdsCheckbox
                    key={index}
                    id={`checkbox-${assignRoles.id}`}
                    label={assignRoles.name}
                    onChange={() => checkboxHandler(assignRoles.id, "roleId")}
                    checked={assignRoles.isDefault}
                    withlabel
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse mt-5 flex-xl-row flex-xxl-row d-flex gap-2">
          <RdsButton
            class="me-2"
            tooltipTitle={""}
            type={"button"}
            label="CANCEL"
            colorVariant="outline-primary"
            size="small"
            databsdismiss="offcanvas"
            onClick={onClickCancel}
          ></RdsButton>
          <RdsButton
            class="me-2"
            label="SAVE"
            showLoadingSpinner={true}
            size="small"
            colorVariant="primary"
            tooltipTitle={""}
            onClick={(e: any) => emitSaveData(e)}
            type={"submit"}
            isDisabled={!addMemberData.email || !addMemberData.roleId}
            databsdismiss="offcanvas"
          ></RdsButton>
        </div>
      </RdsOffcanvas>
    </div>
  );
};

export default RdsCompAddMember;