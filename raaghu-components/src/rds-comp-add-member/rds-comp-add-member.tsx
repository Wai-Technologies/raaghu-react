import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsOffcanvas } from "../rds-elements";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
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
  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return false;
    } else return true;
};

const isRoleIdValid = (roleId: any) => {
  console.log("roleId",roleId);
    if (!roleId || roleId.length === 0 || roleId === "0") {
      return false;
    }
    return true;
};
  const isFormValid=isEmailValid(addMemberData?.email) && isRoleIdValid(addMemberData.roleId);

  return (
    <div className="pt-md-0 pt-2 addMemberOffCancvas">
      <RdsOffcanvas
        backDrop={RdsOffcanvasBackDrop.Static}
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
        placement={RdsOffcanvasPlacement.End}
        scrolling={false}
      >
        <div className="offcanvas-content d-flex flex-column h-100">
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
          <form className="text-start pt-4 flex-grow-1">
            <div className="mb-2">
              <RdsInput
                id=""
                reset={inputReset}
                inputType="email"               
                name="Email"           
                label={true}
                labelPosition={LabelPosition.Top}
                placeholder="Enter Email"
                required
                size={InputSize.Medium}   
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
                    labelText={assignRoles.name}
                    onChange={() => {
                      if (assignRoles.isDefault) {
                        setAddMemberData((prevAddMemberData: any) => ({
                          ...prevAddMemberData,
                          roleId: "0"
                        }));
                      } else {
                        checkboxHandler(assignRoles.id, "roleId");
                      }
                    }}
                    checked={assignRoles.isDefault}
                    showText
                  />
                ))}
              </div>
            </div>
          </form>
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
              isDisabled={!isFormValid}
              databsdismiss="offcanvas"
            ></RdsButton>
          </div>
        </div>
      </RdsOffcanvas>
    </div>
  );
};

export default RdsCompAddMember;