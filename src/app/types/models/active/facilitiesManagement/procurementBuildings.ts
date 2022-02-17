import Building from '../../../../models/active/facilitiesManagement/building/model'
import Procurement from '../../../../models/active/facilitiesManagement/procurement/model'
import Service from '../../../../models/static/facilitiesManagement/service/model'

export interface ProcurementBuildingInterface {
  data: ProcurementBuildingData
  services: () => Service[]
  procurement: () => Procurement
  building: () => Building
}

export type ProcurementBuildingData = {
  id: string
  procurementID: string
  buildingID: string
  active: boolean
  serviceCodes?: Array<string>
}

export type ProcurementBuildingAttributes = {
  procurementID: string
  buildingID: string
}
