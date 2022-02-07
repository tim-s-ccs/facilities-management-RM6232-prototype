import Address from '../address/model'
import BuildingType from '../../../static/facilitiesManagement/buildingType/model'
import Region from '../region/model'
import SecurityClearance from '../../../static/facilitiesManagement/securityClearance/model'
import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const buildingModelSchema: ModelSchema = {
  id: {constructor: Number},
  userID: {constructor: Number},
  name: {constructor: String},
  description: {constructor: String},
  address: {constructor: Address},
  region: {constructor: Region},
  gia: {constructor: Number},
  externalArea: {constructor: Number},
  buildingType: {constructor: BuildingType},
  securityClearance: {constructor: SecurityClearance},
  updatedAt: {constructor: String},
  buildingComplete: {constructor: Boolean},
}

export default buildingModelSchema