import { ActiveDataSchema, ActiveDataScheme } from '../../framework/types/data/activeDataSchema'

const addressSchema: ActiveDataScheme = {
  id: 'number',
  addressLine1: 'string',
  addressLine2: 'string',
  city: 'string',
  county: 'string',
  postcode: 'string'
}

const buildingSchema: ActiveDataScheme = {
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
  status: 'string',
}

const buyerDetailSchema: ActiveDataScheme = {
  id: 'number',
  userID: 'number',
  fullName: 'string',
  jobTitle: 'string',
  telephoneNumber: 'string',
  organisationName: 'string',
  organisationAddressID: 'number',
  centralGovernment: 'boolean'
}

const regionSchema: ActiveDataScheme = {
  id: 'number',
  name: 'string',
  code: 'string'
}

const activeDataSchema: ActiveDataSchema = {
  addresses: addressSchema,
  buildings: buildingSchema,
  buyerDetails: buyerDetailSchema,
  regions: regionSchema
}

export default activeDataSchema