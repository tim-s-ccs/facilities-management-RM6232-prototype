import { BuildingRow } from '../../types/data/activeTables'

const buildings: Array<BuildingRow> = [
  {
    id: 1,
    userID: 1,
    name: '10 South Colonnade',
    description: 'Government Office Building',
    addressID: 2,
    regionID: 1,
    gia: 1000,
    externalArea: 0,
    buildingTypeID: 1,
    securityClearanceID: 8,
    updatedAt: '2021-10-25',
    status: 'completed'
  },
  {
    id: 2,
    userID: 1,
    name: 'The Capital Building',
    description: '',
    addressID: 3,
    regionID: 2,
    gia: 0,
    externalArea: 1000,
    buildingTypeID: 2,
    securityClearanceID: 7,
    updatedAt: '2021-10-26',
    status: 'completed'
  },
  {
    id: 3,
    userID: 1,
    name: '2 Rivergate',
    description: 'Bristol offices for CCS',
    addressID: 4,
    regionID: 3,
    gia: 1000,
    externalArea: 0,
    buildingTypeID: 3,
    securityClearanceID: 6,
    updatedAt: '2021-10-26',
    status: 'completed'
  },
  {
    id: 4,
    userID: 1,
    name: 'Concept House',
    description: '',
    addressID: 5,
    regionID: 4,
    gia: 1000,
    externalArea: 0,
    buildingTypeID: 4,
    securityClearanceID: 5,
    updatedAt: '2021-10-27',
    status: 'completed'
  },
  {
    id: 5,
    userID: 1,
    name: 'Rosebery Court',
    description: 'CCS Norwich Office',
    addressID: 6,
    regionID: 5,
    gia: 1000,
    externalArea: 0,
    buildingTypeID: 5,
    securityClearanceID: 4,
    updatedAt: '2021-09-01',
    status: 'completed'
  },
  {
    id: 6,
    userID: 1,
    name: 'CCS Birmingham office',
    description: '',
    addressID: 7,
    updatedAt: '2021-10-24',
    status: 'incomplete'
  }
]

export default buildings