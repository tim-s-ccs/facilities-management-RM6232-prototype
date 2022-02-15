import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class TotalContractPeriodValidation extends CustomValidator {
  model: Procurement = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate(): boolean {
    if (Object.keys(this.model.errors).length > 0) return true

    const initalCallOffPeriod: number = this.model.initialCallOffPeriod() * 13
    const mobilisationPeriod: number = this.model.data.mobilisationPeriodRequired ? (this.model.data.mobilisationPeriod as number) * 3 : 0

    let callOffExtensionPeriod: number = 0

    if (this.model.data.optionalCallOffRequired) {
      const extensions: number[] = [0, 1, 2, 3]

      extensions.forEach(extension => {
        if (this.model.callOffExtensionRequired(extension)) {
          callOffExtensionPeriod += this.model.callOffExtension(extension) as number * 13
        } else {
          return
        }
      })
    }

    const totalContractPeriod = initalCallOffPeriod + mobilisationPeriod + callOffExtensionPeriod

    if (totalContractPeriod > 1560) {
      this.error = 'totalContractPeriod'

      return false
    }

    return true
  }
}

export default TotalContractPeriodValidation


// def total_contract_length
// return if errors.any?

// start_date = mobilisation_period_required ? mobilisation_start_date : initial_call_off_start_date

// end_date = initial_call_off_end_date

// end_date += call_off_extensions.select(&:extension_required).sum(&:period) if extensions_required

// return if end_date <= start_date + 10.years

// errors.add(:base, :total_contract_length)
// end