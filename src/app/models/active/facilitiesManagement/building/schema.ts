import CombinedAreaValidation from './combinedAreaValidation'
import NumberValidator from '../../../../../framework/validation/validators/inputValidators/numberValidator'
import StringValidator from '../../../../../framework/validation/validators/inputValidators/stringValidator'
import { NumberValidatorOptions, StringValidatorOptions } from '../../../../../framework/types/validation/validator'
import { Schema } from '../../../../../framework/types/validation/schema'

const MAX_AREA: number = 1000000000
const MIN_AREA: number = 0
const MAX_LENGTH: number = 50

const nameOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: true,
  on: ['building-details']
}

const descriptionOptions: StringValidatorOptions = {
  maxLength: MAX_LENGTH,
  required: false,
  on: ['building-details']
}

const areaOptions: NumberValidatorOptions = {
  onlyInteger: true,
  greaterThan: MIN_AREA,
  lessThan: MAX_AREA,
  on: ['area']
}

const buildingSchema: Schema = {
  inputValidations: [
    {
      attribute: 'name',
      validator: StringValidator,
      options: nameOptions,
      errorMessages: {
        required: 'Enter a name for your building',
        tooLong: 'Building name must be 50 characters or less'
      }
    },
    {
      attribute: 'description',
      validator: StringValidator,
      options: descriptionOptions,
      errorMessages: {
        tooLong: 'Building description must be 50 characters or less'
      }
    },
    {
      attribute: 'gia',
      validator: NumberValidator,
      options: areaOptions,
      errorMessages: {
        notANumber: 'Gross Internal Area (GIA) must be a whole number',
        notAnInteger: 'Gross Internal Area (GIA) must be a whole number',
        greaterThan: 'Internal area must be a number between 0 and 999,999,999',
        lessThan: 'Internal area must be a number between 0 and 999,999,999'
      }
    },

    {
      attribute: 'externalArea',
      validator: NumberValidator,
      options: areaOptions,
      errorMessages: {
        notANumber: 'External area must be a whole number',
        notAnInteger: 'External area must be a whole number',
        greaterThan: 'External area must be a number between 0 and 999,999,999',
        lessThan: 'External area must be a number between 0 and 999,999,999'
      }
    }
  ],
  customValidations: [
    {
      attribute: 'externalArea',
      validator: CombinedAreaValidation,
      options: {
        on: ['area']
      },
      errorMessages: {
        combinedAreaExternal: 'External area must be greater than 0, if the internal area is 0'
      }
    }
  ],
  staticModelValidations: [
    {
      attribute: 'buildingType',
      options: {
        on: ['building-type']
      },
      errorMessages: {
        required: 'You must select a building type'
      }
    },
    {
      attribute: 'securityClearance',
      options: {
        on: ['security-clearance']
      },
      errorMessages: {
        required: 'You must select a security clearance level'
      }
    }
  ]
}

export default buildingSchema