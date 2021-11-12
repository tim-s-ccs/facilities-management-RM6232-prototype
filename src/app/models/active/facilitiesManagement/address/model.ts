import ActiveModel from '../../../../../framework/models/active/activeModel'
import addressSchema from './schema'
import { AddressData, AddressInterface } from '../../../../types/models/active/facilitiesManagement/address'
import { AddressRow, Tables } from '../../../../types/models/tables'

class Address extends ActiveModel implements AddressInterface {
  tableName: string = 'addresses'
  data: AddressData

  constructor(data: AddressRow) {
    super(addressSchema)

    this.data = {
      id: data.id,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      county: data.county,
      postcode: data.postcode
    }
  }

  static find = (id: number, tables: Tables): Address => {
    return new this(this._find(id, tables.addresses) as AddressRow)
  }

  fullAddress = (): string => {
    let address = [
      this.data.addressLine1,
      this.data.addressLine2,
      this.data.city,
      this.data.county
    ].filter(attribute => (attribute!== undefined && attribute !== ''))
      .join(', ')

    address += ` ${this.data.postcode}`

    return address
  }
}

export default Address
