import { DefaultRow } from 'ccs-prototype-kit-model-interface'

export type AddressRow = DefaultRow & {
  addressLine1: string
  addressLine2?: string
  city: string
  county?: string
  postcode: string
}

export type BuildingRow = DefaultRow & {
  userID: string
  name: string
  description?: string
  addressID: string
  regionID?: string
  gia?: number,
  externalArea?: number,
  buildingTypeID?: string
  securityClearanceID?: string
  updatedAt: string
  buildingComplete: boolean
}

export type BuyerDetailRow = DefaultRow & {
  userID: string
  fullName: string
  jobTitle: string
  telephoneNumber: string
  organisationName: string
  organisationAddressID: string
  centralGovernment: boolean
}

export type RegionRow = DefaultRow & {
  name: string
  code: string
}

export type ProcurementRow = DefaultRow & {
  userID: string
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
  procurementBuildingIDs?: Array<string>
  state: string
  updatedAt: string
}

export type ProcurementBuildingRow = DefaultRow & {
  procurementID: string
  buildingID: string
  active: boolean
  serviceCodes?: Array<string>
}

export type ActiveTables = {
  addresses: Array<AddressRow>
  buildings: Array<BuildingRow>
  buyerDetails: Array<BuyerDetailRow>
  regions: Array<RegionRow>
  procurements: Array<ProcurementRow>
  procurementBuildings: Array<ProcurementBuildingRow>
}
