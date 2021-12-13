import Building from './model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class CombinedAreaValidation extends CustomValidator {
  model: Building = this.model as Building

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = () => {
    if (this.model.errors.gia === undefined && this.model.errors.externalArea === undefined) {
      if (this.model.data.gia !== undefined && this.model.data.externalArea !== undefined) {
        if (!((this.model.data.gia + this.model.data.externalArea) > 0)) {
          this.error = 'combinedAreaExternal'

          this.model.errors['gia'] = {
            error: 'combinedAreaInternal',
            errorMessage: 'Internal area must be greater than 0, if the external area is 0'
          }

          return false
        }
      }
    }

    return true
  }
}

export default CombinedAreaValidation