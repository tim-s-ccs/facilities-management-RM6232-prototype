import Address from '../models/active/facilitiesManagement/address/model'
import Region from '../models/active/facilitiesManagement/region/model'
import regions from '../data/regions'

const regionContainerSetup = (address: Address, region: Region, inputName: string): object => {
  const addressLine1: string = address.data.addressLine1
  const regionName: string = region.data.name

  const isSelectRegionVisible: boolean = addressLine1 !== '' && regionName === ''
  const isFullRegionVisible: boolean = regionName !== ''

  const regionList: Array<{[key: string]: any}> = [
    {
      text: '6 regions found',
      disabled: true
    },
    {
      text: 'Please select a region',
      selected: true
    },
    ...regions.map((region: {[key: string]: string}) => {
      return {
        value: region.code,
        text: region.region,
        attributes: {
          'data-address_region': region.region,
          'data-address_region_code': region.code
        }
      }
    })
  ]
  return {
    regionObject: region,
    inputName: inputName,
    isSelectRegionVisible: isSelectRegionVisible,
    isFullRegionVisible: isFullRegionVisible,
    regionList: regionList
  }
}

export default regionContainerSetup