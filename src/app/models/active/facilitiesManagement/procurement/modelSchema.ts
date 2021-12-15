import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const procurementModelSchema: ModelSchema = {
  id: Number,
  userID: Number,
  serviceCodes: Array,
  regionCodes: Array,
  estimatedContractCost: Number
}

export default procurementModelSchema