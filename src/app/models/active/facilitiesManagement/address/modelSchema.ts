import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const addressModelSchema: ModelSchema = {
  id: Number,
  addressLine1: String,
  addressLine2: String,
  city: String,
  county: String,
  postcode: String
}

export default addressModelSchema