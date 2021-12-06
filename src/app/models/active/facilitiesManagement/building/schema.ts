const buildingModelSchema = {
  id: 'number',
  userID: 'number',
  name: 'string',
  description: 'string',
  address: 'Address',
  region: 'Region',
  gia: 'number',
  externalArea: 'number',
  buildingType: 'BuildingType',
  securityClearance: 'SecurityClearance',
  updatedAt: 'string',
  status: 'string',
}

export default buildingModelSchema