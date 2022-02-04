import Address from '../address/model'
import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const buyerDetailModelSchema: ModelSchema = {
  id: {constructor: Number},
  userID: {constructor: Number},
  fullName: {constructor: String},
  jobTitle: {constructor: String},
  telephoneNumber: {constructor: String},
  organisationName: {constructor: String},
  organisationAddress: {constructor: Address},
  centralGovernment: {constructor: Boolean}
}

export default buyerDetailModelSchema