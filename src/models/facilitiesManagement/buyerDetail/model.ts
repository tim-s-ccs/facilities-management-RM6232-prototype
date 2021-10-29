import Model from '../../../model'
import { BuyerDetailData, BuyerDetailInterface } from '../../../types/facilitiesManagement/buyerDetail'
import Address from '../address/model'
import buyerDetailSchema from './schema'

class BuyerDetail extends Model implements BuyerDetailInterface {
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