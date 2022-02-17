import regionModelSchema from './modelSchema'
import regionValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { RegionAttributes, RegionData, RegionInterface } from '../../../../types/models/active/facilitiesManagement/region'
import { RegionRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Region extends ActiveModel implements RegionInterface {
  static tableName: string = 'regions'

  tableName: string = 'regions'
  modelSchema: ModelSchema = regionModelSchema
  validationSchema: ValidationSchema = regionValidationSchema

  data: RegionData = this.data as RegionData

  constructor(req: Request, data: RegionRow) {
    super(req, {
      id: data.id,
      name: data.name,
      code: data.code
    })
  }

  static find = (req: Request, id: string): Region => {
    return new this(req, this._find(req, this.tableName, id) as RegionRow)
  }

  static all = (req: Request): Array<Region> => {
    return this._all(req, this.tableName).map(data => new this(req, data as RegionRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Region> => {
    return this._where(req, this.tableName, conditions).map(data => new this(req, data as RegionRow))
  }

  static build = (req: Request, data?: RegionAttributes): Region => {
    if (data === undefined) { return new this(req, {} as RegionRow) }

    return new this(req, {
      id: this.generateID(),
      name: data.name,
      code: data.code
    })
  }
}

export default Region
