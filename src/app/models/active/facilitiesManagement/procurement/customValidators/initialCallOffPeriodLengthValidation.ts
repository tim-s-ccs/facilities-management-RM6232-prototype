import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class InitialCallOffPeriodLengthValidation extends CustomValidator {
  model: Procurement = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate(): boolean {
    if (this.model.errors.initialCallOffPeriodYears !== undefined || this.model.errors.initialCallOffPeriodMonths !== undefined) return true

    if (this.model.initialCallOffPeriod() > 84 || this.model.initialCallOffPeriod() == 0) {
      this.error = 'initialCallOffPeriodLength'

      return false
    }

    return true
  }
}

export default InitialCallOffPeriodLengthValidation