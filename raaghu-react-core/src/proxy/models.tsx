export interface ApplicationAuthConfigurationDto {
  grantedPolicies: Record<string, boolean>
}
 
export interface ApplicationConfigurationDto {
  localization: ApplicationLocalizationConfigurationDto
  auth: ApplicationAuthConfigurationDto
  setting: ApplicationSettingConfigurationDto
  currentUser: CurrentUserDto
  features: ApplicationFeatureConfigurationDto
  globalFeatures: ApplicationGlobalFeatureConfigurationDto
  multiTenancy: MultiTenancyInfoDto
  currentTenant: CurrentTenantDto
  timing: TimingDto
  clock: ClockDto
  objectExtensions: ObjectExtensionsDto
  extraProperties: Record<string, object>
}
 
export interface ApplicationImplicitCodeRequestOptions{
  client_id?: any,
  redirect_uri?: any,
  response_type?: any,
  scope?:any,
  state?:any,
  nonce?:any
}
 
export interface ApplicationConnectTokenRequestOptions {
  url?: any
  username?: any
  password?: any
  scope?: any
  grant_type?: any
  client_id?: any
  code?:any
  redirect_uri?:any
  code_verifier?:any
  client_secret?:any
}
 
export interface ApplicationAuthorizationCodeRequestOptions {
  response_type:any,
  client_id: any,
  redirect_uri:any,
  code_challenge: any,
  code_challenge_method: any,
  scope:any,
  state:any,
  nonce:any,
  ReturnUrl:any
}
export interface ApplicationhybridCodeRequestOptions {
  response_type:any,
  client_id: any,
  redirect_uri:any,
  scope:any,
  state:any,
  nonce:any,
}
 
export interface userImpersonationConnectTokenRequestOptions {
  scope: any
  grant_type: any
  client_id: any
  UserId: any
  access_token: any
}
export interface userImpersonationConnectTokenDto {
  scope: any
  grant_type: any
  client_id: any
  UserId: any
}
export interface TenantImpersonationConnectTokenRequestOptions {
  scope: any
  grant_type: any
  client_id: any
  TenantId: any
  access_token: any
}
export interface TenantImpersonationConnectTokenDto {
  scope: any
  grant_type: any
  client_id: any
  TenantId:any
}
export interface AuthorityDelegateConnectTokenRequestOptions{
  scope: any
  grant_type: any
  client_id: any
  access_token: any
  UserDelegationId:any
}
export interface AuthorityDelegateConnectTokenDto {
  scope: any
  grant_type: any
  client_id: any
  UserDelegationId:any
}


export interface LinkLoginConnectTokenRequestOptions {
  grant_type: any
  scope: any  
  client_id: any
  access_token: any
  LinkUserId?: any
}
export interface RefreshTokenRequestOptions {
  grant_type: string
  refresh_token: string
  client_id: string
}
 
export interface RefreshTokenResponseDTO {
  access_token: string
  refresh_token: string
}
export interface ApplicationConnectTokenDTO {
  access_token: string
  token_type: string
  expires_in: any
  includeLocalizationResources: boolean
  language: string
  api_url: string,
}
export interface ApplicationConfigurationRequestOptions {
  language: string
  includeLocalizationResources: boolean
}
 
export interface UserImpersonationApplicationConfigurationRequestOptions {
  access_token: string
  includeLocalizationResources: boolean
}
 
export interface ActionApiDescriptionModel {
  uniqueName?: string
  name?: string
  httpMethod?: string
  url?: string
  supportedVersions: string[]
  parametersOnMethod: MethodParameterApiDescriptionModel[]
  parameters: ParameterApiDescriptionModel[]
  returnValue: ReturnValueApiDescriptionModel
  allowAnonymous?: boolean
  implementFrom?: string
}
 
export interface ApplicationApiDescriptionModel {
  modules: Record<string, ModuleApiDescriptionModel>
  types: Record<string, TypeApiDescriptionModel>
}
 
export interface ApplicationApiDescriptionModelRequestDto {
  api_url: string
 
  includeTypes: boolean
}
 
export interface ControllerApiDescriptionModel {
  controllerName?: string
  controllerGroupName?: string
  isRemoteService: boolean
  isIntegrationService: boolean
  apiVersion?: string
  type?: string
  interfaces: ControllerInterfaceApiDescriptionModel[]
  actions: Record<string, ActionApiDescriptionModel>
}
 
export interface ControllerInterfaceApiDescriptionModel {
  type?: string
  name?: string
  methods: InterfaceMethodApiDescriptionModel[]
}
 
export interface InterfaceMethodApiDescriptionModel {
  name?: string
  parametersOnMethod: MethodParameterApiDescriptionModel[]
  returnValue: ReturnValueApiDescriptionModel
}
 
export interface MethodParameterApiDescriptionModel {
  name?: string
  typeAsString?: string
  type?: string
  typeSimple?: string
  isOptional: boolean
  defaultValue: object
}
 
export interface ModuleApiDescriptionModel {
  rootPath?: string
  remoteServiceName?: string
  controllers: Record<string, ControllerApiDescriptionModel>
}
 
