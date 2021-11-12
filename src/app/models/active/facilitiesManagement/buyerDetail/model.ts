import ActiveModel from '../../../../../framework/models/active/activeModel'
import Address from '../address/model'
import buyerDetailSchema from './schema'
import { BuyerDetailData, BuyerDetailInterface } from '../../../../types/models/active/facilitiesManagement/buyerDetail'
import { BuyerDetailRow, Tables } from '../../../../types/models/tables'

class BuyerDetail extends ActiveModel implements BuyerDetailInterface {
  tableName: string = 'buyerDetails'
  data: BuyerDetailData

  constructor(data: BuyerDetailRow, tables: Tables) {
    super(buyerDetailSchema)

    this.data = {
      id: data.id,
      fullName: data.fullName,
      jobTitle: data.jobTitle,
      telephoneNumber: data.telephoneNumber,
      organisationName: data.organisationName,
      organisationAddress: Address.find(data.organisationAddressID, tables),
      centralGovernment: data.centralGovernment
    }
  }

  static find = (id: number, tables: Tables): BuyerDetail => {
    return new this(this._find(id, tables.buyerDetails) as BuyerDetailRow, tables)
  }
}

export default BuyerDetail