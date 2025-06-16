import { useTranslation } from "react-i18next";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsTextArea } from "../rds-elements";
import React, { useEffect, useState } from "react";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";

export interface RdsCompIdentiyResourceBasicProps {
    identityResourceBasicData?: any;
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
    identity?: string;
    clientData?: any;
    onClientSaveHandler?: (data: any) => void;
    ldapData: any
    onLdapSettingsSubmit?: any
    onLdapSaveHandler?: (data: any) => void;
    onIdentitySettingsSubmit: any;
    lockoutSettings: any;
    passwordSettings: any;
    onManagementSaveHandler?: (data: any) => void;
    signSettings: any;
    userSettings: any;
    oauthData: any;
    onOauthDataSubmit?: any;
}

const RdsCompIdentiyResourceBasic = (props: RdsCompIdentiyResourceBasicProps) => {
    const [identityBasicData, setIdentityBasicData] = useState(props.identityResourceBasicData);
    const [inputReset, setInputReset] = useState(false);
    const [clientData, setClientData] = useState<any>(props.clientData);
    const [ldap, setLdap] = useState(props.ldapData);
    const [lockoutSettings, setLockoutSettings] = useState(props.lockoutSettings);
    const [passwordSettings, setPasswordSettings] = useState(props.passwordSettings);
    const [signSettings, setSignSettings] = useState(props.signSettings);
    const [userSettings, setUserSettings] = useState(props.userSettings);
    const [oauth, setOauth] = useState(props.oauthData);

    useEffect(() => {
        setIdentityBasicData(props.identityResourceBasicData);
    }, [props.identityResourceBasicData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChange = (value: any, key: string) => {
        setIdentityBasicData({ ...identityBasicData, [key]: value });
    };

    useEffect(() => {
        setClientData(props.clientData);
    }, [props.clientData]);
    
    const handleDataChanges = (value: any, key: string) => {
        setClientData({ ...clientData, [key]: value });
    };

    useEffect(() => {
        setLdap(props.ldapData);
    }, [props.ldapData]);
    
    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);
    
    const handleChangeform = (value: any, key: any) => {
        setLdap({ ...ldap, [key]: value });
    }

    useEffect(() => {
            setLockoutSettings(props.lockoutSettings);
            setPasswordSettings(props.passwordSettings);
            setSignSettings(props.signSettings);
            setUserSettings(props.userSettings);
        }, [props]);
        const handlePasswordChange = (value: any, key: any) => {
            setPasswordSettings({ ...passwordSettings, [key]: value });
        }
        function emitManagementSaveData(event: any) {
            event.preventDefault();
          props.onManagementSaveHandler && props.onManagementSaveHandler({ lockout: lockoutSettings, user: userSettings, signIn: signSettings, password: passwordSettings });
          setPasswordSettings({
                requiredLength: "",
                requiredUniqueChars: "",
                requireNonAlphanumeric: false,
                requireUppercase: false,
                requireLowercase: false,
                requireDigit: false,
                forceUsersToPeriodicallyChangePassword: false,
                passwordChangePeriodDays: "",
                allowedForNewUsers: false,
                lockoutDuration: "",
                maxFailedAccessAttempts: "",
                requireConfirmedEmail: false,
                enablePhoneNumberConfirmation: false,
                requireConfirmedPhoneNumber: false,
                isEmailUpdateEnabled: false,
                isUserNameUpdateEnabled: false
            });
        }

        useEffect(() => {
                setOauth(props.oauthData);
            }, [props.oauthData]);
        
            useEffect(() => {
                setInputReset(!inputReset);
            }, [props.reset]);
        
            const handleOauthChangeform = (value: any, key: any) => {
                setOauth({ ...oauth, [key]: value });
            }
            
            function emitOauthSaveData(event: any) {
                event.preventDefault();
                props.onOauthDataSubmit && props.onOauthDataSubmit(oauth);
                setInputReset(!inputReset);
                setOauth({
                    enableOAuthLogin: false,
                    clientId: "",
                    clientSecret: "",
                    authority: "",
                    scope: "",
                    requireHttpsMetadata: false,
                    validateEndpoints: false,
                    validateIssuerName: false
                });
            }
            const isClientIdValid = (clientId: any) => {
                if (!clientId || clientId.length === 0) {
                    return false;
                }
                return true;
            };
            const isAuthorityValid = (authority: any) => {
                if (!authority || authority.length === 0) {
                    return false;
                }
                return true;
            };
        const isOauthFormValid=isClientIdValid(oauth?.clientId) && isAuthorityValid(oauth?.authority) ;

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(identityBasicData);
        setInputReset(!inputReset);
        setIdentityBasicData({
            name: "",
            displayName: "",
            description: "",
            enabled: false,
            required: false,
            emphasize: false,
            showInDiscovery: false,
        });
    }
    function emitClientSaveData(event: any) {
    event.preventDefault();
    props.onClientSaveHandler && props.onClientSaveHandler(clientData);
    setClientData({
      clientId: "",
      clientName: "",
      description: "",
      clientUrl: "",
      logoUrl: "",
      callbackUrl: "",
      logoutUrl: "",
    });
  }
  
  function emitLdapSaveData(event: any) {
    event.preventDefault();
    if (props.onLdapSaveHandler) {
        props.onLdapSaveHandler(ldap);
    }
    setLdap({
        enableLdapLogin: false,
        ldapServerHost: "",
        ldapServerPort: "",
        ldapBaseDc: "",
        ldapDomain: "",
        ldapUserName: "",
        ldapPassword: ""
    });
    setInputReset(prev => !prev);
}

  const isClientUrlValid = (clientUrl: any) => {
  if(!clientUrl || clientUrl.length === 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(clientUrl)){
    return false;
  }
  return true;
  }
  const isLogoUrlValid = (logoUrl: any) => {
  if(!logoUrl || logoUrl.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(logoUrl)){
    return false;
  }
  return true;
  }
  const isCallBackUrlValid = (callbackUrl: any) => {
  if(!callbackUrl || callbackUrl.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(callbackUrl)){
    return false;
  }
  return true;
  }
  const isLogoutUrlValid = (logoutUrl: any) => {
  if(!logoutUrl || logoutUrl.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(logoutUrl)){
    return false;
  }
  return true;
  }
const isClientFormValid = isClientUrlValid(clientData?.clientUrl) && isLogoUrlValid(clientData?.logoUrl) && isCallBackUrlValid(clientData?.callbackUrl) && isLogoutUrlValid(clientData?.logoutUrl);
  
    const isNameValid = (name: any) => {
        if (!name || name.length === 0) {
            return false;
        }
        return true;
    };
    const isFormValid=isNameValid(identityBasicData?.name);
    return (
        <>
        {props.identity === "resourceBasic" && (
            <div>
                <form>
                    <div className="custom-content-scroll">
                        <div className="row">
                            <div className="col-6">
                                <RdsInput
                                    required={true}
                                    name="Name"
                                    label={true}
                                    placeholder="Enter name"
                                    inputType="text"
                                    value={identityBasicData?.name}                                    
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "name");
                                    }}
                                    dataTestId="name"
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                            <div className="col-6">
                                <RdsInput
                                    name="Display name"
                                    label={true}
                                    placeholder="Enter display name"
                                    inputType="text"
                                    required={false}
                                    value={identityBasicData?.displayName}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "displayName");
                                    }}                                   
                                    dataTestId="display-name"
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row">
                            <RdsTextArea
                                label="Description"
                                showTitle={true}
                                placeholder="Description"
                                value={identityBasicData?.description}
                                onChange={(e) => {
                                    handleDataChange(e.target.value, "description");
                                }}
                                dataTestId="description"
                            />
                        </div>
                        <div className="row mt-3 mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Enabled"
                                checked={identityBasicData?.enabled}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "enabled");
                                }}
                                dataTestId="enabled"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Required"
                                checked={identityBasicData?.required}
                                onChange={(e:any) => {
                                    handleDataChange(e.target.checked, "required");
                                }}
                                dataTestId="required"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Emphasize"
                                checked={identityBasicData?.emphasize}
                                onChange={(e:any) => {
                                    handleDataChange(e.target.checked, "emphasize");
                                }}
                                dataTestId="emphasize"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Show in Discovery Document"
                                checked={identityBasicData?.showInDiscovery}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "showInDiscovery");
                                }}
                                dataTestId="discovery-document"
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
                            size="small"
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            dataTestId="save"
                            onClick={(e: any) => emitSaveData(e)}
                            isDisabled={!isFormValid}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        )}
        {props.identity === "clientBasic" && (
              <form className="p-2 mt-1">
                <div className="custom-content-scroll">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <RdsInput
                        placeholder="Enter Client ID"
                        inputType="text"
                        name="Client ID"
                        label={true}              
                        required={false}
                        dataTestId="client-id"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "clientId");
                        }}
                        value={clientData?.clientId}
                      ></RdsInput>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <RdsInput
                        placeholder="Enter Client Name"
                        inputType="text"
                        name="Client Name"
                        label={true}               
                        required={false}
                        dataTestId="client-name"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "clientName");
                        }}
                        value={clientData?.clientName}
                      ></RdsInput>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-2">
                      <RdsTextArea
                        label="Description"
                        showTitle={true}
                        placeholder="Enter Description"
                        rows={4}
                        dataTestId="description"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "description");
                        }}
                        value={clientData?.description}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <RdsInput
                        placeholder="Enter Client URL"
                        inputType="text"
                        name="Client URL"
                        label={true  }              
                        required={true}
                        dataTestId="client-url"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "clientUrl");
                        }}
                        value={clientData?.clientUrl}
                        validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}    
                        validationMsg="Please Enter valid url (https or http)"
                      ></RdsInput>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div>
                        <RdsInput
                          placeholder="Enter Logo URL"
                          inputType="text"
                          name="Logo URL"
                          label={true}                  
                          required={true}
                          dataTestId="logo-url"
                          onChange={(e) => {
                            handleDataChanges(e.target.value, "logoUrl");
                          }}
                          value={clientData?.logoUrl}
                          validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                          validationMsg="Please Enter valid url (https or http)"
                        ></RdsInput>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <RdsInput
                        placeholder="Enter CallBack URL"
                        inputType="text"
                        name="CallBack URL"
                        label={true}                
                        required={true}
                        dataTestId="callback-url"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "callbackUrl");
                        }}
                        value={clientData?.callbackUrl}
                        validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                        validationMsg="Please Enter valid url (https or http)"
                      ></RdsInput>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <RdsInput
                        placeholder="Enter Logout URL"
                        inputType="text"
                        name="Logout URL"
                        label={true}                
                        required={true}
                        dataTestId="logout-url"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "logoutUrl");
                        }}
                        value={clientData?.logoutUrl}
                        validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                        validationMsg="Please Enter valid url (https or http)"
                      ></RdsInput>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <RdsCheckbox
                      labelText="Required Consent"
                      dataTestId="consent"
                      onChange={(e: any) => {
                        handleDataChanges(e.target.checked, "requiredConsent");
                      }}
                      checked={clientData?.requiredConsent}
                    ></RdsCheckbox>
                  </div>
                </div>
                <div className="d-flex flex-column-reverse ps-4 ms-2 pe-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 pb-3">
                  <RdsButton
                    class="me-2"
                    tooltipTitle={""}
                    type={"button"}
                    label="Cancel"
                    colorVariant="outline-primary"
                    size="small"
                    databsdismiss="offcanvas"
                    dataTestId="cancel"
                  ></RdsButton>
                  <RdsButton
                    class="me-2"
                    label="Save"
                    size="small"
                    colorVariant="primary"
                    tooltipTitle={""}
                    type={"submit"}
                    onClick={(e: any) => emitClientSaveData(e)}
                    databsdismiss="offcanvas"
                    isDisabled={!isClientFormValid}
                  ></RdsButton>
                   
                </div>
              </form>
        )}
        {props.identity === "ldapManagement" && (
                <div className="pt-2">
                    <form>
                      <div className="custom-content-scroll">
                        <div className="mb-3 fw-medium">
                            <RdsLabel label="Ldap Login Settings"></RdsLabel>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <RdsCheckbox
                                labelText="Enable Ldap Login"
                                onChange={(e: any) => { handleChangeform(e.target.checked, "enableLdapLogin"); }}
                                checked={ldap?.enableLdapLogin}
                                dataTestId="use-default-credential"
                            ></RdsCheckbox>
                        </div>
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <div className="form-group">
                                    <RdsInput
                                        value={ldap?.ldapServerHost}                                
                                        name="Server Host"
                                        label={true}
                                        placeholder="Enter Server Host"
                                        customClasses="form-control"
                                        onChange={(e: any) => handleChangeform(e.target.value, "ldapServerHost")}
                                        dataTestId="server-host"
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <RdsInput
                                    placeholder="389"
                                    customClasses="form-control"
                                    inputType="text"
                                    name="Server Port"
                                    label={true}                            
                                    value={ldap?.ldapServerPort}
                                    onChange={(e: any) => handleChangeform(e.target.value, "ldapServerPort")}
                                    dataTestId="server-port"
                                ></RdsInput>
        
                            </div>
                            <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                        </div>
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <div className="form-group">
                                    <RdsInput
                                        value={ldap?.ldapBaseDc}                               
                                        name="Base Dc"
                                        label={true}
                                        placeholder="Enter Base Domain Component"
                                        customClasses="form-control"
                                        onChange={(e: any) => handleChangeform(e.target.value, "ldapBaseDc")}
                                        dataTestId="base-domain"
                                    ></RdsInput>
        
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <RdsInput
                                    placeholder="Enter Domain"
                                    customClasses="form-control"
                                    inputType="text"
                                    name="Domain"
                                    label={true}                            
                                    value={ldap?.ldapDomain}
                                    onChange={(e: any) => handleChangeform(e.target.value, "ldapDomain")}
                                    dataTestId="domain"
                                ></RdsInput>
                            </div>
                            <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                        </div>
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <div className="form-group">
                                    <RdsInput
                                        value={ldap?.ldapUserName}                                
                                        name="Username"
                                        label={true}
                                        placeholder="Enter Username"
                                        customClasses="form-control"
                                        onChange={(e: any) => handleChangeform(e.target.value, "ldapUserName")}
                                        dataTestId="username"
                                    ></RdsInput>
        
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <RdsInput
                                    value={ldap?.ldapPassword}                            
                                    name="Password"
                                    label={true}
                                    placeholder="Enter Password"
                                    inputType="password"
                                    customClasses="form-control"
                                    onChange={(e: any) => handleChangeform(e.target.value, "ldapPassword")}
                                    dataTestId="password"
                                    showIcon= {false}
                                ></RdsInput>
                            </div>
                            <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                        </div>
                      </div>
                      <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                            <RdsButton
                                label="Save"
                                type="submit"
                                colorVariant="primary"
                                size="small"
                                dataTestId="save"
                                onClick={(e: any) => emitLdapSaveData(e)}
                            ></RdsButton>
                        </div>
        
                    </form>
                </div>
        )}
        {props.identity === "management" && (
                <div className="pt-3">
                    <div className="overflow-x-hidden overflow-y-auto">
                        <form>
                        <div className="custom-content-scroll">
                            {/* Password Settings */}
                            <div className="mb-3 fw-medium">
                                <RdsLabel label="Password Settings"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                    <div className="form-group">
                                        <RdsInput
                                            size={InputSize.Medium}   
                                            inputType="text"
                                            isDisabled={false}
                                            name="Required Length"
                                            label={true}
                                            fontWeight={"normal"}
                                            readonly={false}
                                            placeholder="Enter Length"
                                            value={passwordSettings?.requiredLength}
                                            onChange={(e: any) => {
                                                handlePasswordChange(e.target.value, "requiredLength");
                                            }}
                                            dataTestId="required-length"
                                        ></RdsInput>
                                        {/* <small className="text-secondary-50">Required Length</small> */}
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 ">
                                    <div className="form-group">
                                        <RdsInput
                                             size={InputSize.Medium}  
                                            inputType="text"
                                            isDisabled={false}
                                            readonly={false}
                                            name="Required Unique Chars"
                                            label={true}
                                            fontWeight={"normal"}
                                            placeholder="Enter Number"
                                            value={passwordSettings?.requiredUniqueChars}
                                            onChange={(e: any) => handlePasswordChange(e.target.value, "requiredUniqueChars")}
                                            dataTestId="required-special-char"
                                        ></RdsInput>
                                        {/* <small className="text-secondary-50">Required Unique Chars</small> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Require NonAlphanumeric"
                                        checked={passwordSettings?.requireNonAlphanumeric}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "requireNonAlphanumeric")}
                                        dataTestId="required-non-alpha-num-char"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Require NonAlphanumeric</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Require Uppercase"
                                        checked={passwordSettings?.requireUppercase}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "requireUppercase")}
                                        dataTestId="required-upper-case"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Require Uppercase</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Require Lowercase"
                                        checked={passwordSettings?.requireLowercase}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "requireLowercase")}
                                        dataTestId="required-lower-case"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Require Lowercase</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Require Digit"
                                        checked={passwordSettings?.requireDigit}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "requireDigit")}
                                        dataTestId="required-numbers"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Require Digit</small> */}
                                </div>
                            </div>
                            {/*Password renewing settings */}
                            <div className="mb-3 fw-medium">
                                <RdsLabel label="Password Renewing Settings"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Force Users To Periodically Change Password"
                                        checked={passwordSettings?.forceUsersToPeriodicallyChangePassword}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "forceUsersToPeriodicallyChangePassword")}
                                        dataTestId="enable-new-user"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Force Users To Periodically ChangePassword</small> */}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                    <div className="form-group">
                                        <RdsInput
                                             size={InputSize.Medium} 
                                            inputType="text"
                                            isDisabled={false}
                                            name="Password Change PeriodDays"
                                            label={true}
                                            fontWeight={"normal"}
                                            readonly={false}
                                            placeholder="Enter Length"
                                            value={passwordSettings?.passwordChangePeriodDays}
                                            onChange={(e: any) => {
                                                handlePasswordChange(e.target.value, "passwordChangePeriodDays");
                                            }}
                                            dataTestId="password-change-period-days"
                                        ></RdsInput>
                                        {/* <small className="text-secondary-50">Password Change Period Days</small> */}
                                    </div>
                                </div>
                            </div>
                            {/* Lockout Settings */}
                            <div className="mb-3 fw-medium">
                                <RdsLabel label="Lockout Settings"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Allowed For New Users"
                                        checked={passwordSettings?.allowedForNewUsers}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "allowedForNewUsers")}
                                        dataTestId="enable-new-user"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Allowed For New Users</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                    <div className="form-group ">
                                        <RdsInput
                                            fontWeight={"normal"}
                                            size={InputSize.Medium}
                                            inputType="number"
                                            isDisabled={false}
                                            readonly={false}
                                            name="Lockout Duration"
                                            label={true}
                                            placeholder="Enter Length"
                                            value={passwordSettings?.lockoutDuration}
                                            onChange={(e: any) => handlePasswordChange(e.target.value, "lockoutDuration")}
                                            dataTestId="lockout-duration"
                                        ></RdsInput>
                                        {/* <small className="text-secondary-50">Allowed For New Users</small> */}
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                    <div className="form-group">
                                        <RdsInput
                                            fontWeight={"normal"}
                                            size={InputSize.Medium}  
                                            inputType="text"
                                            isDisabled={false}
                                            name="Max Failed Access Attempts"
                                            label={true}
                                            readonly={false}
                                            placeholder="Enter Name"
                                            value={passwordSettings?.maxFailedAccessAttempts}
                                            onChange={(e: any) => handlePasswordChange(e.target.value, "maxFailedAccessAttempts")}
                                            dataTestId="max-failed-attempts"
                                        ></RdsInput>
                                        {/* <small className="text-secondary-50">Max Failed Access Attempts</small> */}
                                    </div>
                                </div>
                            </div>
        
                            {/* Signin Settings */}
                            <div className=" mb-3 fw-medium">
                                <RdsLabel label="SignInSettings"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Require Confirmed Email"
                                        checked={passwordSettings?.requireConfirmedEmail}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "requireConfirmedEmail")}
                                        dataTestId="required-confirmed-email"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Require Confirmed Email</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Enable Phone Number Confirmation"
                                        checked={passwordSettings?.enablePhoneNumberConfirmation}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "enablePhoneNumberConfirmation")}
                                        dataTestId="allow-user-conf-phone"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Enable Phone Number Confirmation</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Require Confirmed Phone Number"
                                        checked={passwordSettings?.requireConfirmedPhoneNumber}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "requireConfirmedPhoneNumber")}
                                        dataTestId="required-conf-phone"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Require Confirmed Phone Number</small> */}
                                </div>
                            </div>
                            {/* User Settings */}
                            <div className="mb-3 fw-medium">
                                <RdsLabel label="UserSettings"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Is Email Update Enabled"
                                        checked={passwordSettings?.isEmailUpdateEnabled}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "isEmailUpdateEnabled")}
                                        dataTestId="allow-user-change-email"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Is Email Update Enabled</small> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        labelText="Is User Name Update Enabled"
                                        checked={passwordSettings?.isUserNameUpdateEnabled}
                                        onChange={(e: any) => handlePasswordChange(e.target.checked, "isUserNameUpdateEnabled")}
                                        dataTestId="allow-user-change-username"
                                    ></RdsCheckbox>
                                    {/* <small className="text-secondary-50">Enable Phone Number Confirmation</small> */}
                                </div>
                            </div>
                            </div>
                            <div  className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                        <RdsButton
                            label="Save"
                            type="submit"
                            colorVariant="primary"
                            size="small"
                            dataTestId="save"
                            onClick={(e: any) => emitManagementSaveData(e)}
                            //onClick={() => { props.onIdentitySettingsSubmit({ lockout: lockoutSettings, user: userSettings, signIn: signSettings, password: passwordSettings }); }}
                        ></RdsButton>
                          </div>
                        </form>
                    </div>
                </div>  
        )}
        {props.identity === "oauthManagement" && (
                <div className="pt-3">
                    <form>
                        <div className="custom-content-scroll">
                        <div className="mb-3 fw-medium">
                            <RdsLabel label="OAuth Login Settings"></RdsLabel>
                        </div>
        
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <RdsCheckbox
                                labelText="Enable OAuth Login"
                                onChange={(e: any) => { handleOauthChangeform(e.target.checked, "enableOAuthLogin"); }}
                                checked={oauth?.enableOAuthLogin}
                                dataTestId="use-default-credential"
                            ></RdsCheckbox>
                        </div>
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <div className="form-group">
                                    <RdsInput
                                        value={oauth?.clientId}                               
                                        required={true}
                                        name="Client Id"
                                        label={true}
                                        placeholder="Enter Client Id"
                                        customClasses="form-control"
                                        onChange={(e: any) => handleOauthChangeform(e.target.value, "clientId")}
                                        dataTestId="client-id"
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <RdsInput
                                    placeholder="389"
                                    customClasses="form-control"
                                    inputType="text"
                                    name="Client Secret"
                                    label={true}
                                    value={oauth?.clientSecret}
                                    onChange={(e: any) => handleOauthChangeform(e.target.value, "clientSecret")}
                                    dataTestId="client-secret"
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <div className="form-group">
                                    <RdsInput
                                        value={oauth?.authority}                                
                                        required={true}
                                        name="Authority"
                                        label={true}
                                        placeholder="Enter Base Domain Component"
                                        customClasses="form-control"
                                        onChange={(e: any) => handleOauthChangeform(e.target.value, "authority")}
                                        dataTestId="base-domain"
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                                <RdsInput
                                    placeholder="Scope"
                                    customClasses="form-control"
                                    inputType="text"
                                    name="Enter Scope"
                                    label={true}                            
                                    value={oauth?.scope}
                                    onChange={(e: any) => handleOauthChangeform(e.target.value, "scope")}
                                    dataTestId="scope"
                                ></RdsInput>
                            </div>
                            <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    labelText="Require Https Metadata"
                                    checked={oauth?.requireHttpsMetadata}
                                    onChange={(e: any) => handleOauthChangeform(e.target.checked, "requireHttpsMetadata")}
                                    dataTestId="requireHttpsMetadata"
                                ></RdsCheckbox>
                            </div>
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    labelText="Validate End points"
                                    checked={oauth?.validateEndpoints}
                                    onChange={(e: any) => handleOauthChangeform(e.target.checked, "validateEndpoints")}
                                    dataTestId="validateEndpoints"
                                ></RdsCheckbox>
                            </div>
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    labelText="Validate Issuer Name"
                                    checked={oauth?.validateIssuerName}
                                    onChange={(e: any) => handleOauthChangeform(e.target.checked, "validateIssuerName")}
                                    dataTestId="validateIssuerName"
                                ></RdsCheckbox>
                            </div>
                        </div>
                        </div>
                        <div  className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                            <RdsButton
                                label="Save"
                                type="submit"
                                colorVariant="primary"
                                size="small"
                                dataTestId="save"
                                onClick={(e: any) => emitOauthSaveData(e)}
                                isDisabled={!isOauthFormValid}
                            ></RdsButton>
                        </div>
                    </form>
                </div>
        )}
        </>
    );
};

export default RdsCompIdentiyResourceBasic;
