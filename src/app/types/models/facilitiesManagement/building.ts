import Address from '../../../models/active/facilitiesManagement/address/model'
import BuildingType from '../../../models/static/facilitiesManagement/buildingType/model'
import Region from '../../../models/active/facilitiesManagement/region/model'
import SecurityClearance from '../../../models/static/facilitiesManagement/securityClearance/model'

export interface BuildingInterface {
  data: BuildingData
}

export type BuildingData = {
  id: string
  name: string
  description: string
  address: Address
  region: Region
  gia: number
  externalArea: number
  buildingType: BuildingType
  securityClearance: SecurityClearance
  updatedAt: Date
  status: string 
}
