import { DefaultRow } from '../../../framework/types/data/tables'

export type BuildingTypeRow = DefaultRow & {
  name: string
  description: string
}

export type SecurityClearanceRow = DefaultRow & {
  name: string
  description: string
}

export type UKAddressRow = DefaultRow & {
  summary_line: string
  address_line_1: string
  address_line_2: string
  address_postcode: string
  address_town: string
}

export type UKRegionRow = DefaultRow & {
  region: string
  code: string
}

export type StaticTables = {
  buildingTypes: Array<BuildingTypeRow>
  securityClearances: Array<SecurityClearanceRow>
  ukAddresses: Array<UKAddressRow>
  ukRegions: Array<UKRegionRow>
}
