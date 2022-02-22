import { LengthValidator, LengthValidatorOptions, ValidationSchema } from 'ccs-prototype-kit-model-interface'


const serviceCodesOptions: LengthValidatorOptions = {
  on: ['services'],
  min: 1
}


const procurementBuildingValidationSchema: ValidationSchema = {
  inputValidations: [
    {
      attribute: 'serviceCodes',
      validator: LengthValidator,
      options: serviceCodesOptions,
      errorMessages: {
        greaterThan: 'You must select at least one service for this building'
      }
    }
  ]
}

export default procurementBuildingValidationSchema