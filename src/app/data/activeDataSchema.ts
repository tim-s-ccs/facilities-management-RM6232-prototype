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
  tupe: 'boolean',
  initialCallOffPeriodYears: 'number',
  initialCallOffPeriodMonths: 'number',
  initialCallOffPeriodStartDate: 'string',
  mobilisationPeriodRequired: 'boolean',
  mobilisationPeriod: 'number',
  optionalCallOffRequired: 'boolean',
  extensionPeriodRequired0: 'boolean',
  extensionPeriodYears0: 'number',
  extensionPeriodMonths0: 'number',
  extensionPeriodRequired1: 'boolean',
  extensionPeriodYears1: 'number',
  extensionPeriodMonths1: 'number',
  extensionPeriodRequired2: 'boolean',
  extensionPeriodYears2: 'number',
  extensionPeriodMonths2: 'number',
  extensionPeriodRequired3: 'boolean',
  extensionPeriodYears3: 'number',
  extensionPeriodMonths3: 'number',
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