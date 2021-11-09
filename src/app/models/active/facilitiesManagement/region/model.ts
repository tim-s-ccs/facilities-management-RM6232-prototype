import ActiveModel from '../../../../../framework/models/active/activeModel'
import regionSchema from './schema'
import { RegionData, RegionInterface } from '../../../../types/models/facilitiesManagement/region'

class Region extends ActiveModel implements RegionInterface {
  data: RegionData

  constructor(data: {[key: string]: any}) {
    super(regionSchema)
    this.data = {
      name: data.name,
      code: data.code
    }
  }
}

export default Region
