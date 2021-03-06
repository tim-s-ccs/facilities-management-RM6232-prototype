import RegionSelectionValidation, { regionSelectionValidationCondition } from './regionSelectionValidation'
import { ValidationSchema } from 'ccs-prototype-kit-model-interface'

const regionValidationSchema: ValidationSchema = {
  customValidations: [
    {
      attribute: 'base',
      validator: RegionSelectionValidation,
      options: {
        on: ['new', 'building-details'],
        conditions: [regionSelectionValidationCondition]
      },
      errorMessages: {
        notSelected: 'You must select a region for your address',
      }
    }
  ]
}

export default regionValidationSchema