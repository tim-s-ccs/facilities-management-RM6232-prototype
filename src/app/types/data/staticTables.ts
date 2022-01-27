import { DefaultRow } from 'ccs-prototype-kit-model-interface'

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

export type WorkPackageRow = {
  code: string
  name: string
  selectable: boolean
}

export type ServiceRow = {
  code: string
  name: string
  description: string
  work_package_code: string
  total: boolean
  hard: boolean
  soft: boolean
  sort_order: number
}

export type PrimaryRegionRow = {
  code: string
  name: string
}

export type SecondaryRegionRow = {
  code: string
  name: string
  primary_region_code: string
}

export type SupplierRow = DefaultRow & {
  supplier_name: string
  contact_name: string
  contact_email: string
  contact_phone: string
  sme: boolean,
  duns: string,
  registration_number: string,
  address_line_1: string,
  address_line_2: string,
  address_town: string,
  address_county: string,
  address_postcode: string,
  active: boolean
}

export type SupplierLotDataRow = DefaultRow & {
  supplier_id: number
  lot_code: string,
  service_codes: string[]
  region_codes: string[]
}


export type StaticTables = {
  buildingTypes: Array<BuildingTypeRow>
  securityClearances: Array<SecurityClearanceRow>
  ukAddresses: Array<UKAddressRow>
  ukRegions: Array<UKRegionRow>
  workPackages: Array<WorkPackageRow>
  services: Array<ServiceRow>
  primaryRegions: Array<PrimaryRegionRow>
  secondaryRegions: Array<SecondaryRegionRow>
  suppliers: Array<SupplierRow>
  supplierLotData: Array<SupplierLotDataRow>
}
