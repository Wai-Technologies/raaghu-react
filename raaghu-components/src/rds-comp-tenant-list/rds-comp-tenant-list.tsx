import React, { useEffect, useState } from "react";
import RdsDatatable, { ActionPosition } from "../../../raaghu-elements/src/rds-data-table/rds-data-table";
import { useTranslation } from "react-i18next";
import "./rds-comp-tenant-list.css";
import { ScriptableContext } from "chart.js";
import { RdsWidget, RdsLineChart, RdsBigNumber, RdsRadarChart, RdsDoughnutChart, RdsBooleanChart, RdsBarChart, RdsTable, RdsProgressBar, RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsRadioButton, RdsSelectList, RdsTextArea, RdsDropdownList, RdsIcon } from "../rds-elements";
import { CheckboxStatus } from "../../../raaghu-elements/src/rds-checkbox/rds-checkbox";
export interface Edition {
    option: string;
    value: string;
}
export interface RdsCompEditionListProps {
  enablecheckboxselection?: boolean;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number;
    required?: boolean;
    sortable?: boolean;
    colWidth?: string;
    disabled?: boolean;
    isEndUserEditing?: boolean;
  }[];
  actions?: {
    displayName: string;
    id: string;
  }[];
  tableData?: any[];
  pagination?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection?(rowData: any, actionId: any): void;
  onNewTenantClick?(
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void;
  tenant?: string;
  tenantInfoData: any;
  reset?: boolean;
  editions: any;
  isEdit?: any;
  onSaveHandler?: (data: any) => void
  isModuleSpecificDb?: boolean;
  setPasswordField: any;
  settingsTenantEditionList: any[];
  allowSelfRegistration: boolean;
  useCaptchaOnRegistration: boolean;
  isNewRegisteredTenantActiveByDefault: boolean;
  registerData?: any;
  countryFlagList?: any;
  onLogin: any;
  handleRegisterDataSubmit?: any;
  onIncreasePageCount?: any;
  onRegisterSaveHandler?: (data: any) => void
  isTenantInfoValid?: boolean;
  tenantSettingInfo?: any;
  showEditData?: boolean;
  passwordValidation?: boolean;
  onCancel?: React.EventHandler<any>;
  onSettingsSaveHandler?: (data: any) => void;
  tenantSettingData?: any;
}
const RdsCompEditionList = (props: RdsCompEditionListProps) => {
  const { t } = useTranslation();
      const [tenantInformationData, setTenantInformationData] = useState(props.tenantInfoData);
      const [inputReset, setInputReset] = useState(false);
      const [radioItemList, setRadioItemList] = useState<any>([]);
      const [passwordField, setPasswordField] = useState(props.setPasswordField);
      const [registerFormData, setRegisterFormData] = useState(props.registerData);
      const [countryList, setCountryList] = useState(props.countryFlagList);
      const [isLoginClicked, setIsLoginClicked] = useState(false);
      const [isCheckTerms, setIsCheckTerms] = useState(false);
          const [formData, setFormData] = useState(props.tenantSettingData);
          const [hostDatabaseChecked, setHostDatabaseChecked] = useState(false);
          const [isRandomPasswordChecked, setIsRandomPasswordChecked] = useState(false);
          const [err, setErr] = useState({
              password: "",
              cpassword: "",       
            });
        const [errors, setErrors] = useState({
          adminPassword: "",   
        });
        const [error, setError] = useState<{ databaseURL: string | null }>({ databaseURL: null });

        const activationStateList = [
                { option: "Active", value: "0" },
                { option: "Active with Limited Time", value: "1" },
                { option: "Inactive", value: "2" },
            ];
        
            useEffect(() => {
                setTenantInformationData(props.tenantInfoData);        
            },[props.tenantInfoData]);
        
            useEffect(() => {
                let radioItems;
                if (!props.tenantInfoData?.connectionStrings?.default) {
        
                    radioItems = [{
                        id: 1,
                        label: "Shared Database",
                        checked: true,
                        name: "radio_button",
                    },
                    {
                        id: 2,
                        label: "Separated Database",
                        checked: false,
                        name: "radio_button",
                    },
                    ]
                }
                else {
                    radioItems = [
                        {
                            id: 1,
                            label: "Shared Database",
                            checked: false,
                            name: "radio_button",
                        },
                        {
                            id: 2,
                            label: "Separated Database",
                            checked: true,
                            name: "radio_button",
                        },
                    ]
                }
                setRadioItemList(radioItems);
            }, [props.tenantInfoData?.connectionStrings?.default]);

             const dropdownListItems = [
               {
                 label: "Standard",
                 val: "en",
               },
               {
                 label: "Basic",
                 val: "en",
               },
               {
                 label: "Premium",
                 val: "en",
               },
               {
                 label: "Professional",
                 val: "en",
               },
             ];
        
            useEffect(() => {
                setInputReset(!inputReset);
            }, [props.reset]);
        
            const isEmailValid = (email: any) => {
                if (!props.isEdit) {
                    const urlPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    return urlPattern.test(email)
                } else return true;
        
            };
        
            const isPasswordValid = (password: any) => {
                if (!password || password.length === 0) {
                    return false;
                }
                return true;
            };
        
            const isNameValid = (name: any) => {
                if (!name || name.length === 0) {
                    return false;
                }
                return true;
            };
        
            const isFormValidNew =
                isPasswordValid(tenantInformationData?.adminPassword) &&
                isEmailValid(tenantInformationData.adminEmailAddress) &&
                isNameValid(tenantInformationData?.name);
        
            const isFormValidEdit = isNameValid(tenantInformationData?.name);
        
            const isFormValid = props.isEdit == true ? isFormValidEdit : isFormValidNew;
        
            const handleDataChanges = (value: any, key: string) => {
                setTenantInformationData({ ...tenantInformationData, [key]: value });
            }
        
            const isNewPassValid = (password: string) => {
                const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                return pattern.test(password);
              };
        
            const [isPasswordTouched, setIsPasswordTouched] = useState(false);
        
            const handleDataChange = (value: any, key: string) => {
                let errorMessage = "";
            
                if (key === "adminPassword") {
                    if (!isNewPassValid(value)) {
                        errorMessage = "Please Enter Valid Password length should be at least 8 characters(Alphanumeric)";
                    }
                }
            
                setErrors({ ...errors, [key]: errorMessage });
                setTenantInformationData({ ...tenantInformationData, [key]: value });
            };
        
            const isValidDatabaseURL = (url: string) => {
                const pattern = /^(?:[a-zA-Z][a-zA-Z\d+\-.]*):\/\/(?:[^\s:@]+(?::[^\s:@]*)?@)?(?:[a-zA-Z\d\-._~%!$&'()*+,;=]+|\[[a-fA-F\d:]+\])(?::\d+)?(?:\/[^\s]*)?$/;
                const domainWithTLDPattern = /^[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)+$/; 
                try {
                    const urlObject = new URL(url); 
                    return (
                        pattern.test(url) &&
                        domainWithTLDPattern.test(urlObject.hostname) 
                    );
                } catch (e) {
                    return false; 
                }
            };
            
            function handleDatabaseURL(value: string) {
                setTenantInformationData((prevData: any) => ({
                    ...prevData,
                    connectionStrings: {
                        ...(prevData?.connectionStrings ?? { default: "" }),
                        default: value,
                    },
                }));
            
                if (!value.trim()) {
                    setError((prevError) => ({
                        ...prevError,
                        databaseURL: "Database URL cannot be empty",
                    }));
                } else if (!isValidDatabaseURL(value)) {
                    setError((prevError) => ({
                        ...prevError,
                        databaseURL:
                            "Please enter a valid database URL",
                    }));
                } else {
                    setError((prevError) => ({ ...prevError, databaseURL: null })); 
                }
            }
            
            function handleConnectionStrings(event: any) {
                const updatedRadioItems = radioItemList?.map((item: any) => ({
                    ...item,
                    checked: item.id == event.target.id,
                }));
                setRadioItemList(updatedRadioItems);
                if (event.target.value !== "Separated Database") {
                    setTenantInformationData({
                        ...tenantInformationData,
                        connectionStrings: { ...tenantInformationData.connectionStrings, default: "" },
                    });
                }
            }

            useEffect(() => {
                    setRegisterFormData(props.registerData);
                }, [props.registerData]);
            
                useEffect(() => {
                    setCountryList(props.countryFlagList);
                }, [props.countryFlagList]);
            
                const isCountryValid = (countryId: any) => {
                    return countryId !== undefined;
                };
            
                const isZipCodeValid = (zipCode: any) => {
                    return zipCode && zipCode.length > 0;
                };
                useEffect(() => {
                    setInputReset(!inputReset);
                }, [props.reset]);
            
                const isRegisterFormValid =
                    isEmailValid(registerFormData?.adminEmailAddress) &&
                    isPasswordValid(registerFormData?.adminPassword) &&
                    isNameValid(registerFormData?.name) &&
                    isCountryValid(registerFormData?.countryCode) &&
                    isZipCodeValid(registerFormData?.zipCode) && isCheckTerms;
            
            
                const loginHandler: any = (isLoginClicked: boolean) => {
                    setIsLoginClicked(false);
                    props.onLogin(false);
                };
            
                const handleRegisterDataChanges = (value: any, key: string) => {
                    setRegisterFormData({ ...registerFormData, [key]: value });
                    console.log(registerFormData);
                }
            
                function emitRegisterSaveData(event: any) {
                    event.preventDefault();
                    // if (isFormValid) {
                    props.onSaveHandler && props.onSaveHandler(registerFormData);
                    setInputReset(!inputReset);
                    setRegisterFormData({
                        name: "",
                        adminEmailAddress: "",
                        adminPassword: "",
                        countryCode: "",
                        zipCode: "",
                       
                    });
                    setIsCheckTerms(false); 
                    setCountryList([]);
                    // }
                };

            function emitSaveData(event: any) {
                event.preventDefault();
                props.onSaveHandler && props.onSaveHandler(tenantInformationData);
                setInputReset(!inputReset);
                setTenantInformationData({
                    ...tenantInformationData,
                    name: "",
                    editions: "", 
                    adminEmailAddress: "",
                    adminPassword: "",
                    activationState: "", 
                    connectionStrings: { default: "" },
                    isModuleSpecificDb: false,
                    radioItemList : []
                });
                const resetRadioItems = radioItemList?.map((item: any) => ({
                    ...item,
                    checked: false,
                }));
                setRadioItemList(resetRadioItems);
            }
                
                  const isCurNewPassValid = (cpassword: string) => {
                    return cpassword === formData.password;
                  };
            
                useEffect(() => {
                    setFormData(props.tenantSettingData);
                }, [props.tenantSettingData]);
            
                useEffect(() => {
                    setInputReset(!inputReset);
                }, [props.reset]);
            
                const handleSettingsDataChanges = (value: any, key: string) => {
            
                      let errorMessage = "";
                      if (key === "password") {
                        errorMessage = isNewPassValid(value) ? "" : "Password is invalid";
                      } else if (key === "cpassword") {
                        errorMessage = isCurNewPassValid(value) ? "" : "Password mismatch found";
                      }
                      setErrors({ ...errors, [key]: errorMessage });
            
                    setFormData({ ...formData, [key]: value });
                };
            
                function emitSettingsSaveData(event: any) {
                    event.preventDefault();
                    props.onSaveHandler && props.onSaveHandler(formData);
                    setInputReset(!inputReset);
                    setFormData({
                        dcstring: "",
                        password: "",
                        cpassword: "",
                        useHostDb: hostDatabaseChecked,
                        isRandomPasswordChecked: isRandomPasswordChecked,
                        shouldChangePasswordOnNextLogin: false,
                        sendActivationPassword: false,
                        activate: false
                });
                }

                const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
                    useState(false);
                const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
                    useState(false);
                    const isConnectionStringValid = (dcstring: string) => {
                        if (!dcstring || dcstring.length === 0) {
                            return false;
                        }
                        return true;
                    }
                    const isSettingsPasswordValid = (password: string) => {
                        if (!password || password.length === 0 || err.password) {
                            return false;
                        }
                        return true;
                    }
                    const isConfirmPasswordValid = (cpassword: string) => {
                        if (!cpassword || cpassword.length === 0 || err.cpassword) {
                            return false;
                        }
                        return true;
                    }
            const isSettingsFormValid=isConnectionStringValid(formData?.dcstring) && isPasswordValid(formData?.password) && isConfirmPasswordValid(formData?.cpassword);
                
  return (
    <>
    {props.tenant === "list" && (
    <RdsDatatable
      actionPosition={ActionPosition.Right}
      tableHeaders={props.tableHeaders}
      actions={props.actions}
      tableData={props.tableData!}
      pagination={props.pagination!}
      recordsPerPage={props.recordsPerPage}
      onActionSelection={props.onActionSelection!}
      recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}
      noDataheaderTitle="No Records Available"
      noDataTitle="Click on the button to add"
    ></RdsDatatable>
    )}
    {props.tenant === "dashboard" && (
        <div className="dark dashboard bg-grey p-2 p-lg-4 p-md-4">
            <div className="row">
                <div className="col-xl-6  col-lg-6 col-md-12 d-cus-none">
                    <RdsWidget
                        headerTitle={"Monthly Summary"}
                        isRefreshRequired={true}
                        class="card-stretch"
                        colorVariant="white"
                        isCardStretch={true}
                    >
                        <RdsLineChart
                            id="linechart"
                            labels={[
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ]}
                            options={{
                                radius: 0,
                                pointStyle: "circle",
                                responsive: true,
                                borderWidth: 1,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: false,
                                    },
                                    legend: {
                                        position: "top",
                                        align: "end",
                                        pointStyle: "circle",
                                        labels: {
                                            usePointStyle: true,
                                            boxWidth: 8,
                                            padding: 30,
                                            height: 10,
                                        },
                                    },
                                    tooltip: {
                                        enabled: true,
                                    },
                                },
                                scales: {
                                    y: {
                                        axis: "y",
                                        beginAtZero: true,
                                        legend: {
                                            labels: {
                                                maxheight: 10,
                                            },
                                        },
                                        grid: {
                                            display: false,
                                            lineWidth: 1,
                                            drawBorder: true,
                                            drawOnChartArea: true,
                                            drawTicks: true,
                                            tickLength: 8,
                                            offset: false,
                                            borderDash: [],
                                            borderDashOffset: 0,
                                            borderWidth: 1,
                                            color: "rgba(0,0,0,0.1)",
                                            borderColor: "rgba(0,0,0,0.1)",
                                        },
                                        type: "linear",
                                        ticks: {
                                            minRotation: 0,
                                            maxRotation: 50,
                                            mirror: false,
                                            textStrokeWidth: 0,
                                            textStrokeColor: "",
                                            padding: 3,
                                            display: true,
                                            autoSkip: true,
                                            autoSkipPadding: 3,
                                            labelOffset: 0,
                                            minor: {},
                                            major: {},
                                            align: "center",
                                            crossAlign: "near",
                                            showLabelBackdrop: false,
                                            backdropColor: "rgba(255, 255, 255, 0.75)",
                                            backdropPadding: 2,
                                            color: "#666",
                                        },
                                        display: true,
                                        offset: false,
                                        reverse: false,
                                        bounds: "ticks",
                                        grace: 0,
                                        title: {
                                            display: false,
                                            text: "",
                                            padding: {
                                                top: 4,
                                                bottom: 4,
                                            },
                                            color: "#666",
                                        },
                                        id: "y",
                                        position: "left",
                                    },
                                    x: {
                                        axis: "x",
                                        grid: {
                                            display: false,
                                            lineWidth: 1,
                                            drawBorder: true,
                                            drawOnChartArea: true,
                                            drawTicks: true,
                                            tickLength: 8,
                                            offset: false,
                                            borderDash: [],
                                            borderDashOffset: 0,
                                            borderWidth: 1,
                                            color: "rgba(0,0,0,0.1)",
                                            borderColor: "rgba(0,0,0,0.1)",
                                        },
                                        type: "category",
                                        ticks: {
                                            minRotation: 0,
                                            maxRotation: 50,
                                            mirror: false,
                                            textStrokeWidth: 0,
                                            textStrokeColor: "",
                                            padding: 3,
                                            display: true,
                                            autoSkip: true,
                                            autoSkipPadding: 3,
                                            labelOffset: 0,
                                            minor: {},
                                            major: {},
                                            align: "center",
                                            crossAlign: "near",
                                            showLabelBackdrop: false,
                                            backdropColor: "rgba(255, 255, 255, 0.75)",
                                            backdropPadding: 2,
                                            color: "#666",
                                        },
                                        display: true,
                                        offset: false,
                                        reverse: false,
                                        beginAtZero: false,
                                        bounds: "ticks",
                                        grace: 0,
                                        title: {
                                            display: false,
                                            text: "",
                                            padding: {
                                                top: 4,
                                                bottom: 4,
                                            },
                                            color: "#666",
                                        },
                                        id: "x",
                                        position: "bottom",
                                    },
                                },
                                tooltip: {
                                    display: true,
                                    usePointStyle: true,
                                },
                            }}
                            dataSets={[
                                {
                                    label: "Sales",
                                    data: [
                                        190, 200, 133, 231, 112, 125, 135, 135.7, 266, 224, 122,
                                        125,
                                    ],
                                    borderColor: "#4DCFFF",
                                    pointBackgroundColor: "#4DCFFF",
                                    fill: true,
                                    pointRadius: 0,
                                    tension: 0.4,
                                },
                                {
                                    label: "Revenue",
                                    data: [
                                        290, 262, 205, 162, 150, 180, 206, 220, 240, 190, 275,
                                        211,
                                    ],
                                    borderColor: "#863BFF",
                                    pointBackgroundColor: "#863BFF",
                                    fill: true,
                                    pointRadius: 0,
                                    tension: 0.4,
                                },
                            ]}
                        />
                    </RdsWidget>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                    <RdsWidget
                        headerTitle="License"
                        isCardStretch={true}>
                        <RdsBigNumber bigNumber="10"></RdsBigNumber>
                        <RdsRadarChart
                            id="newRadar"
                            labels={["Jan", "Feb", "Mar", "Apr", "May", "June", "July"]}
                            options={{
                                animation : false,
                                responsive: false,
                                chartArea: {
                                    backgroundColor: "rgba(251, 85, 85, 0.4)",
                                },
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                        align: "center",
                                        pointStyle: "rectRot",
                                        pointRadius: 5,
                                        labels: {
                                            usePointStyle: true,
                                        }
                                    },
                                    
                                    tooltip: {
                                        usePointStyle: true,
                                    },
                                    scale: {
                                        type: "line",
                                        angleLines: {
                                            display: true,
                                        },
                                    },
                                },
                                scales: {
                                    r: {
                                        axis: "r",
                                        type: "radialLinear",
                                        display: true,
                                        animate: true,
                                        position: "chartArea",
                                        angleLines: {
                                            display: true,
                                            lineWidth: 1,
                                        },
                                        grid: {
                                            circular: false,
                                            display: true,
                                            lineWidth: 1,
                                            drawBorder: true,
                                            drawOnChartArea: true,
                                            drawTicks: true,
                                            tickLength: 8,
                                            offset: false,
                                            borderDash: [],
                                            borderDashOffset: 0,
                                            borderWidth: 1,
                                            color: "rgba(0,0,0,0.1)",
                                            borderColor: "rgba(0,0,0,0.1)",
                                        },
                                        startAngle: 0,
                                        ticks: {
                                            showLabelBackdrop: true,
                                            color: "#666",
                                            minRotation: 0,
                                            maxRotation: 50,
                                            mirror: false,
                                            textStrokeWidth: 0,
                                            textStrokeColor: "",
                                            padding: 3,
                                            display: true,
                                            autoSkip: true,
                                            autoSkipPadding: 3,
                                            labelOffset: 0,
                                            minor: {},
                                            major: {},
                                            align: "center",
                                            crossAlign: "near",
                                            backdropColor: "rgba(0,0,0,0.01)",
                                            backdropPadding: 2,
                                        },
                                        pointLabels: {
                                            backdropPadding: 2,
                                            display: true,
                                            font: {
                                                size: 10,
                                            },
                                            padding: 5,
                                            centerPointLabels: false,
                                            color: "#666",
                                        },
                                        offset: false,
                                        reverse: false,
                                        beginAtZero: false,
                                        bounds: "ticks",
                                        grace: 0,
                                        title: {
                                            display: false,
                                            text: "",
                                            padding: {
                                                top: 4,
                                                bottom: 4,
                                            },
                                            color: "#666",
                                        },
                                        id: "r",
                                    },
                                },
                            }}
                            dataSets={[
                                {
                                    label: "Team",
                                    data: [0.5, 0.8, 0.4, 0.6, 0.7, 0.2, 0.9],
                                    borderColor: "rgba(255, 99, 132, 1)",
                                    backgroundColor: "rgba(255, 99, 132, 1)",
                                    fill: false,
                                    pointStyle: "circle",
                                    pointRadius: 2,
                                },
                                {
                                    label: "Business",
                                    data: [0.9, 0.3, 0.8, 0.9, 0.1, 0.7, 0.2],
                                    borderColor: "rgba(191, 0, 187, 1)",
                                    backgroundColor: "rgba(191, 0, 187, 1)",
                                    fill: false,
                                    pointStyle: "circle",
                                    pointRadius: 2,
                                },
                                {
                                    label: "Enterprise",
                                    data: [0.7, 0.2, 0.1, 0.9, 0.8, 0.4, 0.7],
                                    borderColor: "rgba(126, 46, 239, 1)",
                                    backgroundColor: "rgba(126, 46, 239, 1)",
                                    fill: false,
                                    pointStyle: "circle",
                                    pointRadius: 2,
                                },
                            ]}
                        />
                    </RdsWidget>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                    <RdsWidget
                        headerTitle="Profit Share"
                        isRefreshRequired={true}
                        iconName="refresh"
                        iconTooltipLabel="Refresh"
                        iconTooltipPosition="top"
                        isCardStretch={true}
                    >
                        <div>
                            <RdsBigNumber bigNumber="$39,330"></RdsBigNumber>
                            <div className="col col-sm-12">
                                <RdsDoughnutChart
                                    id="doughnutchart"

                                    labels={['Total Sales - 85%', 'Revenue - 25%', 'Expenses - 15%']}


                                    options={{
                                        animationEnabled: true,
                                        title: {
                                            fontColor: "#fff",
                                        },
                                        cutoutPercentage: 80,

                                        responsive: true,

                                        subtitles: {
                                            fontColor: "#fff",
                                            verticalAlign: "center",
                                        },
                                        maintainAspectRatio: false,
                                        plugins: {
                                            series: {
                                                label: {
                                                    position: "inside",
                                                    text: "total",
                                                    display: false,
                                                    font: {
                                                        size: 12,
                                                        weight: "regular",
                                                    },
                                                },
                                            },
                                            doughnutlabel: {
                                                labels: [
                                                    {
                                                        text: "550",
                                                        font: {
                                                            size: 8,
                                                            weight: "bold",
                                                        },
                                                    },
                                                    {
                                                        text: "total",
                                                    },
                                                ],
                                            }, title: {
                                                text: 'title sample',
                                                font: {
                                                    size: 12,

                                                }
                                            },
                                            legend: {
                                                display: true,
                                                align: "middle",
                                                position: "right",
                                                color: "#fff",
                                                labels: {
                                                    boxWidth: 15,
                                                    padding: 15,
                                                },
                                            },
                                            tooltip: { enabled: false },
                                        },
                                        scales: {},
                                    }}
                                    dataSets={[
                                        {

                                            label: "Total Sales",
                                            data: [85, 0, 0, 15],
                                            backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                                            weight: 0.2,
                                            borderRadius: 20,
                                            borderColor: ["transparent"],

                                        },
                                        {
                                            weight: 0.2
                                        },
                                        {
                                            label: "Revenue",
                                            data: [0, 75, 0, 25],
                                            backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                                            weight: 0.2,
                                            borderRadius: 20,
                                            borderColor: ["transparent"]
                                        },
                                        {
                                            weight: 0.2
                                        },
                                        {
                                            label: "Expenses",
                                            data: [0, 0, 55, 45],
                                            backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                                            weight: 0.2,
                                            borderRadius: 20,
                                            borderColor: ["transparent"]
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </RdsWidget>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <RdsWidget
                                    headerTitle="Call Overview"
                                    isRefreshRequired={false}
                                    isCardStretch={true}
                                    height="auto"
                                >
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <RdsBooleanChart
                                                    centerIconName="headset"
                                                    id="Boolean1"
                                                    
                                                    labels={[
                                                        "Total Calls Connected",
                                                        "Total Clients Called",
                                                    ]}
                                                    options={{
                                                        elements: {
                                                            center: {
                                                                text: "50%", //set as you wish
                                                            },
                                                        },
                                                        cutoutPercentage: 75,
                                                        legend: {
                                                            display: false,
                                                        },
                                                        maintainAspectRatio: false,
                                                        responsive: true,
                                                        plugins: {
                                                            series: {
                                                                label: {
                                                                    position: "inside",
                                                                    text: "total", // or "inside" | "outside"
                                                                    display: false,
                                                                },
                                                            },
                                                            doughnutlabel: {
                                                                labels: [
                                                                    {
                                                                        text: "550",
                                                                        font: {
                                                                            size: 20,
                                                                            weight: "bold",
                                                                        },
                                                                    },
                                                                    {
                                                                        text: "total",
                                                                    },
                                                                ],
                                                            },
                                                            legend: {
                                                                display: false,
                                                                align: "start",
                                                                position: "right",
                                                            },
                                                            tooltip: { enabled: false },
                                                        },
                                                    }}
                                                    dataSets={[
                                                        {
                                                            label: "Dataset 1",
                                                            data: [80, 100 - 80],
                                                            fillStyle: "#d9c9ef33",
                                                            fillRect: [200, 100, 40, 10],
                                                            borderColor: ["transparent"],

                                                            backgroundColor: ["#01AE9D", "#d9c9ef33"],
                                                            cutout: "80%",
                                                            title: {
                                                                text: "Doughnut Chart",
                                                                verticalAlign: "center",
                                                                dockInsidePlotArea: true,
                                                            },
                                                        },
                                                    ]}
                                                    chartStyle={""}
                                                ></RdsBooleanChart>
                                            </div>
                                            <div className="ms-2">
                                                <h3 className="custom-title">80%</h3>
                                                <p className="custom-desc mb-0">
                                                    Total Calls Connected
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mt-3">
                                            <div className="">
                                                <RdsBooleanChart
                                                    centerIconName="users"
                                                    id="Boolean2"
                                                    labels={[
                                                        "Total Client calls connected",
                                                        "Total Client calls disconnected",
                                                    ]}
                                                    options={{
                                                        elements: {
                                                            center: {
                                                                text: "50%", //set as you wish
                                                            },
                                                        },
                                                        cutoutPercentage: 75,
                                                        legend: {
                                                            display: false,
                                                        },
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            series: {
                                                                label: {
                                                                    position: "inside",
                                                                    text: "total", // or "inside" | "outside"
                                                                    display: true,
                                                                },
                                                            },
                                                            doughnutlabel: {
                                                                labels: [
                                                                    {
                                                                        text: "550",
                                                                        font: {
                                                                            size: 20,
                                                                            weight: "bold",
                                                                        },
                                                                    },
                                                                    {
                                                                        text: "total",
                                                                    },
                                                                ],
                                                            },
                                                            legend: {
                                                                display: false,
                                                                align: "start",
                                                                position: "right",
                                                                fontSize: 20,
                                                            },
                                                            tooltip: { enabled: false },
                                                        },
                                                    }}
                                                    dataSets={[
                                                        {
                                                            label: "Dataset 1",
                                                            data: [65, 100 - 65],
                                                            fillStyle: "#D0D7DD",
                                                            fillRect: [200, 100, 40, 10],
                                                            backgroundColor: ["#F3AB19", "#d9c9ef33"],
                                                            borderColor: ["transparent"],
                                                            cutout: "80%",
                                                            title: {
                                                                text: "Doughnut Chart",
                                                                verticalAlign: "center",
                                                                dockInsidePlotArea: true,
                                                            },
                                                        },
                                                    ]}
                                                    chartStyle={""}
                                                ></RdsBooleanChart>
                                            </div>
                                            <div className="ms-2">
                                                <h3 className="custom-title">20%</h3>
                                                <p className="custom-desc mb-0">
                                                    Total Clients Called
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </RdsWidget>
                            </div>
                            <div>
                                <RdsWidget
                                    headerTitle="Maximum Profit"
                                    isRefreshRequired={false}
                                    isCardStretch={true}
                                    height="auto"
                                   

                                >
                                    <RdsBigNumber bigNumber="$8,425"></RdsBigNumber>
                                    <RdsLineChart

                                        id="linechart1"

                                        labels={["12am", "4am", "8am", "12pm", "4pm", "8pm"]}

                                        options={{

                                            radius: 0,

                                            pointStyle: "circle",

                                            responsive: true,

                                            borderWidth: 1,

                                            maintainAspectRatio: false,

                                            plugins: {

                                                title: {

                                                    display: false,

                                                },

                                                legend: {
                                                    display: false,
                                                    position: "top",

                                                    align: "end",

                                                    pointStyle: "circle",

                                                    boxWidth: "10",
                                                    boxHeight: "10",

                                                    labels: {

                                                        usePointStyle: true,

                                                        pointStyleWidth: 13,

                                                        boxWidth: 10,

                                                        boxHeight: 10,

                                                        padding: 30,

                                                        height: 5,

                                                    },

                                                },

                                                tooltip: {

                                                    enabled: false,

                                                },

                                            },

                                            scales: {

                                                y: {

                                                    axis: "y",

                                                    beginAtZero: true,
                                                    min: 0,
                                                    legend: {
                                                        display: false,
                                                        labels: {

                                                            maxheight: 9,

                                                        },

                                                    },

                                                    grid: {

                                                        display: false,

                                                        lineWidth: 1,

                                                        drawBorder: true,

                                                        drawOnChartArea: true,

                                                        drawTicks: true,

                                                        tickLength: 8,

                                                        offset: false,



                                                        borderDashOffset: 0,

                                                        borderWidth: 1,
                                                        borderDash: [1, 1],

                                                        color: "#c7c7c7",

                                                        borderColor: "#c7c7c7",


                                                    },

                                                    type: "linear",

                                                    ticks: {

                                                        minRotation: 0,

                                                        maxRotation: 50,

                                                        mirror: false,

                                                        textStrokeWidth: 0,

                                                        textStrokeColor: "",

                                                        padding: 3,

                                                        display: false,

                                                        autoSkip: true,

                                                        autoSkipPadding: 3,

                                                        labelOffset: 0,

                                                        minor: {},

                                                        major: {},

                                                        align: "center",

                                                        crossAlign: "near",

                                                        showLabelBackdrop: false,

                                                        backdropColor: "rgba(255, 255, 255, 0.75)",

                                                        backdropPadding: 2,

                                                        color: "#666",

                                                    },

                                                    display: false,

                                                    offset: false,

                                                    reverse: false,

                                                    bounds: "ticks",

                                                    grace: 0,

                                                    title: {

                                                        display: false,

                                                        text: "",

                                                        padding: {

                                                            top: 4,

                                                            bottom: 4,

                                                        },

                                                        color: "#666",

                                                    },

                                                    id: "y",

                                                    position: "left",

                                                },

                                                x: {

                                                    axis: "x",

                                                    grid: {

                                                        display: false,

                                                        lineWidth: 1,

                                                        drawBorder: true,

                                                        drawOnChartArea: false,

                                                        drawTicks: true,

                                                        tickLength: 8,

                                                        offset: false,

                                                        borderDash: [1, 1],

                                                        borderDashOffset: 0,

                                                        borderWidth: 1,

                                                        color: "rgba(0,0,0,0.1)",

                                                        borderColor: "rgba(0,0,0,0.1)",

                                                    },

                                                    type: "category",

                                                    ticks: {

                                                        minRotation: 0,

                                                        maxRotation: 50,

                                                        mirror: false,

                                                        textStrokeWidth: 0,

                                                        textStrokeColor: "",

                                                        padding: 3,

                                                        display: false,

                                                        autoSkip: true,

                                                        autoSkipPadding: 3,

                                                        labelOffset: 0,

                                                        minor: {},

                                                        major: {},

                                                        align: "center",

                                                        crossAlign: "near",

                                                        showLabelBackdrop: false,

                                                        backdropColor: "rgba(255, 255, 255, 0.75)",

                                                        backdropPadding: 2,

                                                        color: "#666",

                                                    },

                                                    display: false,

                                                    offset: false,

                                                    reverse: false,

                                                    beginAtZero: false,

                                                    bounds: "ticks",

                                                    grace: 0,

                                                    title: {

                                                        display: false,

                                                        text: "",

                                                        padding: {

                                                            top: 4,

                                                            bottom: 4,

                                                        },

                                                        color: "#666",

                                                    },

                                                    id: "x",

                                                    position: "bottom",

                                                },

                                            },

                                            tooltip: {

                                                display: false,



                                            },

                                        }}

                                        dataSets={[

                                            {

                                                data: [2.4, 4.7, 2.2, 4.2, 4.5, 2.7, 3.6,],
                                                borderColor: "#4DCFFF",

                                                pointBackgroundColor: "#4DCFFF",

                                                fill: true,

                                                pointRadius: 0,

                                                backgroundColor: (context: ScriptableContext<"line">) => {

                                                    const ctx = context.chart.ctx;

                                                    const gradient = ctx.createLinearGradient(0, 0, 0, 210);

                                                    gradient.addColorStop(0.1, "rgba(77,207,255, 0.8)");

                                                    gradient.addColorStop(0.25, "rgba(77,207,255, 0.1)");

                                                    return gradient;

                                                },

                                                tension: 0.3,

                                            }

                                        ]}

                                    />

                                </RdsWidget>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <RdsWidget
                                isCardStretch={true}
                                headerTitle={"Daily Sales Growth"}
                                isRefreshRequired={true}
                                colorVariant={"white"}
                                class="border-0"
                                bigNumber={"$3,73,960.412"}
                                subTitle="-$5850.75"
                                subTitleColorVariant="danger"
                                icon={"triangle_down"}
                                iconHeight={"12px"}
                                iconStroke={false}
                                iconFill={true}
                                iconWidth={"12px"}
                                iconColor={"danger"}
                            >
                                <div>
                                    <RdsBarChart
                                        id="barchart1"
                                        labels={[
                                            "10k",
                                            "20k",
                                            "25k",
                                            "30k",
                                            "40k",
                                            "50k",
                                            "60k",
                                            "70k",
                                            "75k",
                                            "80k",
                                            "90k",
                                            "95k",
                                        ]}
                                        options={{
                                            indexAxis: "x",
                                            elements: {
                                                bar: {
                                                    borderWidth: 0,
                                                    width: 1,
                                                },
                                            },
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: "",
                                                    pointStyle: "line",
                                                    labels: {
                                                        usePointStyle: true,
                                                    },
                                                },
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                                tooltip: {
                                                    usePointStyle: true,
                                                },
                                                title: {
                                                    display: false,
                                                    text: "Daily Sales Growth",
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    axis: "x",
                                                    type: "category",
                                                    offset: true,
                                                    grid: {
                                                        offset: true,
                                                        display: true,
                                                        lineWidth: 1,
                                                        drawBorder: true,
                                                        drawOnChartArea: true,
                                                        drawTicks: true,
                                                        tickLength: 8,
                                                        borderDash: [],
                                                        borderDashOffset: 0,
                                                        borderWidth: 1,
                                                        color: "rgba(0,0,0,0.1)",
                                                        borderColor: "rgba(0,0,0,0.1)",
                                                    },
                                                    ticks: {
                                                        minRotation: 0,
                                                        maxRotation: 50,
                                                        mirror: false,
                                                        textStrokeWidth: 0,
                                                        textStrokeColor: "",
                                                        padding: 3,
                                                        display: true,
                                                        autoSkip: true,
                                                        autoSkipPadding: 3,
                                                        labelOffset: 0,
                                                        minor: {},
                                                        major: {},
                                                        align: "center",
                                                        crossAlign: "near",
                                                        showLabelBackdrop: false,
                                                        backdropColor: "rgba(255, 255, 255, 0.75)",
                                                        backdropPadding: 2,
                                                        color: "#666",
                                                    },
                                                    display: true,
                                                    reverse: false,
                                                    beginAtZero: false,
                                                    bounds: "ticks",
                                                    grace: 0,
                                                    title: {
                                                        display: false,
                                                        text: "",
                                                        padding: {
                                                            top: 4,
                                                            bottom: 4,
                                                        },
                                                        color: "#666",
                                                    },
                                                    id: "x",
                                                    position: "bottom",
                                                },
                                                y: {
                                                    axis: "y",
                                                    type: "linear",
                                                    beginAtZero: true,
                                                    ticks: {
                                                        minRotation: 0,
                                                        maxRotation: 50,
                                                        mirror: false,
                                                        textStrokeWidth: 0,
                                                        textStrokeColor: "",
                                                        padding: 3,
                                                        display: true,
                                                        autoSkip: true,
                                                        autoSkipPadding: 3,
                                                        labelOffset: 0,
                                                        minor: {},
                                                        major: {},
                                                        align: "center",
                                                        crossAlign: "near",
                                                        showLabelBackdrop: false,
                                                        backdropColor: "rgba(255, 255, 255, 0.75)",
                                                        backdropPadding: 2,
                                                        color: "#666",
                                                    },
                                                    display: true,
                                                    offset: false,
                                                    reverse: false,
                                                    bounds: "ticks",
                                                    grace: 0,
                                                    grid: {
                                                        display: true,
                                                        lineWidth: 1,
                                                        drawBorder: true,
                                                        drawOnChartArea: true,
                                                        drawTicks: true,
                                                        tickLength: 8,
                                                        offset: false,
                                                        borderDash: [],
                                                        borderDashOffset: 0,
                                                        borderWidth: 1,
                                                        color: "rgba(0,0,0,0.1)",
                                                        borderColor: "rgba(0,0,0,0.1)",
                                                    },
                                                    title: {
                                                        display: false,
                                                        text: "",
                                                        padding: {
                                                            top: 4,
                                                            bottom: 4,
                                                        },
                                                        color: "#666",
                                                    },
                                                    id: "y",
                                                    position: "left",
                                                },
                                            },
                                        }}
                                        dataSets={[
                                            {
                                                label: "Sales Growth",
                                                data: [
                                                    15, 67, 34, 78, 45, 87, 76, 32, 50, 14, 35, 22,
                                                ],
                                                backgroundColor: "rgba(54, 162, 235, 1)",
                                                borderColor: "rgba(54, 162, 245, 1)",
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                barThickness: 7,
                                                borderSkipped: false,
                                            },
                                        ]}
                                    />
                                </div>
                            </RdsWidget>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                                    <RdsWidget
                                        headerTitle={"Member Activity"}
                                        isRefreshRequired={true}
                                        isCardStretch={true}
                                    >
                                        <div className="table-responsive">
                                            <RdsTable
                                                tableHeightForScroll="356px"
                
                                                headerDatas={[
                                                    {
                                                        displayName: ("Members"),
                                                        key: "member",
                                                        dataType: "html",
                                                    },
                                                    { displayName: ("Cases"), key: "cases", dataType: "html" },
                                                    {
                                                        displayName: ("Active"),
                                                        key: "active",
                                                        dataType: "html",
                                                    },
                                                    {
                                                        displayName: ("Closed"),
                                                        key: "closed",
                                                        dataType: "html",
                                                    },
                                                    { displayName: ("Rate"), key: "rate", dataType: "html" },
                                                ]}
                                                tableDatas={[
                                                    {
                                                        id: 12,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Brian</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Software Developer{" "}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 38 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="HighRate d-flex align-items-center justify-content-start ">
                                                                92%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 23,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 18 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Kim</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Senior Developer{" "}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 342 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 25 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                                42%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 22,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 7 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Jane</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Sales Executive{" "}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 25 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 5 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="HighRate d-flex align-items-center justify-content-start">
                                                                96%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 11,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 14 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Brian</b>
                                                                    </p>
                                                                    <small className="custom-desc">
                                                                        Software Developer
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 42 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 42 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="LowRate d-flex align-items-center justify-content-start">
                                                                16%
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        id: 19,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 13 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Kath</b>
                                                                    </p>
                                                                    <small>Manager </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 3 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                                52%
                                                            </div>
                                                        ),
                                                    },
                                                    ,
                                                    {
                                                        id: 20,
                                                        cases: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 13 </div>
                                                            </div>
                                                        ),
                                                        member: (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    {" "}
                                                                    <img
                                                                        src="./assets/dashboard-data.png"
                                                                        width="40px\"
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <p className="mb-0">
                                                                        <b>Kath</b>
                                                                    </p>
                                                                    <small>Manager </small>
                                                                </div>
                                                            </div>
                                                        ),
                                                        active: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 10 </div>
                                                            </div>
                                                        ),
                                                        closed: (
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <div> 3 </div>
                                                            </div>
                                                        ),
                                                        rate: (
                                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                                52%
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                            ></RdsTable>
                                        </div>
                                    </RdsWidget>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <RdsWidget
                        headerTitle="To do List"
                        isRefreshRequired={true}
                        isCardStretch={true}
                    >
                        <div className="table-responsive">
                            <RdsTable id="sortable"

                                headerDatas={[
                                    {
                                        displayName: "Project",
                                        key: "project",
                                        dataType: "html",
                                    },
                                    { displayName: "Issue", key: "issue", dataType: "html" },

                                    {
                                        displayName: "Progress",
                                        key: "progress",
                                        dataType: "html",
                                    },
                                ]}
                                tableDatas={[
                                    {
                                        id: 1,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Activate your account with others intil June 2023
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small >Website </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <div>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        width={"245px"}
                                                        displayPercentage={false}
                                                        colorVariant={"primary"}
                                                        progressWidth={40}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small >Due in two days</small>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Your Order @22345678 has been confirmed
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>ABP Framework</b>
                                                    </p>
                                                    <small>Modules</small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"danger"}
                                                        progressWidth={20}
                                                        role={"single"}
                                                        width={"245px"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small>Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Create a new page for CMS
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>ASPNET Zero</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Payment Module
                                                    </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"success"}
                                                        progressWidth={80}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div className="custom-desc">
                                                    <div>Payment Module</div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small className="custom-desc">ABP framework</small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"warning"}
                                                        progressWidth={80}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Activate your account with others intil June 2023
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small className="custom-desc">Website </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        displayPercentage={false}
                                                        colorVariant={"primary"}
                                                        progressWidth={40}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                ]}
                            ></RdsTable>
                        </div>
                    </RdsWidget>
                </div>
            </div>
        </div>
    )}
    {props.tenant === "information" && (
        <div>
            <div className="tab-content">
                <form>
                <div className="custom-content-scroll">
                    <div className="row flex-lg-row flex-md-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <RdsInput
                                    reset={inputReset}
                                    inputType="text"
                                    required={true}
                                    name="Name"
                                    label={true}
                                    value={tenantInformationData?.name}
                                    placeholder="Enter Tenant Name"
                                    onChange={(e) => {
                                        handleDataChanges(e.target.value, "name");
                                    }}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <RdsSelectList
                                    id={"saasEditionlist"}
                                    label="Edition"
                                    placeholder="Select Edition"
                                    selectItems={props.editions}
                                    key={`edition-${tenantInformationData?.editions}`}
                                    isSearchable={true}
                                    required={false}
                                    selectedValue={tenantInformationData?.editions}
                                    onChange={(item: any) => {handleDataChanges(item.value,"editions"); }}                                  
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    {!props.isEdit && (<>
                        <div className="my-2">
                            <label className="fw-bold" htmlFor="Admin details">Admin Details</label>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-2 cursor-pointer">
                                <div className="form-group">
                                    <RdsInput
                                        reset={inputReset}
                                        required={true}
                                        inputType="email"
                                        name="Admin Email"
                                        label={true}
                                        placeholder="Enter Email"                                        
                                        value={tenantInformationData?.adminEmailAddress}
                                        id="email"
                                        onChange={(e: any) => {
                                            handleDataChanges(e.target.value, "adminEmailAddress");
                                        }}
                                        validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                        validationMsg="Please Enter Valid Email Address"
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                <RdsInput
                                reset={inputReset}
                                required={true}
                                name="Password"
                                label={true}
                                placeholder="Enter Password"
                                inputType="password"                                
                                id={(errors.adminPassword && tenantInformationData?.adminPassword) ? "passwordfield" : "adminPassword"}
                                onBlur={() => setIsPasswordTouched(true)}
                                value={tenantInformationData?.adminPassword}
                                onChange={(e: any) => handleDataChange(e.target.value, "adminPassword")}
                                dataTestId="password"
                                showIcon={true}
                                />
                               {errors.adminPassword && tenantInformationData?.adminPassword && (
                               <div className="form-control-feedback">
                                 <span className="text-danger">{errors.adminPassword}</span>
                               </div>
                               )}
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-8">
                                <RdsLabel
                                    label="Connection Strings"
                                    required={true}
                                />
                                <div className="form-group mt-2">
                                    <RdsRadioButton
                                            displayType="Horizontal"
                                            label=""
                                            itemList={radioItemList}
                                            onClick={handleConnectionStrings}
                                            onChange={(e: any) => handleDataChanges(e.target.value, "radioItemList")} value={""}                                    ></RdsRadioButton>
                                </div>
                            </div>
                        </div>
                        {radioItemList.length !== 0 && radioItemList[1].checked && (
                            <>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                        <RdsTextArea
                                        label="Database URL"
                                        showTitle={true}
                                        placeholder="Enter URL"
                                        onChange={(e: any) => {
                                           handleDatabaseURL(e.target.value);
                                        }}
                                        rows={2}
                                        value={tenantInformationData?.connectionStrings?.default}
                                        dataTestId="data"
                                        reset={inputReset}
                                        />
                                       {error.databaseURL && (
                                       <div className="form-control-feedback">
                                       <span className="text-danger">{error.databaseURL}</span>
                                       </div>
                                       )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <RdsCheckbox
                                            labelText="Use Module Specific Database Connection String"
                                            checked={tenantInformationData?.isModuleSpecificDb}
                                            onChange={(e) => {
                                                handleDataChanges(e.target.checked, "isModuleSpecificDb");
                                            }}
                                        ></RdsCheckbox>
                                    </div>
                                </div>
                            </>
                        )} </>)}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group text-capitalize mb-3">
                                <RdsSelectList
                                    id={"saasActivelist"}
                                    label="Activation State"
                                    placeholder="Select Activation State"
                                    selectItems={activationStateList}
                                    key={`activationstate-${tenantInformationData?.activationState}`}
                                    selectedValue={tenantInformationData?.activationState}
                                    onChange={(e: any) => handleDataChanges(e.value, "activationState")}
                                    required={true}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 px-4">
                       <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
                            size="small"
                            isDisabled={!isFormValid}
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
    )}
    {props.tenant === "management" && (
        <div className="mt-4" >
            <div className="fw-medium" >
                <RdsLabel label="Form-Based Registration" />
            </div>
            <div className="form-group py-2 fw-medium">
                <RdsCheckbox
                    isDisabled={false}
                    labelText="Allow Tenants To Register To The System."
                    checked={props.allowSelfRegistration}
                    showText={true}
                    isSwitch={false}
                />
                <h6 className="sub-text pt-2">
                    If You Disable This, Tenants Will Only Be Added By Admin Using
                    Tenant Management Page
                </h6>
            </div>
            <div className="form-group py-2 fw-medium">
                <RdsCheckbox
                    isDisabled={false}
                    labelText="New Registered Tenants Are Active By Default."
                    checked={props.isNewRegisteredTenantActiveByDefault}
                    showText={true}
                    isSwitch={false}
                />
                <h6 className="sub-text pt-2">
                    If You Disable This, New Tenants Will Not Be Active (And Can Not
                    Login) Until Admin Manually Activates The Account
                </h6>
            </div>

            <div className="form-group py-2 fw-medium">
                <RdsCheckbox
                    isDisabled={false}
                    labelText="Use Security Image Question (Captcha) On Registration."
                    checked={props.useCaptchaOnRegistration}
                    showText={true}
                    isSwitch={false}
                />
            </div>

            <div className="row py-2">
                <div className="col-md-5">
                    <label >Edition</label>
                    <div className="form-group my-2">
                        <RdsDropdownList
                            borderDropdown={true}
                            placeholder='Select Edition'
                            isPlaceholder={true}
                            listItems={dropdownListItems}
                        />
                    </div>
                </div>
            </div>

        </div>
    )}
    {props.tenant === "register" && (
        <div>
            <div className="text-center">

                <div>
                    <form>
                        <div className="form-group text-start">
                            <RdsInput
                                name="Organization Name"
                                label={true}
                                placeholder="Enter Organization Name"
                                inputType="text"
                                reset={inputReset}
                                required={true}                                
                                value={registerFormData?.name}
                                dataTestId="name"
                                onChange={(e: any) => handleRegisterDataChanges(e.target.value, "name")}
                            />
                        </div>

                        <div className="form-group text-start">
                            <RdsInput
                                name="Email"
                                label={true}
                                placeholder="Enter Email"
                                reset={inputReset}
                                inputType="email"
                                onChange={(e: any) => handleRegisterDataChanges(e.target.value, "adminEmailAddress")}
                                value={registerFormData?.adminEmailAddress}                               
                                required={true}
                                dataTestId="email"
                                validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                validationMsg="Invalid Email Address."  
                            ></RdsInput>
                        </div>

                        <div className="form-group text-start ">
                            <RdsInput
                                required={true}
                                name="Password"
                                label={true}
                                placeholder="Enter Password"
                                reset={inputReset}
                                inputType="password"
                                onChange={(e: any) => handleRegisterDataChanges(e.target.value, "adminPassword")}
                                
                                value={registerFormData?.adminPassword}
                                dataTestId="password"
                                showIcon={true}
                            ></RdsInput>
                        </div>

                        <div className="row text-start">
                            <div className="col-md-6 mt-2">
                                <RdsLabel label="Country" required={true} />
                                <RdsDropdownList
                                    key={countryList.length}
                                    placeholder="Select Country"
                                    isPlaceholder={true}
                                    borderDropdown={true}
                                    listItems={countryList}
                                    id={"countryList"}
                                    onClick={(e: any, val: any) => handleRegisterDataChanges(val, "countryCode")}
                                />
                            </div>
                            <div className="col-md-6">
                                <RdsInput
                                    required={true}
                                    name="Zip Code"
                                    label={true}
                                    reset={inputReset}
                                    placeholder="Enter Zip Code"
                                    inputType="text"
                                    value={registerFormData?.zipCode}
                                    onChange={(e: any) => handleRegisterDataChanges(e.target.value, "zipCode")}
                                ></RdsInput>
                            </div>
                        </div>

                        <div className="pb-4 mt-2 pt-2 text-start">
                            <RdsCheckbox
                                id="id1"
                                labelText="I Accept Terms Of Service"
                                status={CheckboxStatus.Checked}
                                showText
                                checked={isCheckTerms}
                                onChange={(e: any) => setIsCheckTerms(e.target.checked)}
                             
                            />
                        </div>

                        <RdsButton
                            label="Register"
                            colorVariant="primary"
                            showLoadingSpinner={true}
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                            dataTestId="register"
                            onClick={(e: any) => emitRegisterSaveData(e)}
                            isDisabled={!isRegisterFormValid}
                        />
                        <div className="mt-3">
                            <p> Already Have An Account?<span className="ps-2"><a
                                className="link-primary text-decoration-none"
                                href="javascript:void(0)"
                                onClick={() => loginHandler(isLoginClicked)}
                                data-testid="login"
                            >Login
                            </a></span></p>
                        </div>
                    </form>
                    <div className="pt-2">
                        <p className="divider line one-line">Or Connect With</p>
                        <div className="w-100 mt-4 pt-2">
                            <span className="w-20px h-20px border p-2 mx-3 rounded-2">
                                <RdsIcon
                                    name="google"
                                    height="20px"
                                    width="20px"
                                    colorVariant="light"
                                    fill={false}
                                    stroke={true}
                                    tooltip={true}
                                    tooltipTitle={"Connect with Google"}
                                    tooltipPlacement="bottom"
                                    isCursorPointer={true}
                                ></RdsIcon></span>
                            <span className="w-20px h-20px border p-2 mx-3 rounded-2">
                                <RdsIcon
                                    name="microsoft"
                                    height="20px"
                                    width="20px"
                                    colorVariant="light"
                                    fill={false}
                                    stroke={false}
                                    tooltip={true}
                                    tooltipTitle={"Connect with Microsoft"}
                                    tooltipPlacement="bottom"
                                    isCursorPointer={true}
                                ></RdsIcon>
                            </span>
                        </div>
                    </div>
                    {/* <div className="pt-2">
                        <RdsLabel
                            class="text-mute pt-2 secondary "
                            label="©2023 WAi Technologies. All rights reserved "
                            size="0.7rem"
                        ></RdsLabel>
                    </div> */}
                </div>
            </div>
        </div>
    )}
    {props.tenant === "settings" && (
            <div>
                <div className="tab-content py-4">
                    <form>
                        <div className="custom-content-scroll">
                        {props.showEditData && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <RdsCheckbox
                                            labelText="Use Host Database"
                                            dataTestId="host-database"                                        
                                            onChange={(e) => setHostDatabaseChecked(e.target.checked)}
                                            checked={hostDatabaseChecked} 
                                        ></RdsCheckbox>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!hostDatabaseChecked && (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <RdsInput
                                            required={true}
                                            inputType="text"
                                            placeholder="Database Connection String"
                                            name="Database Connection String"
                                            label={true}                                       
                                            id="dcstring"
                                            dataTestId="connection-string"
                                            onChange={(e) => {
                                              handleSettingsDataChanges(e.target.value, "dcstring");
                                            }}
                                            value={formData?.dcstring}
                                            reset={inputReset}
                                        ></RdsInput>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isRandomPasswordChecked && (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <RdsInput
                                            inputType="password"
                                            placeholder="Enter Password"
                                            required={true}
                                            name="Password"
                                            label={true}                                        
                                            id={(err.password && formData?.password)? "passwordfield":"password" }
                                            onBlur={() => setIsPasswordTouched(true)}
                                            onChange={(e) => {
                                              handleSettingsDataChanges(e.target.value, "password");
                                            }}
                                            value={formData?.password}
                                            dataTestId="password"
                                            showIcon= {true}
                                            reset={inputReset}
                                        ></RdsInput>
                                        {err.password && formData?.password &&  <div className="form-control-feedback"><span className="text-danger">{err.password}</span></div>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <RdsInput
                                            inputType="password"
                                            placeholder="Enter Confirm Password"
                                            required={true}
                                            name="Confirm Password"
                                            label={true}                                       
                                            id={(err.cpassword &&  formData?.cpassword)? "passwordfield":"cpassword" }
                                            onFocus={() => setIsConfirmPasswordFocused(true)}
                                            onBlur={() => setIsConfirmPasswordTouched(true)}
                                            onChange={(e) => {
                                             handleSettingsDataChanges(e.target.value, "cpassword");
                                            }}
                                            value={formData?.cpassword}
                                            dataTestId="confirm-password"
                                            showIcon= {true}
                                            reset={inputReset}
                                        ></RdsInput>
                                        {err.cpassword &&  formData?.cpassword && <div className="form-control-feedback"><span className="text-danger">{err.cpassword}</span></div>}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            {props.showEditData && (
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <RdsCheckbox
                                            labelText="Set Random Password"
                                            onChange={(e) =>
                                                setIsRandomPasswordChecked(e.target.checked)
                                            }
                                            checked={isRandomPasswordChecked} 
                                            dataTestId="random-password"
                                        ></RdsCheckbox>
                                    </div>
                                </div>
                            )}
                            {props.showEditData && (
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <RdsCheckbox
                                            labelText="Should Change Password On Next Login"
                                            dataTestId="change-passord-on-next-login"
                                            onChange={(e) => {
                                                handleSettingsDataChanges(e.target.checked, "shouldChangePasswordOnNextLogin");
                                            }}
                                            checked={formData?.shouldChangePasswordOnNextLogin}
                                        ></RdsCheckbox>
                                    </div>
                                </div>
                            )}
                            {props.showEditData && (
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <RdsCheckbox
                                            labelText="Send Activation Password"
                                            dataTestId="send-activation-password"
                                            onChange={(e) => {
                                                handleSettingsDataChanges(e.target.checked, "sendActivationPassword");
                                            }}
                                            checked={formData?.sendActivationPassword}
                                        ></RdsCheckbox>
                                    </div>
                                </div>
                            )}
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <RdsCheckbox labelText="Activate"
                                     dataTestId="activate"
                                     onChange={(e) => {
                                         handleSettingsDataChanges(e.target.checked, "activate");
                                     }}
                                     checked={formData?.activate}
                                     ></RdsCheckbox>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                            <RdsButton
                                tooltipTitle={""}
                                type={"button"}
                                label="Cancel"
                                databsdismiss="offcanvas"
                                isOutline
                                colorVariant="primary"
                                size="small"
                                dataTestId="cancel"
                            ></RdsButton>
                            <RdsButton
                                tooltipTitle={""}
                                type={"button"}
                                label="Save"
                                size="small"
                                colorVariant="primary"
                                class="ms-2"
                                databsdismiss="offcanvas"
                                dataTestId="save"
                                onClick={(e: any) => emitSettingsSaveData(e)}
                                isDisabled={!isSettingsFormValid}
                            ></RdsButton>
                        </div>
                    </form>
                </div>
            </div>
    )}
    </>
  );
};
export default RdsCompEditionList;
