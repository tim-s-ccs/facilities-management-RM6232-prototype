import regionValidationSchema from './validationSchema'
import { ActiveModel, Condition } from 'ccs-prototype-kit-model-interface'
import { RegionAttributes, RegionData, RegionInterface } from '../../../../types/models/active/facilitiesManagement/region'
import { RegionRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Region extends ActiveModel implements RegionInterface {
  static tableName: string = 'regions'
  tableName: string = 'regions'
  data: RegionData = this.data as RegionData

  constructor(data: RegionRow) {
    super({
      id: data.id,
      name: data.name,
      code: data.code
    },regionValidationSchema)
  }

  static find = (req: Request, id: number): Region => {
    return new this(this._find(req, this.tableName, id) as RegionRow)
  }

  static all = (req: Request): Array<Region> => {
    return this._all(req, this.tableName).map(data => new this(data as RegionRow))
  }

  static where = (req: Request, condtitions: Array<Condition>): Array<Region> => {
    return this._where(req, this.tableName, condtitions).map(data => new this(data as RegionRow))
  }

  static build = (req: Request, data?: RegionAttributes): Region => {
    if (data === undefined) { return new this({} as RegionRow) }

    return new this({
      id: this.nextID(req, this.tableName),
      name: data.name,
      code: data.code
    })
  }
}

export default Region
