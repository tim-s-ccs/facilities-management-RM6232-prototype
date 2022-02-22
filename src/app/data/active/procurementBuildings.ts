import { ProcurementBuildingRow } from '../../types/data/activeTables'

const procurementBuildings: Array<ProcurementBuildingRow> = [
  {
    id: '000001',
    procurementID: '000003',
    buildingID: '000001',
    active: true,
    serviceCodes: [
      'F.1',
      'F.2'
    ]
  },
  {
    id: '000002',
    procurementID: '000003',
    buildingID: '000002',
    active: true
  },
  {
    id: '000003',
    procurementID: '000003',
    buildingID: '000003',
    active: false
  }
]

export default procurementBuildings
