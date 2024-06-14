import React, { useEffect, useState } from "react";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import RdsBadge from "../rds-badge";
import RdsOffcanvas from "../rds-offcanvas";
import RdsCounter from "../rds-counter";
import RdsRadioButton from "../rds-radio-button";

export interface RdsSelectPlanProps {
  popularPlanShow?: boolean;
  cardInfo?: any[];
  isOffcanvas?: any;
  paymentTenureList?: any;
  extendLicenseData?: any;
  paymentTenure?: any;
  summaryDetailsList?: any;
  sendTenureId?: (id: number, tenureCount: any) => void;
  sendUpgradeTenureId?: (id: number, tenureCount: number) => void;
  currentTenureId?: any;
  developerCount?: any;
  developerUpgradeCount?: any;
  handleButtonClick(name: any, label: any): any;
  handleOffcanvasHandle(label: any, name: any, id: any, planId: any): any;
  onExtendCancel?: () => void;
  onChangeCountervalue?: (newCount: number) => void;
  onExtendSave?: () => void;
  onUpgradeSave?: () => void;
  onUpgradeCancel?: () => void;
  onChangeCounterUgradeValue?: (newCount: number) => void;
  resetCounter?: boolean;
}

const RdsSelectPlan = (props: RdsSelectPlanProps) => {

  const [developerCount, setDeveloperCount] = useState(props.developerCount);
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [activeExtendDiv, setActiveExtendDiv] = useState<number | null>(null);


  const [resetCounter, setResetCounter] = useState(false);

  useEffect(() => {
    setResetCounter(prevReset => !prevReset);
  }, [props.resetCounter]);

  const handleDivClick = (id: any, tenureCount: any) => {
    setActiveExtendDiv(id);
    if (props.sendTenureId) {
      props.sendTenureId(id, tenureCount);
    }
  };

  const handleUpgradeClick = (id: number, tenureCount: number) => {
    setActiveDiv(id);
    if (props.sendUpgradeTenureId) {
      props.sendUpgradeTenureId(id, tenureCount);
    }
  };

  const onUpgradeCancel = () => {
    setActiveDiv(null);
    setResetCounter(!resetCounter);
    props.onUpgradeCancel && props.onUpgradeCancel();
  };

  const onExtendCancel = () => {
    setActiveExtendDiv(props.extendLicenseData?.currentTenureId);
    setDeveloperCount(props.developerCount);
    props.onExtendCancel && props.onExtendCancel();
  };


  return (<>

    <div>
      <ul className="list-unstyled d-xxl-flex d-xl-flex grid-template-columns-auto d-md-grid justify-content-between gap-3">
        {props.cardInfo && props.cardInfo.map((data, index) => {
          const isPrimaryButton = index === 1;
          return (
            <li key={index} className="position-relative mt-xl-4 mt-0 mb-xl-0 mb-3 pt-2">
              {data.popularPlanShow === true && data.currentPlanShow !== true ? (
                <div className={`${data.popularPlanShow ? 'CTA' : ''} position-absolute py-2 rounded-bottom-0 top-0 w-100`}>
                  <div className="text-center">

                    {data.mostPopularPlan && (
                      <p className="mb-0 text-white"> {data.mostPopularPlan}</p>
                    )}

                    {data.currentPlanOnExtend && (
                      <p className="mb-0 text-white">{data.currentPlanOnExtend}</p>
                    )}
                  </div>
                </div>
              ) : (
                " "
              )}
              {data.currentPlanShow === true && data.popularPlanShow !== true ? (
                <div className="default-CTA position-absolute py-2 rounded-bottom-0 top-0 w-100">
                  <div className="text-center">
                    <p className="mb-0 ">{data.currentPlan}</p>
                  </div>
                </div>
              ) : (
                " "
              )}
              {data.isSubscription ?
                <div className={`card card-body mt-4 ${data.popularPlanShow ? 'border-primary-cust rounded-top-0 border-top-0' : ' '} ${data.currentPlanShow ? ' rounded-top-0 border-top-0' : ''} ${data.isPrimaryOutline ? ' border-primary-cust' : ''}  border-2`}>
                  <div className="row mb-2 align-items-center">
                    <div className="col-md-9 col-9">
                      <h5 className="fw-semibold mb-1 fs-3">{data.name} </h5>
                      <small className="text-secondary-para">{data.PlanSubtitle} </small>
                    </div>
                    <div className="col-md-3 col-3">
                      <img src={data.planImg} className="img-fluid" />
                    </div>
                  </div>

                  <div className="d-flex mt-1">
                    <h2 className="text-danger-50"> <sub className="sub">{data.displayName === "Design System" ? "" : "$"}</sub> <span className="fw-bold fs-1"> {data.displayName === "Design System" ? "Free" : data.price} </span></h2>

                  </div>
                  <div>
                    <hr />
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow w-10 ms-2">
                        <span className="text-danger-50">{data.includedDeveloperCount}</span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.developerLicense}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.licenseInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow w-10 ms-2">
                        <span className="text-danger-50 d-flex">{data.displayName === "Design System" ? "NA" : "$"} <span>{data.additionalDeveloperRate}</span></span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.additionalDevLicense}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.devlicenseInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow w-10 ms-2">
                        <span className="text-danger-50 small">
                          <img src={data.projectCountImg} alt="project-count" />
                        </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center gap-2">
                        <p className="mb-0 fs-7">
                          {data.projectCount}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.projectCountInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}
                        </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center gap-2">
                        <p className="mb-0 fs-7 d-flex justify-content-between align-items-center">
                          <span className="pe-2">{data.designKit}</span>
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.designInfo}
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                      </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="align-items-center gap-2">
                        <p className="mb-0 fs-7 d-flex justify-content-between align-items-center">
                          <span className="pe-2">{data.iconLibrary}</span>
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.libraryInfo}
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                      </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7 ">
                          {data.projectTemp}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.projectTempInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          <img src={data.rightCheckImg} className="w-75" alt="check right" />
                        </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.storybook}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.storybookInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                      </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="align-items-center gap-2">
                        <p className="mb-0 fs-7 d-flex justify-content-between align-items-center">
                          <span className="pe-2">{data.builtinThemes}</span>
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.themesInfo}
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          <img src={data.rightCheckImg} className="w-75" alt="check right" />
                        </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.cliGenerator}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.cliInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          <img src={data.rightCheckImg} className="w-75" alt="check right" />
                        </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.completeSourceCode}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.sourceInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                       </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.upgrade}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.upgradeInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                       </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.PerpetualLicense}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.prepetualInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                       </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.forumSupport}
                        </p>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.forumSupportInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle">
                        <span className="text-danger-50 small text-center">
                          {data.displayName === "Design System" ? <img src={data.closeImg} className="w-75" alt="check close" />
                            : <img src={data.rightCheckImg} className="w-75" alt="check right" />}                       </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.codeExtension}
                        </p>
                        <div>
                          <RdsBadge
                            badgeType="pill"
                            colorVariant="danger"
                            label="Coming soon"
                            size="smallest"
                            className="custom-badge text-white "
                          />
                        </div>
                        <div className="info">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.codeExtensionInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow w-10 ms-2">
                        <span className="text-danger-50 ">{data.forumSupportCount}</span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="align-items-center gap-2">
                        <p className="mb-0 fs-7 d-flex justify-content-between align-items-center">
                          <span className="pe-2">{data.forumSupportIncidentCount}</span>
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.incedentCountInfo}
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 pb-1 align-items-center">
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-2 pe-md-0">
                      <div className="custom-shadow rounded-circle check-circle close-circle">
                        <span className="text-danger-50 small text-center">

                          {data.displayName === "Enterprise" ? <img src={data.rightCheckImg} className="w-75" alt="check close" />
                            : <img src={data.closeImg} className="w-75" alt="check right" />}
                        </span>
                      </div>
                    </div>
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-10 ps-2">
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <p className="mb-0 fs-7">
                          {data.privateTicketInclude}
                        </p>
                        <div className="info info-flex3">
                          <RdsIcon
                            colorVariant="secondary"
                            height="14px"
                            isAnimate
                            name="information"
                            stroke
                            tooltip
                            width="14px"
                            tooltipPlacement="bottom"
                            tooltipTitle={data.tooltipsInfo.emailSupportInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <hr />
                  </div>
                  {!data.isOffcanvas && (
                    <div className="text-center">
                      <RdsButton
                        block
                        // colorVariant={tenantId === null ? "primary" : isPrimaryButton ? "primary" : "secondary"}
                        colorVariant={data.buttonColorVariant}
                        label={data.buttonName}
                        isDisabled={data.isDisabled}
                        size="medium"
                        onClick={() => {
                          props.handleButtonClick(data.name, data.buttonName)
                        }}
                      />
                    </div>
                  )}
                  {data.isOffcanvas && (
                    <RdsOffcanvas
                      canvasTitle={data.isExtendOffcanvasUI ? "Extend License" : "Upgrade License"}
                      placement="end"
                      offcanvaswidth={544}
                      offcanvasbutton={
                        <RdsButton
                          icon=""
                          iconColorVariant="light"
                          size="medium"
                          type="button"
                          block={true}
                          iconHeight="15px"
                          iconWidth="15px"
                          iconFill={false}
                          iconStroke={true}
                          showLoadingSpinner={true}
                          colorVariant={data.buttonColorVariant}
                          label={data.buttonName}
                          onClick={() => {
                            // Call handleOffcanvasHandle with data and update developerCount
                            props.handleOffcanvasHandle(data.buttonName, data.name, data.id, data.planId);
                            // Update developerCount
                            setDeveloperCount(props.developerCount);
                            setActiveExtendDiv(props.extendLicenseData?.currentTenureId);
                          }}
                        />
                      }
                      backDrop={true}
                      scrolling={false}
                      preventEscapeKey={false}
                      offId={data?.offId}
                    >
                      {data.isExtendOffcanvasUI && (
                        <div>
                          <div>
                            <div className="offcanvas-intive-banner">
                              <div className="d-flex align-items-center gap-3 py-3 px-4">
                                <div><img src="assets/seatPurple.svg" alt="seatPurple" width="25px" /></div>
                                <div>
                                  <p className="fw-medium mb-0 smaller text-start">Extending your license grants continued premium support, updates, and project opportunities.</p>
                                </div>
                              </div>
                            </div>


                            <form className="text-start pt-4">

                              <div>
                                <div className="pb-1">
                                  <h5 className="fs-5 fw-medium">Select License Tenure</h5>
                                </div>
                                <div className="d-md-flex d-grid grid-template-columns-auto gap-2">
                                  {props.extendLicenseData?.paymentLicenseTenures &&
                                    props.extendLicenseData?.paymentLicenseTenures.map(
                                      (data: any, key: any) => (
                                        <div
                                          className={`align-items-baseline custom-radio-border px-1 py-2 rounded-1 row cursor-pointer mb-3 mx-0 ${activeExtendDiv === data.id ? "active" : ""
                                            }`}
                                          onClick={() => handleDivClick(data.id, data.tenureCount)}
                                          key={key}
                                          id={`paymentTenureDiv-${data.id}`}
                                        >
                                          <div className="align-items-center d-flex gap-2 px-1">
                                            <div className="d-flex gap-1">
                                              <RdsRadioButton
                                                displayType="Default"
                                                customClass="mb-0"
                                                customLabelClass="ms-0 fs-7 fw-medium"
                                                itemList={[
                                                  {
                                                    checked: activeExtendDiv === data.id || (activeExtendDiv === null && key === props.extendLicenseData?.currentTenureId),
                                                    id: data.id,
                                                    label: data.licenseTenureName,
                                                    name: data.tenureCount
                                                  }
                                                ]}
                                                label={data.licenseTenureName} value={""}                                              />
                                              <div>
                                                <div className={`${data.discountPercentage > 0 ? "CTA d-flex px-2 py-1 rounded-1 text-white justify-content-between" : "CTA d-flex px-2 py-1 rounded-1 text-white justify-content-between invisible"}`}>
                                                  <div className="align-items-center d-flex gap-2">
                                                    <div>
                                                      <p className="mb-0 fs-8">
                                                        -{data.discountPercentage}%
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>

                              </div>

                              <div className="pb-1">
                                <h5 className="fs-5 fw-medium">Select Developer Seats</h5>
                              </div>
                              <div className="mb-2">
                                <RdsCounter
                                  colorVariant="outline-primary"
                                  counterValue={developerCount}
                                  label=""
                                  max={50}
                                  min={0}
                                  position="right"
                                  width={110}
                                  onCounterChange={(value: number) => {
                                    setDeveloperCount(value);
                                    if (props.onChangeCountervalue !== undefined) {
                                      props.onChangeCountervalue(value);
                                    }
                                  }}
                                />
                              </div>
                            </form>

                            <div className="text-start pt-4">
                              <h5 className="fs-5 fw-medium pb-2">Pricing Details</h5>
                              <div>
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">License Price: </p></div>
                                  <div>${props.extendLicenseData?.summary?.licensePrice}</div>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Additional Developers: <span className="fw-bold">{props.extendLicenseData?.summary?.additionalDevelopersCount}</span> <span className="smaller">X ${props.extendLicenseData?.summary?.additionalDevelopersPrice} (Per User)</span></p></div>
                                  <div>${props.extendLicenseData?.summary?.additionalDevelopersTotalPrice}</div>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Total Price:</p></div>
                                  <div>${props.extendLicenseData?.summary?.totalPrice}</div>
                                </div>
                                {/* <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Tax: {props.extendLicenseData?.summary?.taxPercentage}%</p></div>
                                  <div>${props.extendLicenseData?.summary?.taxPrice}</div>
                                </div> */}
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Discount: {props.extendLicenseData?.summary?.discountPercentage}%</p></div>
                                  <div>- ${props.extendLicenseData?.summary?.discountPrice}</div>
                                </div>
                                <div><hr /></div>
                                <div className="d-flex justify-content-between">
                                  <div><h5 className="mb-0 fw-semibold fs-5">Total Net Price</h5></div>
                                  <div><h5 className="fw-semibold mb-0 fs-5">${props.extendLicenseData?.summary?.totalNetPrice}</h5></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons d-flex gap-2">
                            <RdsButton
                              class="me-2"
                              tooltipTitle={""}
                              type={"button"}
                              label="CANCEL"
                              colorVariant="outline-primary"
                              size="small"
                              databsdismiss="offcanvas"
                              onClick={onExtendCancel}
                            ></RdsButton>
                            <RdsButton
                              class="me-2"
                              label="CONTINUE"
                              showLoadingSpinner={true}
                              size="small"
                              colorVariant="primary"
                              tooltipTitle={""}
                              type={"submit"}
                              databsdismiss="offcanvas"
                              onClick={props.onExtendSave}
                            ></RdsButton>
                          </div>
                        </div>
                      )}
                      {data.isUpgradeOffcanvasUI && (
                        <div>
                          <div>
                            <div className="offcanvas-intive-banner">
                              <div className="d-flex align-items-center gap-3 py-3 px-4">
                                <div><img src="assets/seatPurple.svg" alt="seatPurple" width="25px" /></div>
                                <div>
                                  <p className="fw-medium mb-0 smaller text-start">
                                    {data.isExtendOffcanvasUI && (
                                      <>
                                        Extending your license grants continued premium support, updates, and project opportunities.
                                      </>
                                    )}
                                    {data.isUpgradeOffcanvasUI && (
                                      <>
                                        Upgrade your license to Enterprise for access to additional premium features and benefits.
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>


                            <form className="text-start pt-4">

                              <div>
                                <div className="pb-1">
                                  <h5 className="fs-5 fw-medium">Select License Tenure</h5>
                                </div>
                                <div className="d-md-flex d-grid grid-template-columns-auto gap-2">
                                  {props.paymentTenure &&
                                    props.paymentTenure.map(
                                      (data: any, key: any) => (
                                        <div
                                          className={`align-items-baseline custom-radio-border px-1 py-2 rounded-1 row cursor-pointer mb-3 mx-0 ${activeDiv === data.id ? "active" : ""}`}
                                          onClick={() => handleUpgradeClick(data.id, data.tenureCount)}
                                          key={key}
                                          id={`paymentUpragdeTenureDiv-${data.id}`}
                                        >
                                          <div className="align-items-center d-flex gap-2 px-1">
                                            <div className="d-flex gap-1">
                                              <RdsRadioButton
                                                displayType="Default"
                                                customClass="mb-0"
                                                customLabelClass="ms-0 fs-7 fw-medium"
                                                itemList={[
                                                  {
                                                    checked: activeDiv === data.id || (activeDiv === null && key === 0),
                                                    id: data.id,
                                                    label: data.licenseTenureName,
                                                    name: data.tenureCount
                                                  }
                                                ]}
                                                label={data.licenseTenureName} value={""}                                              />
                                              <div>
                                                <div className={`${data.discountPercentage > 0 ? "CTA d-flex px-2 py-1 rounded-1 text-white justify-content-between" : "CTA d-flex px-2 py-1 rounded-1 text-white justify-content-between invisible"}`}>
                                                  <div className="align-items-center d-flex gap-2">
                                                    <div>
                                                      <p className="mb-0 fs-8">
                                                        -{data.discountPercentage}%
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>

                              </div>

                              <div className="pb-1">
                                <h5 className="fs-5 fw-medium">Select Developer Seats</h5>
                              </div>
                              <div className="mb-2">
                                <RdsCounter
                                  colorVariant="outline-primary"
                                  counterValue={props.developerUpgradeCount}
                                  label=""
                                  max={50}
                                  min={0}
                                  position="right"
                                  width={110}
                                  onCounterChange={props.onChangeCounterUgradeValue}
                                />
                              </div>
                            </form>

                            <div className="text-start pt-4">
                              <h5 className="fs-5 fw-medium pb-2">Pricing Details</h5>
                              <div>
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">License Price: </p></div>
                                  <div>${props.summaryDetailsList.licensePrice}</div>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Additional Developers: <span className="fw-bold">{props.summaryDetailsList.additionalDevelopersCount}</span> <span className="smaller">X ${props.summaryDetailsList.additionalDevelopersPrice} (Per User)</span></p></div>
                                  <div>${props.summaryDetailsList.additionalDevelopersTotalPrice}</div>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Total Price:</p></div>
                                  <div>${props.summaryDetailsList.totalPrice}</div>
                                </div>
                                {/* <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Tax: {props.summaryDetailsList.taxPercentage}%</p></div>
                                  <div>${props.summaryDetailsList.taxPrice}</div>
                                </div> */}
                                <div className="d-flex justify-content-between pb-2">
                                  <div><p className="mb-0">Discount: {props.summaryDetailsList.discountPercentage}%</p></div>
                                  <div>- ${props.summaryDetailsList.discountPrice}</div>
                                </div>
                                <div><hr /></div>
                                <div className="d-flex justify-content-between">
                                  <div><h5 className="mb-0 fw-semibold fs-5">Total Net Price</h5></div>
                                  <div><h5 className="fw-semibold mb-0 fs-5">${props.summaryDetailsList.totalNetPrice}</h5></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons d-flex gap-2">
                            <RdsButton
                              class="me-2"
                              tooltipTitle={""}
                              type={"button"}
                              label="CANCEL"
                              colorVariant="outline-primary"
                              size="small"
                              databsdismiss="offcanvas"
                              onClick={onUpgradeCancel}
                            ></RdsButton>
                            <RdsButton
                              class="me-2"
                              label="CONTINUE"
                              showLoadingSpinner={true}
                              size="small"
                              colorVariant="primary"
                              tooltipTitle={""}
                              type={"submit"}
                              databsdismiss="offcanvas"
                              onClick={props.onUpgradeSave}
                            ></RdsButton>
                          </div>
                        </div>
                      )}
                    </RdsOffcanvas>
                  )}
                </div> : ""
              }

            </li>
          );
        })}

      </ul>
    </div >


  </>);
};

export default RdsSelectPlan;