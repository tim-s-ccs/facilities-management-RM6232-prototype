import AddressSelectionValidation from './addressSelectionValidation'
import StringValidator from '../../../../../framework/validation/validators/inputValidators/stringValidator'
import { Schema } from '../../../../../framework/types/validation/schema'

const MAX_LENGTH: number = 255

const addressSchema: Schema = {
  inputValidations: [
    {
      attribute: 'addressLine1',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: true,
        pattern: null,
        on: ['update_address']
      },
      errorMessages: {
        required: 'Enter your building or street name',
        tooLong: 'The building address must be 255 characters or less'
      }
    },

    {
      attribute: 'addressLine2',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: false,
        pattern: null,
        on: ['update_address']
      },
      errorMessages: {
        tooLong: 'The building street must be 255 characters or less'
      }
    },
  
    {
      attribute: 'city',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: true,
        pattern: null,
        on: ['update_address']
      },
      errorMessages: {
        required: 'Enter your town or city',
        tooLong: 'The town or city be must 255 characters or less'
      }
    },
  
    {
      attribute: 'county',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: false,
        pattern: null,
        on: ['update_address']
      },
      errorMessages: {
        tooLong: 'The county must be 255 characters or less'
      }
    },
  
    {
      attribute: 'postcode',
      validator: StringValidator,
      options: {
        max_length: 8,
        required: true,
        pattern: '^(([A-Za-z][A-Za-z]{0,1})([0-9][A-Za-z0-9]{0,1})) {0,}(([0-9])([A-Za-z]{2}))$',
        on: ['update', 'update_address']
      },
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
        on: ['update']
      },
      errorMessages: {
        notSelected: 'You must select an address to save your details',
      }
    }
  ]
}

export default addressSchema