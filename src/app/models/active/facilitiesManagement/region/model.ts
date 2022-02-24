import regionModelSchema from './modelSchema'
import regionValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { RegionAttributes, RegionData, RegionInterface } from '../../../../types/models/active/facilitiesManagement/region'
import { RegionRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

const TABLE_NAME: string = 'regions'
const MODEL_SCHEMA: ModelSchema = regionModelSchema

class Region extends ActiveModel implements RegionInterface {
  tableName: string = TABLE_NAME
  modelSchema: ModelSchema = MODEL_SCHEMA
  validationSchema: ValidationSchema = regionValidationSchema

  data: RegionData = this.data as RegionData

  constructor(req: Request, data: RegionRow) {
    super(req, data, MODEL_SCHEMA)
  }

  static find = (req: Request, id: string): Region => {
    return new this(req, this._find(req, TABLE_NAME, id) as RegionRow)
  }

  static all = (req: Request): Array<Region> => {
    return this._all(req, TABLE_NAME).map(data => new this(req, data as RegionRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Region> => {
    return this._where(req, TABLE_NAME, conditions).map(data => new this(req, data as RegionRow))
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
