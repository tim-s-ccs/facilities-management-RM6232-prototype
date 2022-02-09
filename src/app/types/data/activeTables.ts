import { DefaultRow } from 'ccs-prototype-kit-model-interface'

export type AddressRow = DefaultRow & {
  addressLine1: string
  addressLine2?: string
  city: string
  county?: string
  postcode: string
}

export type BuildingRow = DefaultRow & {
  userID: number
  name: string
  description?: string
  addressID: number
  regionID?: number
  gia?: number,
  externalArea?: number,
  buildingTypeID?: number
  securityClearanceID?: number
  updatedAt: string
  buildingComplete: boolean
}

export type BuyerDetailRow = DefaultRow & {
  userID: number
  fullName: string
  jobTitle: string
  telephoneNumber: string
  organisationName: string
  organisationAddressID: number
  centralGovernment: boolean
}

export type RegionRow = DefaultRow & {
  name: string
  code: string
}

export type ProcurementRow = DefaultRow & {
  userID: number
  serviceCodes: Array<string>
  regionCodes: Array<string>
  estimatedAnnualCost: number
  contractName: string
  referenceNumber: string
  tupe?: boolean
  initialCallOffPeriodYears?: number
  initialCallOffPeriodMonths?: number
  initialCallOffPeriodStartDate?: string
  mobilisationPeriodRequired?: boolean
  mobilisationPeriod?: number
  optionalCallOffRequired?: boolean
  extensionPeriodRequired0?: boolean
  extensionPeriodYears0?: number
  extensionPeriodMonths0?: number
  extensionPeriodRequired1?: boolean
  extensionPeriodYears1?: number
  extensionPeriodMonths1?: number
  extensionPeriodRequired2?: boolean
  extensionPeriodYears2?: number
  extensionPeriodMonths2?: number
  extensionPeriodRequired3?: boolean
  extensionPeriodYears3?: number
  extensionPeriodMonths3?: number
  state: string
  updatedAt: string
}

export type ActiveTables = {
  addresses: Array<AddressRow>
  buildings: Array<BuildingRow>
  buyerDetails: Array<BuyerDetailRow>
  regions: Array<RegionRow>
  procurements: Array<ProcurementRow>
}
