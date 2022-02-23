import buyerDetailModelSchema from './modelSchema'
import buyerDetailValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { BuyerDetailData, BuyerDetailInterface } from '../../../../types/models/active/facilitiesManagement/buyerDetail'
import { BuyerDetailRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

const TABLE_NAME: string = 'buyerDetails'
const MODEL_SCHEMA: ModelSchema = buyerDetailModelSchema

class BuyerDetail extends ActiveModel implements BuyerDetailInterface {
  tableName: string = TABLE_NAME
  modelSchema: ModelSchema = MODEL_SCHEMA
  validationSchema: ValidationSchema = buyerDetailValidationSchema

  data: BuyerDetailData = this.data as BuyerDetailData

  constructor(req: Request, data: BuyerDetailRow) {
    super(req, data, MODEL_SCHEMA)
  }

  static find = (req: Request, id: string): BuyerDetail => {
    return new this(req, this._find(req, TABLE_NAME, id) as BuyerDetailRow)
  }

  static all = (req: Request): Array<BuyerDetail> => {
    return this._all(req, TABLE_NAME).map(data => new this(req, data as BuyerDetailRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<BuyerDetail> => {
    return this._where(req, TABLE_NAME, conditions).map(data => new this(req, data as BuyerDetailRow))
  }
}

export default BuyerDetail