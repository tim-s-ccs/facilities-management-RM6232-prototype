import { BuildingRow } from '../../types/data/activeTables'

const buildings: Array<BuildingRow> = [
  {
    id: '000001',
    userID: '000001',
    name: '10 South Colonnade',
    description: 'Government Office Building',
    addressID: '000002',
    regionID: '000001',
    gia: 1000,
    externalArea: 0,
    buildingTypeID: '1',
    securityClearanceID: '8',
    updatedAt: '2021-10-25',
    buildingComplete: true
  },
  {
    id: '000002',
    userID: '000001',
    name: 'The Capital Building',
    description: '',
    addressID: '000003',
    regionID: '000002',
    gia: 0,
    externalArea: 1000,
    buildingTypeID: '2',
    securityClearanceID: '7',
    updatedAt: '2021-10-26',
    buildingComplete: true
  },
  {
    id: '000003',
    userID: '000001',
    name: '2 Rivergate',
    description: 'Bristol offices for CCS',
    addressID: '000004',
    regionID: '000003',
    gia: 1000,
    externalArea: 0,
    buildingTypeID: '3',
    securityClearanceID: '6',
    updatedAt: '2021-10-26',
    buildingComplete: true
  },
  {
    id: '000004',
    userID: '000001',
    name: 'Concept House',
    description: '',
    addressID: '000005',
    regionID: '000004',
    gia: 1000,
    externalArea: 0,
    buildingTypeID: '4',
    securityClearanceID: '5',
    updatedAt: '2021-10-27',
    buildingComplete: true
  },
  {
    id: '000005',
    userID: '000001',
    name: 'Rosebery Court',
    description: 'CCS Norwich Office',
    addressID: '000006',
    regionID: '000005',
    gia: 1000,
    externalArea: 0,
    buildingTypeID: '5',
    securityClearanceID: '4',
    updatedAt: '2021-09-01',
    buildingComplete: true
  },
  {
    id: '000006',
    userID: '000001',
    name: 'CCS Birmingham office',
    description: '',
    addressID: '000007',
    updatedAt: '2021-10-24',
    buildingComplete: false
  }
]

export default buildings