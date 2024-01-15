export interface TenantItem {
    tenancyName: string,
    name: string,
    editionName: string,
    connectionString: string,
    isActive: boolean,
    creationTime: string,
    subscriptionEndDateUtc: string,
    editionId: number,
    isInTrialPeriod: false,
    id: number
}

export interface Tenants {
    items: TenantItem[]
}
