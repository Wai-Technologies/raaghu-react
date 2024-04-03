
export interface SubscriptionItem {
  gateway: string,
  amount: number,
  editionId: number,
  dayCount: number,
  paymentPeriodType: string,
  externalPaymentId: string,
  payerId: string,
  status: string,
  editionDisplayName: string,
  tenantId: number,
  invoiceNo: string,
  lastModifierUserId: number,
  creatorUserId: number,
  id: number
}

export interface Subscription {
  items: SubscriptionItem[]
}

export interface feature {
  name: string,
  value: string
}

export interface SubscriptionInformation {
  displayName: string,
  trialDayCount: number
  monthlyPrice: number,
  annualPrice: number,
  id: number
  featureDetails: feature[]
}