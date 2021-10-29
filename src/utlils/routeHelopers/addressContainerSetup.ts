import BuyerDetail from '../../models/facilitiesManagement/buyerDetail/model'
import addresses from '../../data/addresses'

const addressContainerSetup = (buyerDetail: BuyerDetail): object => {
  const postcode: string = buyerDetail.data.organisationAddress.data.postcode
  const addressLine1: string = buyerDetail.data.organisationAddress.data.addressLine1

  const isPostcodeSearchVisible: boolean = postcode === '' || buyerDetail.errors.postcode !== undefined
  const isPostcodeChangeVisible: boolean = postcode !== '' && addressLine1 === '' && buyerDetail.errors.postcode === undefined

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
    ...addresses.map((address: any) => {
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
    addressObject: buyerDetail.data.organisationAddress,
    inputName: 'facilitiesManagement[organisationAddress]',
    enterAddressManuallyLink: `/facilities-management/RM6232/buyer-details/${buyerDetail.data.id}/edit-address`,
    isPostcodeSearchVisible: isPostcodeSearchVisible,
    isPostcodeChangeVisible: isPostcodeChangeVisible,
    isSelectAnAddressVisible: isSelectAnAddressVisible,
    isFullAddressVisible: isFullAddressVisible,
    addressList: addressList
  }
}

export default addressContainerSetup