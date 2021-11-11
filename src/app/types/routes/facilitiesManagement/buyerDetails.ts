import { AddressContainerParams } from '../../utils/pageSetup/addressContainerSetup'
import { AddressData } from '../../models/active/facilitiesManagement/address'
import { BuyerDetailData } from '../../models/active/facilitiesManagement/buyerDetail'
import { ErrorParams } from '../formParams'

export type BuyerDetailEditParams = {
  buyerDetailData: BuyerDetailData
  addressContainerParams: AddressContainerParams
}

export type BuyerDetailUpdateParams = BuyerDetailEditParams & ErrorParams

export type BuyerDetailEditAddressParams = {
  buyerDetailData: BuyerDetailData
  addressData: AddressData
}

export type BuyerDetailUpdateAddressParams = ErrorParams & BuyerDetailEditAddressParams
