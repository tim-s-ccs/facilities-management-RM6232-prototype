import Address from '../address/model'
import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const buyerDetailModelSchema: ModelSchema = {
  id: Number,
  userID: Number,
  fullName: String,
  jobTitle: String,
  telephoneNumber: String,
  organisationName: String,
  organisationAddress: Address,
  centralGovernment: Boolean
}

export default buyerDetailModelSchema