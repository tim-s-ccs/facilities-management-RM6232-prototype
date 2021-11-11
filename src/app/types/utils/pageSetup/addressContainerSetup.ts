import Address from '../../../models/active/facilitiesManagement/address/model'

export type AddressContainerSetupOptions = {
  inputName: string,
  enterAddressManuallyLink: string,
  showAddressHeading: boolean
}

export type AddresListItem ={
  text: string,
  value?: string,
  disabled?: boolean,
  selected?: boolean,
  attributes?: {
    'data-address_line_1': string,
    'data-address_line_2': string,
    'data-address_town': string,
    'data-address_postcode': string
  }
}

export type AddressContainerParams = {
  addressObject: Address,
  inputName: string,
  enterAddressManuallyLink: string,
  showAddressHeading: boolean,
  isPostcodeSearchVisible: boolean,
  isPostcodeChangeVisible: boolean,
  isSelectAnAddressVisible: boolean,
  isFullAddressVisible: boolean,
  addressList: Array<AddresListItem>
}
