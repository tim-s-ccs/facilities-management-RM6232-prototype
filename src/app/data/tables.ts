import { AddressRow, BuildingRow, BuyerDetailRow, RegionRow, Tables } from '../types/models/tables'

const addresses: Array<AddressRow> = [
  {
    id: 1,
    addressLine1: 'SIS Building',
    addressLine2: '85 Albert Embankment',
    city: 'London',
    postcode: 'SE11 5AW'
  },
  {
    id: 2,
    addressLine1: '10 South Colonnade',
    city: 'London',
    postcode: 'E14 4QQ'
  },
  {
    id: 3,
    addressLine1: 'The Capital Building',
    addressLine2: '39 Old Hall Street',
    city: 'Liverpool',
    postcode: 'L3 9PP'
  },
  {
    id: 4,
    addressLine1: '2 Rivergate',
    addressLine2: 'Temple Quay',
    city: 'Bristol',
    postcode: 'BS32 4QW'
  },
  {
    id: 5,
    addressLine1: 'Concept House',
    addressLine2: 'Cardiff Road',
    city: 'Newport',
    postcode: 'NP10 8QQ'
  },
  {
    id: 6,
    addressLine1: 'Rosebery Court',
    addressLine2: 'Central Avenue',
    city: 'Norwich',
    postcode: 'NR7 0HS'
  },
  {
    id: 7,
    addressLine1: '23 Stephenson Street',
    city: 'Birmingham',
    postcode: 'B2 4BH'
  }
]

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

const buyerDetails: Array<BuyerDetailRow> = [
  {
    id: 1,
    userID: 1,
    fullName: 'James Bond',
    jobTitle: 'Secret Agent',
    telephoneNumber: '0345 007 2222',
    organisationName: 'MI6',
    organisationAddressID: 1,
    centralGovernment: false
  }
]

const regions: Array<RegionRow> = [
  {
    id: 1,
    name: 'Inner London - East',
    code: 'UKI4'
  },
  {
    id: 2,
    name: 'Merseyside',
    code: 'UKD7'
  },
  {
    id: 3,
    name: 'Gloucestershire, Wiltshire and Bristol/Bath area',
    code: 'UKK1'
  },
  {
    id: 4,
    name: 'Monmouthshire and Newport',
    code: 'UKL21'
  },
  {
    id: 5,
    name: 'East Anglia',
    code: 'UKH1'
  }
]

const tables: Tables = {
  buyerDetails: buyerDetails,
  buildings: buildings,
  addresses: addresses,
  regions: regions
}

export default tables