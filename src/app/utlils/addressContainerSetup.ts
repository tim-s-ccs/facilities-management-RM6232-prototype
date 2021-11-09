import Address from '../models/active/facilitiesManagement/address/model'
import addresses from '../data/addresses'
import { ModelError } from '../../framework/types/models/model'

const addressContainerSetup = (address: Address, errors: {[key: string]: ModelError}, options: {inputName: string, enterAddressManuallyLink: string, showAddressHeading: boolean}): object => {
  const postcode: string = address.data.postcode
  const addressLine1: string = address.data.addressLine1

  const isPostcodeSearchVisible: boolean = postcode === '' || errors.postcode !== undefined
  const isPostcodeChangeVisible: boolean = postcode !== '' && addressLine1 === '' && errors.postcode === undefined

  const isSelectAnAddressVisible: boolean = isPostcodeChangeVisible
  const isFullAddressVisible: boolean = addressLine1 !== ''

  const addressList: Array<{[key: string]: any}> = [
    {
      text: '6 addresses found',
      disabled: true
    },
    {
      text: 'Please select an address',
      selected: true
    },
    ...addresses.map((address: {[key: string]: string}) => {
      return {
        value: address.summary_line,
        text: address.summary_line,
        attributes: {
          'data-address_line_1': address.address_line_1,
          'data-address_line_2': address.address_line_2,
          'data-address_town': address.address_town,
          'data-address_postcode': address.address_postcode
        }
      }
    })
  ]

  return {
    addressObject: address,
    inputName: options.inputName,
    enterAddressManuallyLink: options.enterAddressManuallyLink,
    showAddressHeading: options.showAddressHeading,
    isPostcodeSearchVisible: isPostcodeSearchVisible,
    isPostcodeChangeVisible: isPostcodeChangeVisible,
    isSelectAnAddressVisible: isSelectAnAddressVisible,
    isFullAddressVisible: isFullAddressVisible,
    addressList: addressList
  }
}

export default addressContainerSetup