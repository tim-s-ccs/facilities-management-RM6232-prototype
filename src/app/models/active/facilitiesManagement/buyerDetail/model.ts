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

  constructor(data: BuyerDetailRow, req: Request) {
    super({
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

  static find = (req: Request, id: number): BuyerDetail => {
    return new this(this._find(req, this.tableName, id) as BuyerDetailRow, req)
  }

  static all = (req: Request): Array<BuyerDetail> => {
    return this._all(req, this.tableName).map(data => new this(data as BuyerDetailRow, req))
  }

  static where = (req: Request, condtitions: Array<Condition>): Array<BuyerDetail> => {
    return this._where(req, this.tableName, condtitions).map(data => new this(data as BuyerDetailRow, req))
  }
}

export default BuyerDetail