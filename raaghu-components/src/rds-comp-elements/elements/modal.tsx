import React from "react";
import { RdsModal } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsModal
            modalId="modal1234"
            modalAnimation="modal fade"
            showModalFooter={true}
            showModalHeader={true}
            scrollable={false}
            verticallyCentered={false}
            modalTitle="Title"
            saveChangesName="Save Changes"
            cancelButtonName="Close"
            modalbutton={<button className="btn btn-primary">Default</button>}
        >
            <p>
        This is some placeholder content to show the scrolling behavior for
        modals. Instead of repeating the text the modal, we use an inline style
        set a minimum height, thereby extending the length of the overall modal
        and demonstrating the overflow scrolling. When content becomes longer
        than the height of the viewport, scrolling will move the modal as
        needed.
            </p>
        </RdsModal>
    );
};

export default code_actual;
