import AddressSelectionValidation from './addressSelectionValidation'
import { Schema, StringValidator, StringValidatorOptions } from 'ccs-prototype-kit-model-interface'

const MAX_LENGTH: number = 255

const addressLine1Options: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: true,
  on: ['update_address']
}

const addressLine2Options: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: false,
  on: ['update_address']
}

const cityOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: true,
  on: ['update_address']
}

const countyOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: false,
  on: ['update_address']
}

const postCodeOptions: StringValidatorOptions = {
  maxLength: 8,
  required: true,
  pattern: '^(([A-Za-z][A-Za-z]{0,1})([0-9][A-Za-z0-9]{0,1})) {0,}(([0-9])([A-Za-z]{2}))$',
  on: ['update', 'update_address', 'building-details']
}

const addressSchema: Schema = {
  inputValidations: [
    {
      attribute: 'addressLine1',
      validator: StringValidator,
      options: addressLine1Options,
      errorMessages: {
        required: 'Enter your building or street name',
        tooLong: 'The building address must be 255 characters or less'
      }
    },

    {
      attribute: 'addressLine2',
      validator: StringValidator,
      options: addressLine2Options,
      errorMessages: {
        tooLong: 'The building street must be 255 characters or less'
      }
    },

    {
      attribute: 'city',
      validator: StringValidator,
      options: cityOptions,
      errorMessages: {
        required: 'Enter your town or city',
        tooLong: 'The town or city be must 255 characters or less'
      }
    },

    {
      attribute: 'county',
      validator: StringValidator,
      options: countyOptions,
      errorMessages: {
        tooLong: 'The county must be 255 characters or less'
      }
    },

    {
      attribute: 'postcode',
      validator: StringValidator,
      options: postCodeOptions,
      errorMessages: {
        required: 'Enter a valid postcode, for example SW1A 1AA',
        tooLong: 'Enter a valid postcode, for example SW1A 1AA',
        invalid: 'Enter a valid postcode, for example SW1A 1AA'
      }
    },
  ],
  customValidations: [
    {
      attribute: 'base',
      validator: AddressSelectionValidation,
      options: {
        on: ['update', 'building-details']
      },
      errorMessages: {
        notSelected: 'You must select an address to save your details',
      }
    }
  ]
}

export default addressSchema