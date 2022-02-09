import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const procurementModelSchema: ModelSchema = {
  id: {constructor: Number},
  userID: {constructor: Number},
  serviceCodes: {constructor: Array, arrayItemConstuctor: String},
  regionCodes: {constructor: Array, arrayItemConstuctor: String},
  estimatedAnnualCost: {constructor: Number},
  contractName: {constructor: String},
  referenceNumber: {constructor: String},
  tupe: {constructor: Boolean},
  state: {constructor: String},
  updatedAt: {constructor: String}
}

export default procurementModelSchema