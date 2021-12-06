import addressModelSchema from './modelSchema'
import addressValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { AddressAttributes, AddressData, AddressInterface } from '../../../../types/models/active/facilitiesManagement/address'
import { AddressRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Address extends ActiveModel implements AddressInterface {
  static tableName: string = 'addresses'

  tableName: string = 'addresses'
  modelSchema: ModelSchema = addressModelSchema
  validationSchema: ValidationSchema = addressValidationSchema

  data: AddressData = this.data as AddressData

  constructor(data: AddressRow) {
    super({
      id: data.id,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      county: data.county,
      postcode: data.postcode
    })
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

  static build = (req: Request, data?: AddressAttributes): Address => {
    if (data === undefined) { return new this({} as AddressRow) }

    return new this({
      id: this.nextID(req, this.tableName),
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      county: data.county,
      postcode: data.postcode
    })
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
