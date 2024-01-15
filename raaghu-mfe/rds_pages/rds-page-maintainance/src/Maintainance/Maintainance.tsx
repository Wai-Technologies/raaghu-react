import React, { useEffect, useRef, useState } from "react";
import {
    RdsCompWebsiteLog,
    RdsCompCache,
    RdsCompAlertPopup,
} from "../../../rds-components";
import "./Maintainance.css";
import {
    RdsButton,
    RdsFabMenu,
    RdsIcon,
    RdsNavtabs,
} from "../../../rds-elements";
import { useTranslation } from "react-i18next";

const cachedata = [
    { name: "AbpUserSettingsCache", id: 1 },
    { name: "AbpZeroRolePermissions", id: 2 },
    { name: "AbpZeroTenantCache", id: 3 },
    { name: "AbpZeroEditionFeatures", id: 4 },
];
const Maintainance = () => {
    const [tabcache, setTabcache] = useState(true);
    const [WebsiteLog, setWebsiteLog] = useState(false);
    const [activeNavTabId, setActiveNavTabId] = useState("nav-cache");
    const [cache, setcache] = useState(cachedata);
    const { t } = useTranslation();

    const listItems1 = [
        {
            value: "Clear All",
            some: "value",
            key: "clearall",
            icon: "delete",
            iconWidth: "20px",
            iconHeight: "20px",
        },
    ];

    const listItems2 = [
        {
            value: "Refresh",
            some: "value",
            key: "refresh",
            icon: "refresh",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            value: "Download All",
            some: "value",
            key: "downloadall",
            icon: "download_data",
            iconWidth: "20px",
            iconHeight: "20px",
        },
    ];

    const navtabsItems = [
        {
            label: t("Cache"),
            id: "nav-cache",
            tablink: "#nav-cache",
            ariacontrols: "nav-cache",
        },
        {
            label: t("WebsiteLog"),
            id: "nav-websiteLogs",
            tablink: "#nav-websiteLogs",
            ariacontrols: "nav-websiteLogs",
        },
    ];

    const websiteLogData = [
        {
            status: "INFO",
            content:
                "2021-12-28 15:43:39,431 [1 ] oft.EntityFrameworkCore.Model.Validation - Entity &#39;Edition&#39; has a global query filter defined and is the required end of a relationship with the entity &#39;EditionFeatureSetting&#39;. This may lead to unexpected results when the required entity is filtered out. Either configure the navigation as optional, or define matching query filters for both entities in the navigation. See https://go.microsoft.com/fwlink/?linkid=2131316 for more information.",
        },
        {
            status: "WARN",
            content:
                "2021-12-28 15:43:39,624 [1 ] oft.EntityFrameworkCore.Model.Validation - No type was specified for the decimal property &#39;DailyPrice&#39; on entity type &#39;SubscribableEdition&#39;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
        },
        {
            status: "INFO",
            content:
                "2021-12-28 15:43:39,431 [1 ] oft.EntityFrameworkCore.Model.Validation - Entity &#39;Edition&#39; has a global query filter defined and is the required end of a relationship with the entity &#39;EditionFeatureSetting&#39;. This may lead to unexpected results when the required entity is filtered out. Either configure the navigation as optional, or define matching query filters for both entities in the navigation. See https://go.microsoft.com/fwlink/?linkid=2131316 for more information.",
        },
        {
            status: "ERROR",
            content:
                "2021-12-28 15:43:39,624 [1 ] oft.EntityFrameworkCore.Model.Validation - No type was specified for the decimal property &#39;DailyPrice&#39; on entity type &#39;SubscribableEdition&#39;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
        },
        {
            status: "WARN",
            content:
                "2021-12-28 15:43:39,431 [1 ] oft.EntityFrameworkCore.Model.Validation - Entity &#39;Edition&#39; has a global query filter defined and is the required end of a relationship with the entity &#39;EditionFeatureSetting&#39;. This may lead to unexpected results when the required entity is filtered out. Either configure the navigation as optional, or define matching query filters for both entities in the navigation. See https://go.microsoft.com/fwlink/?linkid=2131316 for more information.",
        },
        {
            status: "INFO",
            content:
                "2021-12-28 15:43:39,624 [1 ] oft.EntityFrameworkCore.Model.Validation - No type was specified for the decimal property &#39;DailyPrice&#39; on entity type &#39;SubscribableEdition&#39;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
        },
        {
            status: "ERROR",
            content:
                "2022-06-20 20:56:34,313 [4 ] Microsoft.AspNetCore.Hosting.Diagnostics - Request starting HTTP/2 GET https://localhost:44301/AbpUserConfiguration/GetAll?d=1655738793955 application/json -;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
        },
    ];

    const onchangetabs = (activeNavTabId: any) => {
        setActiveNavTabId(activeNavTabId);
        setWebsiteLog(false);
        if (activeNavTabId == "nav-cache") {
            setTabcache(true);
            setWebsiteLog(false);
        } else {
            setTabcache(false);
            setWebsiteLog(true);
        }
    };
    const Delete = () => { };
    const refreshData = () => { };

    const DeleteAllCacheData = () => {
        setcache([]);
    };

    const downloadcsv = () => {
        const keys = Object.keys(websiteLogData[0]);
        const csvString = websiteLogData
            .map((row: any) => keys.map((key) => row[key]).join(","))
            .join("\n");

        // Create a hidden link element
        const link = document.createElement("a");
        link.style.display = "none";
        link.setAttribute(
            "href",
            "data:text/csv;charset=utf-8," + encodeURIComponent(csvString)
        );
        link.setAttribute("download", "operation_logs.csv");

        // Append the link to the DOM
        document.body.appendChild(link);

        // Click the link to initiate the download
        link.click();

        // Remove the link from the DOM
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <div className="row">
                            <div className="col-md-12 text-end pb-3">
                                {tabcache && (
                                    <div className="d-flex justify-content-end">
                                        <div className="desktop-btn">
                                            <RdsButton
                                                type={"button"}
                                                colorVariant="primary"
                                                size="small"
                                                tooltipPlacement="top"
                                                label={t("Clear All") || ""}
                                                icon="delete"
                                                iconColorVariant="light"
                                                iconHeight="12px"
                                                iconWidth="12px"
                                                iconFill={false}
                                                iconStroke={true}
                                                databstarget="#maintainance"
                                                databstoggle="modal"
                                            ></RdsButton>
                                            <RdsCompAlertPopup
                                                alertID="maintainance"
                                                onSuccess={DeleteAllCacheData}
                                            ></RdsCompAlertPopup>
                                        </div>
                                        <div
                                            className="mobile-btn position-fixed bottom-0 end-0 mb-3 me-5 custom-z-index">
                                            <RdsFabMenu
                                                listItems={listItems1}
                                                colorVariant="primary"
                                                menuIcon="plus"
                                                menuiconWidth="12px"
                                                menuiconHeight="12px"
                                            ></RdsFabMenu>
                                        </div>
                                    </div>
                                )}

                                {WebsiteLog && (
                                    <div className="d-flex justify-content-end">
                                        <div className="desktop-btn">
                                            <RdsButton
                                                type={"button"}
                                                size="small"
                                                colorVariant="primary"
                                                roundedButton={true}
                                                icon="refresh"
                                                class="me-2"
                                                iconHeight="15px"
                                                iconWidth="15px"
                                                iconFill={false}
                                                iconStroke={true}
                                                iconColorVariant="light"
                                                onClick={refreshData}
                                            ></RdsButton>
                                            <RdsButton
                                                type={"button"}
                                                label={t("Download All") || ""}
                                                onClick={downloadcsv}
                                                isOutline={true}
                                                colorVariant="primary"
                                                tooltipPlacement="top"
                                                size="small"
                                                icon="download"
                                                iconHeight="12px"
                                                iconWidth="12px"
                                                iconFill={false}
                                                iconStroke={true}
                                                iconColorVariant="primary"
                                            ></RdsButton>
                                        </div>
                                        <div
                                            className="mobile-btn position-fixed bottom-0 end-0 mb-3 me-5 custom-z-index">
                                            <RdsFabMenu
                                                listItems={listItems2}
                                                menuIcon="plus"
                                                colorVariant="primary"
                                                menuiconHeight="12px"
                                                menuiconWidth="12px"
                                            ></RdsFabMenu>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <RdsNavtabs
                            navtabsItems={navtabsItems}
                            type={"tabs"}
                            fill={false}
                            justified={false}
                            activeNavTabId={activeNavTabId}
                            activeNavtabOrder={onchangetabs}
                        ></RdsNavtabs>
                        <div className="tab-content py-4" id="headerbar">
                            {activeNavTabId == "nav-cache" && (
                                <div
                                    className=" fade active show"
                                    id="nav-cache"
                                    role="tabpanel"
                                    aria-labelledby="nav-cache"
                                >
                                    <RdsCompCache
                                        cachedata={cache}
                                        recordsperpage={5}
                                        pagination={true}
                                        onclick={Delete}
                                        alignment={"end"}
                                    ></RdsCompCache>
                                </div>
                            )}
                            {activeNavTabId == "nav-websiteLogs" && (
                                <RdsCompWebsiteLog
                                    websiteLogData={websiteLogData}
                                    pagination={true}
                                    alignmentType="end"
                                    recordsPerPage={5}
                                    totalRecords={10}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintainance;
