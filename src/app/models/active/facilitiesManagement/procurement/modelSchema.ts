import ProcurementBuilding from '../procurementBuildings/model'
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
  initialCallOffPeriodYears: {constructor: Number},
  initialCallOffPeriodMonths: {constructor: Number},
  initialCallOffPeriodStartDate: {constructor: Date},
  mobilisationPeriodRequired: {constructor: Boolean},
  mobilisationPeriod: {constructor: Number},
  optionalCallOffRequired: {constructor: Boolean},
  extensionPeriodRequired0: {constructor: Boolean},
  extensionPeriodYears0: {constructor: Number},
  extensionPeriodMonths0: {constructor: Number},
  extensionPeriodRequired1: {constructor: Boolean},
  extensionPeriodYears1: {constructor: Number},
  extensionPeriodMonths1: {constructor: Number},
  extensionPeriodRequired2: {constructor: Boolean},
  extensionPeriodYears2: {constructor: Number},
  extensionPeriodMonths2: {constructor: Number},
  extensionPeriodRequired3: {constructor: Boolean},
  extensionPeriodYears3: {constructor: Number},
  extensionPeriodMonths3: {constructor: Number},
  procurementBuildings: {constructor: Array, arrayItemConstuctor: ProcurementBuilding},
  state: {constructor: String},
  updatedAt: {constructor: String}
}

export default procurementModelSchema