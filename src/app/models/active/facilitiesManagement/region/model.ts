import ActiveModel from '../../../../../framework/models/active/activeModel'
import regionSchema from './schema'
import { RegionData, RegionInterface } from '../../../../types/models/active/facilitiesManagement/region'
import { RegionRow, Tables } from '../../../../types/models/tables'

class Region extends ActiveModel implements RegionInterface {
  tableName: string = 'regions'
  data: RegionData

  constructor(data: RegionRow) {
    super(regionSchema)

    this.data = {
      id: data.id,
      name: data.name,
      code: data.code
    }
  }

  static find = (id: number, tables: Tables): Region => {
    return new this(this._find(id, tables.regions, this.name) as RegionRow)
  }
}

export default Region
