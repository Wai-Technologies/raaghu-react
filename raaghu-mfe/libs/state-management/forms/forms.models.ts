export interface FormsItem {
    tenancyName: string,
    name: string,
    editionDisplayName: string,
    connectionString: string,
    isActive: boolean,
    creationTime: string,
    subscriptionEndDateUtc: string,
    editionId: number,
    isInTrialPeriod: false,
    id: number
}

export interface Forms {
    items: FormsItem[]
}
