import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const addressModelSchema: ModelSchema = {
  id: {constructor: Number},
  addressLine1: {constructor: String},
  addressLine2: {constructor: String},
  city: {constructor: String},
  county: {constructor: String},
  postcode: {constructor: String}
}

export default addressModelSchema