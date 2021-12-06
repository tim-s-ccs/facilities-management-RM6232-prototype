import { InclusionValidator, InclusionValidatorOptions, StringValidator, StringValidatorOptions, ValidationSchema } from 'ccs-prototype-kit-model-interface'

const MAX_LENGTH: number = 255

const fullNameOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: true,
  on: ['update']
}

const jobTitleOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: true,
  on: ['update']
}

const telephoneNumberOptions: StringValidatorOptions = {
  maxLength: 15,
  required: true,
  pattern: '^[\\s()\\d-]{10,14}\\d$',
  on: ['update']
}

const organisationNameOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: true,
  on: ['update']
}

const centralGovernmentOptions: InclusionValidatorOptions = {
  in: [true, false],
  on: ['update']
}

const buyerDetailValidationSchema: ValidationSchema = {
  inputValidations: [
    {
      attribute: 'fullName',
      validator: StringValidator,
      options: fullNameOptions,
      errorMessages: {
        required: 'Enter your full name',
        tooLong: 'Your full name must be 255 characters or less'
      }
    },

    {
      attribute: 'jobTitle',
      validator: StringValidator,
      options: jobTitleOptions,
      errorMessages: {
        required: 'Enter your job title',
        tooLong: 'Your job title must be 255 characters or less'
      }
    },

    {
      attribute: 'telephoneNumber',
      validator: StringValidator,
      options: telephoneNumberOptions,
      errorMessages: {
        required: 'Enter a UK telephone number, for example 020 7946 0000',
        tooLong: 'Enter a UK telephone number, for example 020 7946 0000',
        invalid: 'Enter a UK telephone number, for example 020 7946 0000'
      }
    },

    {
      attribute: 'organisationName',
      validator: StringValidator,
      options: organisationNameOptions,
      errorMessages: {
        required: 'Enter your organisation name',
        tooLong: 'Your organisation name must be 255 characters or less'
      }
    },

    {
      attribute: 'centralGovernment',
      validator: InclusionValidator,
      options: centralGovernmentOptions,
      errorMessages: {
        invalid: 'Select the type of public sector organisation you’re buying for'
      }
    }
  ]
}

export default buyerDetailValidationSchema