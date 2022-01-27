import ServiceSelectionValidation from './customValidators/serviceSelectionValidation'
import { LengthValidator, LengthValidatorOptions, NumberValidator, NumberValidatorOptions, ValidationSchema } from 'ccs-prototype-kit-model-interface'

const serviceCodeLengthOptions: LengthValidatorOptions = {
  on: ['choose-services'],
  min: 1
}

const regionCodeLengthOptions: LengthValidatorOptions = {
  on: ['choose-regions'],
  min: 1
}

const estimatedAnnualCostOptions: NumberValidatorOptions = {
  on: ['annual-contract-value'],
  onlyInteger: true,
  greaterThan: 0,
  lessThan: 1_000_000_000_000
}

const procurementValidationSchema: ValidationSchema = {
  inputValidations: [
    {
      attribute: 'serviceCodes',
      validator: LengthValidator,
      options: serviceCodeLengthOptions,
      errorMessages: {
        greaterThan: 'Select at least one service you need to include in your procurement'
      }
    },
    {
      attribute: 'regionCodes',
      validator: LengthValidator,
      options: regionCodeLengthOptions,
      errorMessages: {
        greaterThan: 'Select at least one region you need to include in your procurement'
      }
    },
    {
      attribute: 'estimatedAnnualCost',
      validator: NumberValidator,
      options: estimatedAnnualCostOptions,
      errorMessages: {
        notANumber: 'The annual contract value must be a whole number greater than 0',
        notAnInteger: 'The annual contract value must be a whole number greater than 0',
        greaterThan: 'The annual contract value must be a whole number greater than 0',
        lessThan: 'The annual contract value must be less than 1,000,000,000,000 (1 trillion)'
      }
    }
  ],
  customValidations: [
    {
      attribute: 'serviceCodes',
      validator: ServiceSelectionValidation,
      options: {
        on: ['choose-services']
      },
      errorMessages: {
        invalidCleaning: '\'Mobile cleaning\' and \'Routine cleaning\' are the same, but differ by delivery method. Please choose one of these services only',
        invalidCafmHelpdeskBillable: 'You must select another service to include \'CAFM system\', \'Helpdesk services\' and/or \'Management of billable works\'',
        invalidMultipleCafm: 'Select only one CAFM service',
        invalidCafm: '\'CAFM – Soft FM Requirements\' can only be selected when all other services are of type Soft FM'
      }
    }
  ]
}

export default procurementValidationSchema