export interface ParameterApiDescriptionModel {
  nameOnMethod?: string
  name?: string
  jsonName?: string
  type?: string
  typeSimple?: string
  isOptional: boolean
  defaultValue: object
  constraintTypes: string[]
  bindingSourceId?: string
  descriptorName?: string
}
 
export interface PropertyApiDescriptionModel {
  name?: string
  jsonName?: string
  type?: string
  typeSimple?: string
  isRequired: boolean
  minLength?: number
  maxLength?: number
  minimum?: string
  maximum?: string
  regex?: string
}
 
export interface ReturnValueApiDescriptionModel {
  type?: string
  typeSimple?: string
}
 
export interface TypeApiDescriptionModel {
  baseType?: string
  isEnum: boolean
  enumNames: string[]
  enumValues: object[]
  genericArguments: string[]
  properties: PropertyApiDescriptionModel[]
}
export interface FindTenantResultDto {
  success: boolean
  tenantId?: string
  name?: string
  isActive: boolean
}
export interface Session {
  language: string
  tenant: CurrentTenantDto | null
}
 
export interface CurrentTenantDto {
  id?: string
  name?: string
  isAvailable: boolean
}
export interface MultiTenancyRequestOptions {
  name: string
}
 
export interface MultiTenancyInfoDto {
  isEnabled: boolean
}
 
export interface NameValue<T = string> {
  name?: string
  value: T
}
 
export interface ActionApiDescriptionModel {
  uniqueName?: string
  name?: string
  httpMethod?: string
  url?: string
  supportedVersions: string[]
  parametersOnMethod: MethodParameterApiDescriptionModel[]
  parameters: ParameterApiDescriptionModel[]
  returnValue: ReturnValueApiDescriptionModel
  allowAnonymous?: boolean
  implementFrom?: string
}
 
export interface ApplicationApiDescriptionModel {
  modules: Record<string, ModuleApiDescriptionModel>
  types: Record<string, TypeApiDescriptionModel>
}
 
export interface ApplicationApiDescriptionModelRequestDto {
  api_url: string
 
  includeTypes: boolean
}
 
export interface ControllerApiDescriptionModel {
  controllerName?: string
  controllerGroupName?: string
  isRemoteService: boolean
  isIntegrationService: boolean
  apiVersion?: string
  type?: string
  interfaces: ControllerInterfaceApiDescriptionModel[]
  actions: Record<string, ActionApiDescriptionModel>
}
 
export interface ControllerInterfaceApiDescriptionModel {
  type?: string
  name?: string
  methods: InterfaceMethodApiDescriptionModel[]
}
 
export interface InterfaceMethodApiDescriptionModel {
  name?: string
  parametersOnMethod: MethodParameterApiDescriptionModel[]
  returnValue: ReturnValueApiDescriptionModel
}
 
export interface MethodParameterApiDescriptionModel {
  name?: string
  typeAsString?: string
  type?: string
  typeSimple?: string
  isOptional: boolean
  defaultValue: object
}
 
export interface ModuleApiDescriptionModel {
  rootPath?: string
  remoteServiceName?: string
  controllers: Record<string, ControllerApiDescriptionModel>
}
 
export interface ParameterApiDescriptionModel {
  nameOnMethod?: string
  name?: string
  jsonName?: string
  type?: string
  typeSimple?: string
  isOptional: boolean
  defaultValue: object
  constraintTypes: string[]
  bindingSourceId?: string
  descriptorName?: string
}
 
export interface PropertyApiDescriptionModel {
  name?: string
  jsonName?: string
  type?: string
  typeSimple?: string
  isRequired: boolean
  minLength?: number
  maxLength?: number
  minimum?: string
  maximum?: string
  regex?: string
}
 
export interface ReturnValueApiDescriptionModel {
  type?: string
  typeSimple?: string
}
 
export interface TypeApiDescriptionModel {
  baseType?: string
  isEnum: boolean
  enumNames: string[]
  enumValues: object[]
  genericArguments: string[]
  properties: PropertyApiDescriptionModel[]
}
 
export interface ApplicationFeatureConfigurationDto {
  values: Record<string, string>
}
 
export interface ApplicationGlobalFeatureConfigurationDto {
  enabledFeatures: string[]
}
 
export interface ApplicationLocalizationConfigurationDto {
  values: Record<string, Record<string, string>>
  resources: Record<string, ApplicationLocalizationResourceDto>
  languages: LanguageInfo[]
  currentCulture: CurrentCultureDto
  defaultResourceName?: string
  languagesMap: Record<string, NameValue[]>
  languageFilesMap: Record<string, NameValue[]>
}
 
export interface ApplicationLocalizationDto {
  resources: Record<string, ApplicationLocalizationResourceDto>
}
 
export interface ApplicationLocalizationRequestDto {
  cultureName: string,
  onlyDynamics: boolean
}
 
export interface ApplicationLocalizationResourceDto {
  texts: Record<string, string>
  baseResources: string[]
}
 
