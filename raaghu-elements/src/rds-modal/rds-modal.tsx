import React, { ReactNode, useEffect } from "react";
import RdsIcon from "../rds-icon";
import "./rds-modal.css";

export interface RdsModalProps {
    modalId: string;
    modalBackdrop?: boolean | "static";
    preventEscapeKey?: boolean;
    size?: string;
    modalAnimation?: string;
    showModalFooter?: boolean;
    showModalHeader?: boolean;
    modalData?: any;
    scrollable?: boolean;
    verticallyCentered?: boolean;
    modalbutton?: any;
    children: any;
    modalTitle?: string;
    saveChangesName?: string;
    cancelButtonName?: string;

    // onShow = new EventEmitter<Event>();
    // onClose = new EventEmitter<Event>();
}

const RdsModal = (props: RdsModalProps) => {
    const preventEscapeKey = `${props.hasOwnProperty("preventEscapeKey") ? props.preventEscapeKey : true
        }`;
    const Backdrop = `${props.hasOwnProperty("modalBackdrop") ? props.modalBackdrop : true
        }`;

    const getModalClasses = () => {
        let styleClasses: string = 'modal-dialog';
        if (props.scrollable) {
            styleClasses = styleClasses + ' modal-dialog-scrollable';
        }
        if (props.verticallyCentered) {
            styleClasses = styleClasses + ' modal-dialog-centered';
        }
        if (props.size === 'small') {
            styleClasses = styleClasses + ' modal-sm';
        }
        if (props.size === 'large') {
            styleClasses = styleClasses + ' modal-lg';
        }
        if (props.size === 'extra-large') {
            styleClasses = styleClasses + ' modal-xl';
        }
        if (props.size === 'fullscreen') {
            styleClasses = styleClasses + ' modal-fullscreen';
        }
        return styleClasses;
    }

    const getAnimations = () => {
        let animationClass: string = 'modal fade';
        if (props.modalAnimation === 'modal-fade') {
            animationClass = animationClass + ' fade';
        }
        if (props.modalAnimation === 'modal-fade-scale') {
            animationClass = animationClass + ' fade-scale';
        }
        if (props.modalAnimation === 'modal-fade-rotate') {
            animationClass = animationClass + ' fade-rotate';
        }
        if (props.modalAnimation === 'modal-fade-flip') {
            animationClass = animationClass + ' fade-flip';
        }

        return animationClass;
    }

    const OffCanvasBtn = document.querySelectorAll("[data-bs-toggle=\"modal\"]");
    OffCanvasBtn.forEach((element) => {
        element.addEventListener("click", () => {
            const allBackdrops = document.querySelectorAll(".modal-backdrop");
            if (allBackdrops.length > 1) {
                for (let i = 0; i < allBackdrops.length - 1; i++) {
                    allBackdrops[i].remove();
                }
            }
        });
    });

    useEffect(() => {
        const handleModalOpen = (event: Event) => {
            // Close all currently open modals except the current one
            const openModals = document.querySelectorAll(".modal.show");
            openModals.forEach((modal) => {
                if (modal.id !== props.modalId) {
                    (modal as HTMLElement).classList.remove("show");
                    (modal as HTMLElement).setAttribute("aria-hidden", "true");
                    (modal as HTMLElement).setAttribute("style", "display: none;");
                }
            });
    
            // Remove any existing backdrops except for the current modal
            const backdrops = document.querySelectorAll(".modal-backdrop");
            if (props.modalId === "secondModalId") { // Replace "secondModalId" with the actual ID of the second modal
                backdrops.forEach((backdrop) => backdrop.remove());
            }
        };
    
        // Attach the event listener to the modal trigger
        const modalTrigger = document.querySelector(`[data-bs-target="#${props.modalId}"]`);
        if (modalTrigger) {
            modalTrigger.addEventListener("click", handleModalOpen);
        }
    
        // Cleanup the event listener and remove backdrops on unmount
        return () => {
            if (modalTrigger) {
                modalTrigger.removeEventListener("click", handleModalOpen);
            }
    
            // Remove any existing backdrops when the component unmounts
            const backdrops = document.querySelectorAll(".modal-backdrop");
            backdrops.forEach((backdrop) => backdrop.remove());
        };
    }, [props.modalId]);

    return (
        <>
            {/* Button trigger modal */}
            {props.modalbutton && (
                <div className="cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target={`#${props.modalId}`}
                >
                    {props.modalbutton}
                </div>
            )}

            {/*  Modal  */}

            <div
                className={getAnimations()}
                id={props.modalId}
                data-bs-backdrop={Backdrop}
                data-bs-keyboard={preventEscapeKey}
                tabIndex={-1}
                aria-labelledby={`#${props.modalId}Label`}
                aria-hidden="true"
            >
                <div className={getModalClasses()}>
                    <div className="modal-content">
                        {props.showModalHeader && (
                            <div className="modal-header">
                                <h5 className="modal-title">{props.modalTitle}</h5>
                                <button
                                    key="modalHeader"
                                    type="button"
                                    className="btn-close btn-danger"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                        )}

                        <div className="modal-body"> {props.children}</div>
                        {props.showModalFooter && (
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    data-bs-dismiss="modal"
                                >
                                    {props.cancelButtonName}
                                </button>
                                <button type="button" className="btn btn-primary ms-2">
                                    {props.saveChangesName}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsModal;
