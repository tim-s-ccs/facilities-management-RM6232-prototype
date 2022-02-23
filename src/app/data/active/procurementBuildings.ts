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
  },
  {
    id: '000004',
    procurementID: '000004',
    buildingID: '000004',
    active: true,
    serviceCodes: ['E.1', 'E.2', 'F.1']
  },
  {
    id: '000005',
    procurementID: '000004',
    buildingID: '000005',
    active: true,
    serviceCodes: ['F.2', 'G.1', 'G.2']
  }
]

export default procurementBuildings
