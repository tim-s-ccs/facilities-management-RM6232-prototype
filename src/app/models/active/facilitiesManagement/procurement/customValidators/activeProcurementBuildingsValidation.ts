import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class ActiveProcurementBuildingsValidation extends CustomValidator {
  model: Procurement = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate(): boolean {
    if (this.model.activeProcurementBuildings().length < 1) {
      this.error = 'greaterThan'

      return false
    }

    return true
  }
}

export default ActiveProcurementBuildingsValidation