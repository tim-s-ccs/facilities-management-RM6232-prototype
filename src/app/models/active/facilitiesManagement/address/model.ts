import addressSchema from './schema'
import { ActiveModel, Condition } from 'ccs-prototype-kit-model-interface'
import { AddressData, AddressInterface } from '../../../../types/models/active/facilitiesManagement/address'
import { AddressRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Address extends ActiveModel implements AddressInterface {
  static tableName: string = 'addresses'
  tableName: string = 'addresses'
  data: AddressData = this.data as AddressData

  constructor(data: AddressRow) {
    super({
      id: data.id,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      county: data.county,
      postcode: data.postcode
    }, addressSchema)
  }

  static find = (req: Request, id: number): Address => {
    return new this(this._find(req, this.tableName, id) as AddressRow)
  }

  static all = (req: Request): Array<Address> => {
    return this._all(req, this.tableName).map(data => new this(data as AddressRow))
  }

  static where = (req: Request, condtitions: Array<Condition>): Array<Address> => {
    return this._where(req, this.tableName, condtitions).map(data => new this(data as AddressRow))
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
