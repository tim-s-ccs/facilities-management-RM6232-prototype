import Address from '../../../../models/active/facilitiesManagement/address/model'
import BuildingType from '../../../../models/static/facilitiesManagement/buildingType/model'
import Region from '../../../../models/active/facilitiesManagement/region/model'
import SecurityClearance from '../../../../models/static/facilitiesManagement/securityClearance/model'
import { AddressAttributes } from './address'
import { RegionAttributes } from './region'

export interface BuildingInterface {
  data: BuildingData
  isBuildingComplete(): boolean
}

export type BuildingData = {
  id: number
  userID: number
  name?: string
  description?: string
  address?: Address
  region?: Region
  gia?: number
  externalArea?: number
  buildingType?: BuildingType
  securityClearance?: SecurityClearance
  updatedAt: string
  buildingComplete: boolean
}

export type BuildingAttributes = {
  name: string
  description: string
  address: AddressAttributes
  region: RegionAttributes
}