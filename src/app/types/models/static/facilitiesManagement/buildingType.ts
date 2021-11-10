import BuildingType from '../../../../models/static/facilitiesManagement/buildingType/model'

export interface BuildingTypeInterface {
  data: BuildingTypeData
}

export type BuildingTypeData = {
  id: number
  name: string
  description: string
}

export interface BuildingTypesInterface {
  collection: Array<BuildingType>
}