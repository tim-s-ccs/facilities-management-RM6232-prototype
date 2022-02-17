import Address from '../../../../models/active/facilitiesManagement/address/model'

export interface BuyerDetailInterface {
  data: BuyerDetailData
}

export type BuyerDetailData = {
  id: string
  userID: string
  fullName: string
  jobTitle: string
  telephoneNumber: string
  organisationName: string
  organisationAddress: Address
  centralGovernment: boolean
}