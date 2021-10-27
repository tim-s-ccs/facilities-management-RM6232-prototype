import Address from '../../models/facilitiesManagement/address/model'
export interface BuyerDetailInterface {
  data: BuyerDetailData
}

export type BuyerDetailData = {
  id: string
  fullName: string
  jobTitle: string
  telephoneNumber: string
  organisationName: string
  organisationAddress: Address
  centralGovernment: string
}