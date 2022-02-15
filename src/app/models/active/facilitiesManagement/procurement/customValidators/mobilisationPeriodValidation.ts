import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, utils, ValidationCondition, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class MobilisationStartDateValidation extends CustomValidator {
  model: Procurement = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate(): boolean {
    if (this.model.mobilisationStartDate() <= utils.dateHelpers.getCurrentDate()) {
      this.error = 'startDateInvalid'

      return false
    }

    return true
  }
}

const mobilisationPeriodRequiredCondition: ValidationCondition = (procuement: Procurement): boolean => procuement.data.mobilisationPeriodRequired === true

const mobilisationPeriodCondition: ValidationCondition = (procurement: Procurement): boolean => {
  return procurement.errors.mobilisationPeriod === undefined &&
         procurement.errors.mobilisationPeriodRequired === undefined &&
         procurement.data.tupe === true
}

const mobilisationStartDateCondition: ValidationCondition = (procurement: Procurement): boolean => {
  return ['initialCallOffPeriodStartDate', 'mobilisationPeriod', 'mobilisationPeriodRequired'].every(attribute => procurement.errors[attribute] === undefined)
}

export { mobilisationPeriodRequiredCondition, mobilisationPeriodCondition, mobilisationStartDateCondition }
export default MobilisationStartDateValidation