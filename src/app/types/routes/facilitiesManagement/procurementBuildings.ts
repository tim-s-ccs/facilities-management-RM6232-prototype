import ProcurementBuilding from '../../../models/active/facilitiesManagement/procurementBuildings/model'
import { ErrorParams } from '../formParams'
import { ServiceCheckbox } from '../../utils/pageSetup/procurementBuildingSetup'

export type ProcurementBuildingEditParams = {
  procurementBuilding: ProcurementBuilding
  procurementID: string
  procurementName: string
  buildingName: string
  serviceCheckboxes: ServiceCheckbox[]
}

export type ProcurementBuildingsUpdateParams = ProcurementBuildingEditParams & ErrorParams