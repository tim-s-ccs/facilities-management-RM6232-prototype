import Address from '../address/model'
import buyerDetailModelSchema from './modelSchema'
import buyerDetailValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { BuyerDetailData, BuyerDetailInterface } from '../../../../types/models/active/facilitiesManagement/buyerDetail'
import { BuyerDetailRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class BuyerDetail extends ActiveModel implements BuyerDetailInterface {
  static tableName: string = 'buyerDetails'

  tableName: string = 'buyerDetails'
  modelSchema: ModelSchema = buyerDetailModelSchema
  validationSchema: ValidationSchema = buyerDetailValidationSchema

  data: BuyerDetailData = this.data as BuyerDetailData

  constructor(req: Request, data: BuyerDetailRow) {
    super(req, {
      id: data.id,
      userID: data.userID,
      fullName: data.fullName,
      jobTitle: data.jobTitle,
      telephoneNumber: data.telephoneNumber,
      organisationName: data.organisationName,
      organisationAddress: Address.find(req, data.organisationAddressID),
      centralGovernment: data.centralGovernment
    })
  }

  static find = (req: Request, id: string): BuyerDetail => {
    return new this(req, this._find(req, this.tableName, id) as BuyerDetailRow)
  }

  static all = (req: Request): Array<BuyerDetail> => {
    return this._all(req, this.tableName).map(data => new this(req, data as BuyerDetailRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<BuyerDetail> => {
    return this._where(req, this.tableName, conditions).map(data => new this(req, data as BuyerDetailRow))
  }
}

export default BuyerDetail