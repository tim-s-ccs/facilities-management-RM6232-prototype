import { FormParams } from '../formParams'
import { BuyerDetailData } from '../../facilitiesManagement/buyerDetail'
import { AddressData } from '../../facilitiesManagement/address'

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
