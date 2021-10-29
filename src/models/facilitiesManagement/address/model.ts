import { AddressInterface, AddressData } from '../../../types/facilitiesManagement/address'
import Model from '../../../model'
import addressSchema from './schema'

class Address extends Model implements AddressInterface {
  data: AddressData

  constructor(data: {[key: string]: any}) {
    super(addressSchema)
    this.data = {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      county: data.county,
      postcode: data.postcode
    }
  }

  fullAddress = (): string => {
    let address = ['addressLine1', 'addressLine2', 'city', 'county']
      .map(attribute => (this.data as {[key: string]: string})[attribute])
      .filter(attribute => (attribute!== undefined && attribute !== ''))
      .join(', ')

    address += ` ${this.data.postcode}`

    return address
  }
}

export default Address
