import Address from '../address/model'
import BuildingType from '../../../static/facilitiesManagement/buildingType/model'
import Region from '../region/model'
import SecurityClearance from '../../../static/facilitiesManagement/securityClearance/model'
import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const buildingModelSchema: ModelSchema = {
  id: Number,
  userID: Number,
  name: String,
  description: String,
  address: Address,
  region: Region,
  gia: Number,
  externalArea: Number,
  buildingType: BuildingType,
  securityClearance: SecurityClearance,
  updatedAt: String,
  status: String,
}

export default buildingModelSchema