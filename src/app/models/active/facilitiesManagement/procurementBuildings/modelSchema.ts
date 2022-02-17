import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const procurementBuildingModelSchema: ModelSchema = {
  id: {constructor: Number},
  procurementID: {constructor: Number},
  buildingID: {constructor: Number},
  active: {constructor: Boolean},
  serviceCodes: {constructor: Array, arrayItemConstuctor: String},
}

export default procurementBuildingModelSchema
