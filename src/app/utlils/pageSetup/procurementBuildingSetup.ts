import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import ProcurementBuilding from '../../models/active/facilitiesManagement/procurementBuildings/model'
import Service from '../../models/static/facilitiesManagement/service/model'
import { Request } from 'express'
import { ServiceCheckbox } from '../../types/utils/pageSetup/procurementBuildingSetup'

const getProcurementBuilding = (req: Request): ProcurementBuilding => {
  return ProcurementBuilding.find(req, req.params['id'])
}

const getProcurementName = (procurementBuilding: ProcurementBuilding) => {
  const procurement: Procurement = procurementBuilding.procurement()

  return `${procurement.data.contractName} - ${procurement.data.referenceNumber}`
}

const getServiceCheckboxes = (procurementBuilding: ProcurementBuilding): ServiceCheckbox[] => {
  const procurementServices: Service[] = procurementBuilding.procurement().services()
  const currentSelectedServiceCodes: string[] = procurementBuilding.services().map(service => service.data.code)

  return [
    {
      text: 'Select all',
      name: 'box-all',
      id: 'box-all'
    },
    {
      divider: 'or'
    },
    ...procurementServices.map(service => {
      return {
        text: service.data.name,
        value: service.data.code,
        checked: currentSelectedServiceCodes.includes(service.data.code),
        attributes: {
          'data-input': 'procurement-building__input'
        }
      }
    })
  ]
}

export { getProcurementBuilding, getProcurementName, getServiceCheckboxes }