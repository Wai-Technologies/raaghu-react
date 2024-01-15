import React, { useEffect, useState } from "react";
import {
    RdsAlert,
    RdsBadge,
    RdsButton,
    RdsCheckbox,
    RdsIcon,
    RdsInput,
    RdsLabel,
    RdsSelectList,
    RdsOffcanvas,
} from "../../../rds-elements";
import {
    RdsCompAlertPopup,
    RdsCompDatatable,
    RdsCompNewLanguage,
} from "../../../rds-components";

import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {

    deleteLanguagesRequest,
    getLanguagesCultureListRequest,
    putLanguagesSetAsDefaultRequest,
    getLanguagesRequest,
    postLanguagesRequest,
    putLanguagesRequest,
    getLanguagesFlagListRequest
} from "../../../../libs/state-management/public.api";
import { useTranslation } from "react-i18next";


const Language = () => {

    const { t } = useTranslation();

    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [Data, setData] = useState<any>([{}]);
    const [tableDataRowid, setTableDataRowId] = useState("");
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    const flagListName = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "The Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire, Sint Eustatius, and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "British Indian Ocean Territory",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Colombia",
        "Comoros",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cura�ao",
        "Cyprus",
        "Czechia",
        "C�te d'Ivoire (Ivory Coast)",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands (Malvinas)",
        "Faroe Islands",
        "Federated States of Micronesia",
        "Fiji",
        "Finland",
        "North Macedonia",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "The Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See (Vatican City State)",
        "Honduras",
        "Hong Kong",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Libya",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar (Burma)",
        "Namibia",
        "Nauru",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "North Korea",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn Islands",
        "Poland",
        "Puerto Rico",
        "Portugal",
        "Qatar",
        "Republic of the Congo",
        "Romania",
        "Russia",
        "Rwanda",
        "R�union",
        "Saint Barth�lemy",
        "Saint Helena",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "S�o Tom� and Pr�ncipe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "State of Palestine",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Eswatini",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "British Virgin Islands",
        "U.S. Virgin Islands",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ]

    const tableHeaders = [
        {
            displayName: t("LanguageManagement.DisplayName"),
            key: "displayNameWithDefaultBadge",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("LanguageManagement.CultureName"),
            key: "cultureName",
            datatype: "children",
            sortable: true,
        },
        {
            displayName: t("LanguageManagement.UiCultureName"),
            key: "uiCultureName",
            datatype: "children",
            sortable: true,
        },
        {
            displayName: t("LanguageManagement.IsEnabled"),
            key: "isEnabledIcon",
            datatype: "children",
            sortable: false,
        },
    ];

    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "language-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "language-delete-off" },
        { id: "setAsDefaultLanguage", displayName: t("LanguageManagement.SetAsDefaultLanguage") },
    ];

    const [dataEmit, setdataEmit] = useState<{
        isEnabled: boolean;
        cultureName: any;
        cultureUIName: any;
        displayName: any;
        id: any;
        flagIcon: any;
    }>({
        isEnabled: false,
        cultureName: "",
        cultureUIName: "",
        displayName: "",
        id: "",
        flagIcon: ""
    });

    const [selectedFlagIcon, setSelectedFlagIcon] = useState(dataEmit.flagIcon);

    const [formValid, setformValid] = useState(true);

    useEffect(() => {
        if (dataEmit.displayName && dataEmit.displayName.trim() !== "") {
            setformValid(false);
        } else {
            setformValid(true);
        }
    }, [dataEmit.displayName]);

    const [name, setname] = useState<
        {
            option: string;
            value: string;
        }[]
    >([{ option: "", value: "" }]);

    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });

    const data = useAppSelector((state) => state.persistedReducer.languages);
    const dispatch = useAppDispatch();

    const flagListCode = data.getLanguagesFlagList;

    const finalArray = flagListName.map((name, index) => ({
        option: name,
        value: flagListCode[index]
    }));

    useEffect(() => {
        dispatch(getLanguagesRequest({ skipCount: skipCount, maxResultCount: maxResultCount,filter: searchTerm }) as any);
    }, [dispatch, skipCount, maxResultCount,debouncedSearchTerm]);


    useEffect(() => {
        if (data.getLanguages?.items != null) {
            const tempData = data.getLanguages.items.map((item: any) => {
                return {
                    id: item.id,
                    displayName: item.displayName,
                    displayNameWithDefaultBadge: (
                        <>
                            {item.isDefaultLanguage ? (
                                <span className=" d-flex align-items-center ">
                                    <RdsLabel
                                        label={item.displayName}
                                        class="me-1"
                                    >
                                    </RdsLabel>
                                    <RdsBadge
                                        label={"Default"}
                                        size={"small"}
                                        badgeType={"rectangle"}
                                        colorVariant={"success"}
                                    ></RdsBadge>
                                </span>
                            ) : (
                                <>{item.displayName}</>
                            )}
                        </>
                    ),
                    cultureName: item.cultureName,
                    isEnabled: item.isEnabled,
                    flagIcon: item.flagIcon,
                    uiCultureName: item.uiCultureName,
                    isDefault: item.isDefaultLanguage,
                    isEnabledIcon: (
                        <>
                            <div className="align-items-center d-flex justify-content-center w-60px">
                                {item.isEnabled ? (
                                    <RdsIcon
                                        name="check"
                                        height="17px"
                                        width="15px"
                                        colorVariant="success"
                                        strokeWidth="3px"
                                    />
                                ) : (
                                    <RdsIcon
                                        name="cancel"
                                        height="17px"
                                        width="15px"
                                        colorVariant="danger"
                                        strokeWidth="3px"
                                    />
                                )}
                            </div>
                        </>
                    ),
                    creationTime: (
                        <>
                            {item.flagIcon ? (
                                <div className="align-items-center d-flex justify-content-center w-60px">
                                    <RdsIcon
                                        name={item.flagIcon}
                                        fill={false}
                                        stroke={true}
                                        height="20px"
                                        width="20px"
                                    ></RdsIcon>
                                </div>
                            ) : (
                                ""
                            )}
                        </>
                    )
                };
            });
            setData(tempData);
            setTotalRecords(data?.getLanguages?.totalCount);
        }
        if (data.getLanguagesCultureList[1]) {
            const tempName = data.getLanguagesCultureList.map((items: any) => {
                return {
                    option: items.displayName,
                    value: items.name,
                };
            });
            setname(tempName);
        }
    }, [data.getLanguagesCultureList, data.getLanguages]);

    const onSaveHandler = (data: {
        isEnabled: boolean;
        cultureName: string;
        uiCultureName: string;
        displayName: string;
        flagIcon: string;
    }) => {

        dispatch(postLanguagesRequest({ requestBody: data }) as any).then((res: any) => {
            if (res.type == "languages/postLanguagesRequest/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Culture name already exists."),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Language added Successfully"),
                    color: "success",
                });
            }
            dispatch(getLanguagesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };

    const onEditHandler = (dataEmit: any) => {
        const updatedDataEmit = {
            ...dataEmit,
            displayName: dataEmit.displayName,
            isEnabled: dataEmit.isEnabled,
            flagIcon: selectedFlagIcon,
            id: dataEmit.id,
        };
        setdataEmit(updatedDataEmit);
        dispatch(putLanguagesRequest({ id: tableDataRowid, requestBody: updatedDataEmit }) as any)
            .then((res: any) => {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Languages edited Succesfully"),
                    color: "success",
                });

                dispatch(getLanguagesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            })
            .catch((error: any) => {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Error while updating language"),
                    color: "danger",
                });
            });
    };

    const getCountryName = (flagIcon: any) => {
        const countryName = flagListName.find((item, index) => flagListCode[index] === flagIcon);
        return countryName || "";
    };

    const onActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        if (actionId === "edit") {
            setdataEmit({
                ...dataEmit,
                isEnabled: rowData.isEnabled,
                displayName: rowData.displayName,
                flagIcon: getCountryName(rowData.flagIcon),
                id: rowData.id,
            });
            setSelectedFlagIcon(rowData.flagIcon);
        }
        if (actionId == "setAsDefaultLanguage") {
            dispatch(putLanguagesSetAsDefaultRequest({ id: rowData.id }) as any).then((res: any) => {
                dispatch(getLanguagesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            });
            setAlert({
                ...Alert,
                show: true,
                message: t("Languages set as default Succesfully"),
                color: "success",
            });
        }
    };

    const onNewLangHandler = () => {
        dispatch(getLanguagesCultureListRequest() as any);
        dispatch(getLanguagesFlagListRequest() as any);
    };


    const onDeleteHandler = () => {
        dispatch(deleteLanguagesRequest({ id: tableDataRowid }) as any).then((res: any) => {
            dispatch(getLanguagesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        setAlert({
            ...Alert,
            show: true,
            message: t("Languages deleted Succesfully"),
            color: "success",
        });
    };

    const inputChangeHandler = (event: any) => {
        setdataEmit({ ...dataEmit, displayName: event.target.value });
    };
    const checkboxHandler = (event: any) => {
        setdataEmit({ ...dataEmit, isEnabled: event.target.checked });
    };

    const onChangeSelectList = (option: string, value: any) => {
        setdataEmit((prevDataEmit) => {
            const updatedDataEmit = { ...prevDataEmit, flagIcon: value };
            return updatedDataEmit;
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
            setDebouncedSearchTerm(searchTerm);
        }, 3000);

        return () => clearTimeout(timer);
    }, [data.getLanguages]);


    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Adjust the delay as needed (e.g., 500ms)

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchTerm]);

    return (
        <>
            <div className="container-fluid p-0 m-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <div className="row ">
                                <div className="col-12 col-lg-4 col-md-6 col-xl-3 col-xxl-3 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        placeholder={t("Search") || ""}
                                        labelPosition="bottom"
                                        value={searchTerm}
                                        size="small"
                                        onChange={handleSearchChange}
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-8 col-md-6 col-xl-9 col-xxl-9 d-flex justify-content-end mb-3">
                                    <RdsOffcanvas
                                        offcanvasbutton={
                                            <div>
                                                <RdsButton
                                                    type={"button"}
                                                    label={t("New Language") || ""}
                                                    iconColorVariant="light"
                                                    size="small"
                                                    colorVariant="primary"
                                                    icon="plus"
                                                    iconFill={false}
                                                    iconStroke={true}
                                                    iconHeight="12px"
                                                    onClick={onNewLangHandler}
                                                    showLoadingSpinner={true}
                                                    iconWidth="12px"
                                                    dataTestId="new-language"
                                                ></RdsButton>
                                            </div>
                                        }
                                        placement={"end"}
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId={"new-language"}
                                        canvasTitle={t("New Language")}
                                    >
                                        <RdsCompNewLanguage
                                            onSaveHandler={onSaveHandler}
                                            cultureList={name}
                                            flagIconList={finalArray}
                                            isEnabled={false}
                                            edit={false}
                                        ></RdsCompNewLanguage>
                                    </RdsOffcanvas>
                                </div>
                            </div>
                            <RdsCompDatatable
                                actionPosition="right"
                                classes="table__userTable"
                                tableHeaders={tableHeaders}
                                tableData={Data}
                                actions={actions}
                                onActionSelection={onActionSelection}
                                recordsPerPageSelectListOption={true}
                                noDataheaderTitle={t("No Records Available") || ""}
                                noDataTitle={t("Click on the button to add") || ""}
                                illustration={true}
                                pagination={true}
                                totalRecords={totalRecords}
                                recordsPerPage={maxResultCount}
                                onPaginationHandler={paginationHandler}
                            ></RdsCompDatatable>
                             <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
                                {Alert.show && (
                                    <RdsAlert
                                        alertmessage={Alert.message}
                                        size="small"
                                        colorVariant={Alert.color}
                                    ></RdsAlert>
                                )}
                            </div>
                            <RdsOffcanvas
                                placement={"end"}
                                backDrop={true}
                                scrolling={false}
                                preventEscapeKey={false}
                                offId={"language-edit-off"}
                                canvasTitle={t("Edit Language")}
                            >
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <RdsInput
                                                    size="medium"
                                                    label={t("LanguageManagement.DisplayName") || ""}
                                                    placeholder={t("Enter Display Name") || ""}
                                                    value={dataEmit.displayName}
                                                    onChange={inputChangeHandler}
                                                    required={true}
                                                ></RdsInput>
                                            </div>
                                            <RdsCheckbox
                                                label={t("Is Enabled") || ""}
                                                checked={dataEmit.isEnabled}
                                                onChange={checkboxHandler}
                                            ></RdsCheckbox>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <RdsSelectList
                                                    id={"nt.Flag"}
                                                    placeholder={t("Select Flag Icon") || ""}
                                                    label={t("LanguageManagement.FlagIcon") || ""}
                                                    selectItems={finalArray}
                                                    selectedValue={selectedFlagIcon}
                                                    onChange={(item: any) => setSelectedFlagIcon(item.value)}
                                                ></RdsSelectList>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                                <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                    <RdsButton
                                        label={t("AbpUi.Cancel") || ""}
                                        type="button"
                                        colorVariant="primary"
                                        size="small"
                                        databsdismiss="offcanvas"
                                        isOutline={true}
                                    ></RdsButton>
                                    <RdsButton
                                        label={t("AbpUi.Save") || ""}
                                        type="button"
                                        size="small"
                                        isDisabled={formValid}
                                        class="ms-2"
                                        colorVariant="primary"
                                        databsdismiss="offcanvas"
                                        onClick={() => onEditHandler(dataEmit)}
                                    ></RdsButton>
                                </div>
                            </RdsOffcanvas>

                            <RdsCompAlertPopup
                                alertID={"language-delete-off"}
                                onSuccess={onDeleteHandler}
                            ></RdsCompAlertPopup>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Language;
