import addressModelSchema from './modelSchema'
import addressValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { AddressAttributes, AddressData, AddressInterface } from '../../../../types/models/active/facilitiesManagement/address'
import { AddressRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

const TABLE_NAME: string = 'addresses'
const MODEL_SCHEMA: ModelSchema = addressModelSchema

class Address extends ActiveModel implements AddressInterface {
  tableName: string = TABLE_NAME
  modelSchema: ModelSchema = MODEL_SCHEMA
  validationSchema: ValidationSchema = addressValidationSchema

  data: AddressData = this.data as AddressData

  constructor(req: Request, data: AddressRow) {
    super(req, data, MODEL_SCHEMA)
  }

  static find = (req: Request, id: string): Address => {
    return new this(req, this._find(req, TABLE_NAME, id) as AddressRow)
  }

  static all = (req: Request): Array<Address> => {
    return this._all(req, TABLE_NAME).map(data => new this(req, data as AddressRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Address> => {
    return this._where(req, TABLE_NAME, conditions).map(data => new this(req, data as AddressRow))
  }

  static build = (req: Request, data?: AddressAttributes): Address => {
    if (data === undefined) { return new this(req, {} as AddressRow) }

    return new this(req, {
      id: this.generateID(),
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
