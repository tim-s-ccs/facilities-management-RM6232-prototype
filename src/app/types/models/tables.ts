import { DefaultRow } from '../../../framework/types/models/tables'

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
  status: string
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

export type Tables = {
  addresses: Array<AddressRow>
  buildings: Array<BuildingRow>
  buyerDetails: Array<BuyerDetailRow>
  regions: Array<RegionRow>
}
