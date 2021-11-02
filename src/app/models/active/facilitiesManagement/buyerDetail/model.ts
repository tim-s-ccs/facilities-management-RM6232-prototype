import ActiveModel from '../../../../../framework/models/active/activeModel'
import Address from '../address/model'
import buyerDetailSchema from './schema'
import { BuyerDetailData, BuyerDetailInterface } from '../../../../types/models/facilitiesManagement/buyerDetail'

class BuyerDetail extends ActiveModel implements BuyerDetailInterface {
  data: BuyerDetailData

  constructor(data: {[key: string]: any}) {
    super(buyerDetailSchema)

    this.data = {
      id: data.id,
      fullName: data.fullName,
      jobTitle: data.jobTitle,
      telephoneNumber: data.telephoneNumber,
      organisationName: data.organisationName,
      organisationAddress: new Address(data.organisationAddress),
      centralGovernment: data.centralGovernment
    }
  }
}

export default BuyerDetail