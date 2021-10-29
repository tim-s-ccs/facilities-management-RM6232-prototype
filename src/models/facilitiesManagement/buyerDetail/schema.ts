import { Schema } from '../../../types/schema'
import InclusionValidator from '../../../validators/inputValidators/inclusionValidator'
import StringValidator from '../../../validators/inputValidators/stringValidator'

const MAX_LENGTH = 255

const buyerDetailSchema: Schema = {
  inputValidations: [
    {
      attribute: 'fullName',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: true,
        pattern: null,
        on: ['update']
      },
      errorMessages: {
        required: 'Enter your full name',
        tooLong: 'Your full name must be 255 characters or less'
      }
    },

    {
      attribute: 'jobTitle',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: true,
        pattern: null,
        on: ['update']
      },
      errorMessages: {
        required: 'Enter your job title',
        tooLong: 'Your job title must be 255 characters or less'
      }
    },
    
    {
      attribute: 'telephoneNumber',
      validator: StringValidator,
      options: {
        max_length: 15,
        required: true,
        pattern: '^[\\s()\\d-]{10,14}\\d$',
        on: ['update']
      },
      errorMessages: {
        required: 'Enter a UK telephone number, for example 020 7946 0000',
        tooLong: 'Enter a UK telephone number, for example 020 7946 0000',
        invalid: 'Enter a UK telephone number, for example 020 7946 0000'
      }
    },
    
    {
      attribute: 'organisationName',
      validator: StringValidator,
      options: {
        max_length: MAX_LENGTH,
        required: true,
        pattern: null,
        on: ['update']
      },
      errorMessages: {
        required: 'Enter your organisation name',
        tooLong: 'Your organisation name must be 255 characters or less'
      }
    },

    {
      attribute: 'centralGovernment',
      validator: InclusionValidator,
      options: {
        in: ['true', 'false'],
        on: ['update']
      },
      errorMessages: {
        invalid: 'Select the type of public sector organisation you’re buying for'
      }
    }
  ]
}

export default buyerDetailSchema