import React, { useState, useRef } from "react";
import RdsFabMenu from "../rds-fab-menu";
import RdsBadge from "../rds-badge/rds-badge";
import RdsModal from "../rds-modal/rds-modal";
import "./rds-attachement.css";
import RdsInput from "../rds-input/rds-input";

const RdsAttachement = () => {
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
    }
  };

  const openModal = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent FAB from closing prematurely
    setShowModal(true);

    if(showModal) {
    // ✅ Manually close the FAB menu after opening the modal
    const fabMenu = document.querySelector(".fab-dropdown");
    if (fabMenu && fabMenu.classList.contains("show")) {
      fabMenu.classList.remove("show");
    }
  }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileChange}
      />

      <span className="mb-3 mt-2">
        <RdsFabMenu
          menuIcon="attachment_icon"
          id="attachment-text"
          className="dropdown-menu dropdown-menu-list fab-dropdown shadow mb-1 border border-primary"
          isShowBorder={true}
          listItems={[
            {
              key: "new",
              value: (
                <button
                  onClick={openModal}  // Open modal and close FAB
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: 0,
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#modal1234"
                >
                  <span className="me-2">Upload From Figma</span>
                  <RdsBadge
                    colorVariant="success"
                    iconName="notification"
                    isIconshow
                    label="Premium"
                    layout="Text_only"
                    shape="rectangle"
                    size="small"
                    state="default"
                    style="primary"
                  />
                </button>
              ),
            },
            {
              key: "refresh",
              value: (
                <button
                  onClick={handleFileUpload}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: 0,
                  }}
                >
                  Import From This Device
                </button>
              ),
            },
          ]}
        />
      </span>

      {/* Modal Component */}
      {showModal && (
        <RdsModal
          cancelButtonName="Cancel"
          modalAnimation="modal-fade"
          modalId="modal1234"
          modalTitle="Import From Figma"
          modalbutton={null}
          saveChangesName="Next"
          showModalFooter
          showModalHeader
          size="medium"
        >
          <p className="text-muted import-size">
            Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.
          </p>
          <RdsInput
            HintText="Hint Text"
            fontWeight="normal"
            id="default-input"
            placeholder="Enter URL"
            inputType="text"
            label
            name="Enter Figma URL"
            state="default"
            style="Default"
            value=""
          />
        </RdsModal>
      )}
    </>
  );
};

export default RdsAttachement;
