import { AddressData } from '../../models/facilitiesManagement/address'
import { BuyerDetailData } from '../../models/facilitiesManagement/buyerDetail'
import { FormParams } from '../formParams'

type BuyerDetailParams = FormParams & {
  buyerID: string
}

export type BuyerDetailEditParams = BuyerDetailParams & {
  buyerDetailData: BuyerDetailData
  addressContainerParams: object
}

export type BuyerDetailEditAddressParams = BuyerDetailParams & {
  addressData: AddressData
}
