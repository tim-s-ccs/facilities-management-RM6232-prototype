import { ActiveDataSchema, ActiveDataScheme } from 'ccs-prototype-kit-model-interface'

const addressDataSchema: ActiveDataScheme = {
  id: 'number',
  addressLine1: 'string',
  addressLine2: 'string',
  city: 'string',
  county: 'string',
  postcode: 'string'
}

const buildingDataSchema: ActiveDataScheme = {
  id: 'number',
  userID: 'number',
  name: 'string',
  description: 'string',
  addressID: 'number',
  regionID: 'number',
  gia: 'number',
  externalArea: 'number',
  buildingTypeID: 'number',
  securityClearanceID: 'number',
  updatedAt: 'string',
  buildingComplete: 'boolean',
}

const buyerDetailDataSchema: ActiveDataScheme = {
  id: 'number',
  userID: 'number',
  fullName: 'string',
  jobTitle: 'string',
  telephoneNumber: 'string',
  organisationName: 'string',
  organisationAddressID: 'number',
  centralGovernment: 'boolean'
}

const regionDataSchema: ActiveDataScheme = {
  id: 'number',
  name: 'string',
  code: 'string'
}

const procurementDataSchema: ActiveDataScheme = {
  id: 'number',
  userID: 'number',
  serviceCodes: 'object',
  regionCodes: 'object',
  estimatedAnnualCost: 'number',
  contractName: 'string',
  referenceNumber: 'string',
  state: 'string',
  updatedAt: 'string'
}

const activeDataSchema: ActiveDataSchema = {
  addresses: addressDataSchema,
  buildings: buildingDataSchema,
  buyerDetails: buyerDetailDataSchema,
  regions: regionDataSchema,
  procurements: procurementDataSchema
}

export default activeDataSchema