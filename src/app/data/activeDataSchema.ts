import { ActiveDataSchema, ActiveDataScheme } from 'ccs-prototype-kit-model-interface'

const addressDataSchema: ActiveDataScheme = {
  id: 'string',
  addressLine1: 'string',
  addressLine2: 'string',
  city: 'string',
  county: 'string',
  postcode: 'string'
}

const buildingDataSchema: ActiveDataScheme = {
  id: 'string',
  userID: 'string',
  name: 'string',
  description: 'string',
  addressID: 'string',
  regionID: 'string',
  gia: 'number',
  externalArea: 'number',
  buildingTypeID: 'string',
  securityClearanceID: 'string',
  updatedAt: 'string',
  buildingComplete: 'boolean',
}

const buyerDetailDataSchema: ActiveDataScheme = {
  id: 'string',
  userID: 'string',
  fullName: 'string',
  jobTitle: 'string',
  telephoneNumber: 'string',
  organisationName: 'string',
  organisationAddressID: 'string',
  centralGovernment: 'boolean'
}

const regionDataSchema: ActiveDataScheme = {
  id: 'string',
  name: 'string',
  code: 'string'
}

const procurementDataSchema: ActiveDataScheme = {
  id: 'string',
  userID: 'string',
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
  procurementBuildingIDs: 'object',
  state: 'string',
  updatedAt: 'string'
}

const procurementBuildingsDataSchema: ActiveDataScheme = {
  id: 'string',
  procurementID: 'string',
  buildingID: 'string',
  active: 'boolean',
  serviceCodes: 'object'
}

const activeDataSchema: ActiveDataSchema = {
  addresses: addressDataSchema,
  buildings: buildingDataSchema,
  buyerDetails: buyerDetailDataSchema,
  regions: regionDataSchema,
  procurements: procurementDataSchema,
  procurementBuildings: procurementBuildingsDataSchema
}

export default activeDataSchema