export interface ApplicationSettingConfigurationDto {
  values: Record<string, string>
}
 
export interface ClockDto {
  kind?: string
}
 
export interface CurrentCultureDto {
  displayName?: string
  englishName?: string
  threeLetterIsoLanguageName?: string
  twoLetterIsoLanguageName?: string
  isRightToLeft: boolean
  cultureName?: string
  name?: string
  nativeName?: string
  dateTimeFormat: DateTimeFormatDto
}
 
export interface CurrentUserDto {
  isAuthenticated: boolean
  id?: string
  tenantId?: string
  impersonatorUserId?: string
  impersonatorTenantId?: string
  impersonatorUserName?: string
  impersonatorTenantName?: string
  userName?: string
  name?: string
  surName?: string
  email?: string
  emailVerified: boolean
  phoneNumber?: string
  phoneNumberVerified: boolean
  roles: string[]
}
 
export interface DateTimeFormatDto {
  calendarAlgorithmType?: string
  dateTimeFormatLong?: string
  shortDatePattern?: string
  fullDateTimePattern?: string
  dateSeparator?: string
  shortTimePattern?: string
  longTimePattern?: string
}
 
export interface IanaTimeZone {
  timeZoneName?: string
}
 
export interface TimeZone {
  iana: IanaTimeZone
  windows: WindowsTimeZone
}
 
export interface TimingDto {
  timeZone: TimeZone
}
 
export interface WindowsTimeZone {
  timeZoneId?: string
}
 
export interface LanguageInfo {
  cultureName?: string
  uiCultureName?: string
  displayName?: string
  twoLetterISOLanguageName?: string
  flagIcon?: string
}
 
export interface EntityExtensionDto {
  properties: Record<string, ExtensionPropertyDto>
  configuration: Record<string, object>
}
 
export interface ExtensionEnumDto {
  fields: ExtensionEnumFieldDto[]
  localizationResource?: string
}
 
export interface ExtensionEnumFieldDto {
  name?: string
  value: object
}
 
export interface ExtensionPropertyApiCreateDto {
  isAvailable: boolean
}
 
export interface ExtensionPropertyApiDto {
  onGet: ExtensionPropertyApiGetDto
  onCreate: ExtensionPropertyApiCreateDto
  onUpdate: ExtensionPropertyApiUpdateDto
}
 
export interface ExtensionPropertyApiGetDto {
  isAvailable: boolean
}
 
export interface ExtensionPropertyApiUpdateDto {
  isAvailable: boolean
}
 
export interface ExtensionPropertyAttributeDto {
  typeSimple?: string
  config: Record<string, object>
}
 
export interface ExtensionPropertyDto {
  type?: string
  typeSimple?: string
  displayName: LocalizableStringDto
  api: ExtensionPropertyApiDto
  ui: ExtensionPropertyUiDto
  attributes: ExtensionPropertyAttributeDto[]
  configuration: Record<string, object>
  defaultValue: object
}
 
export interface ExtensionPropertyUiDto {
  onTable: ExtensionPropertyUiTableDto
  onCreateForm: ExtensionPropertyUiFormDto
  onEditForm: ExtensionPropertyUiFormDto
  lookup: ExtensionPropertyUiLookupDto
}
 
export interface ExtensionPropertyUiFormDto {
  isVisible: boolean
}
 
export interface ExtensionPropertyUiLookupDto {
  url?: string
  resultListPropertyName?: string
  displayPropertyName?: string
  valuePropertyName?: string
  filterParamName?: string
}
 
export interface ExtensionPropertyUiTableDto {
  isVisible: boolean
}
 
export interface LocalizableStringDto {
  name?: string
  resource?: string
}
 
export interface ModuleExtensionDto {
  entities: Record<string, EntityExtensionDto>
  configuration: Record<string, object>
}
 
export interface ObjectExtensionsDto {
  modules: Record<string, ModuleExtensionDto>
  enums: Record<string, ExtensionEnumDto>
}
 
export interface ApplicationPermissionRequestDto {
  providerName: string
  providerKey: string
}
 
export interface ApplicationPermissionPutDto {
  providerName?: string
  providerKey?: string
  permissions?: { permissions?: UpdatePermissionDto[] } | undefined
}
 
export interface UpdatePermissionDto {
  name?: string | undefined
  isGranted?: boolean
}
 
export interface ApplicationPermissionDto {
  entityDisplayName?: string | undefined
  groups?: PermissionGroupDto[] | undefined
}
 
export interface PermissionGroupDto {
  name?: string | undefined
  displayName?: string | undefined
  displayNameKey?: string | undefined
  displayNameResource?: string | undefined
  permissions?: PermissionGrantInfoDto[] | undefined
}
 
export interface PermissionGrantInfoDto {
  name?: string | undefined
  displayName?: string | undefined
  parentName?: string | undefined
  isGranted?: boolean
  allowedProviders?: string[] | undefined
  grantedProviders?: ProviderInfoDto[] | undefined
}
 
export interface ProviderInfoDto {
  providerName?: string | undefined
  providerKey?: string | undefined
}