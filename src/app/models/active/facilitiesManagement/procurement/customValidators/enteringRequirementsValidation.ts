import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class EnteringRequirementsValidation extends CustomValidator {
  model: Procurement = this.model

  STEPS_THAT_CAN_BE_INCOMPLETE = ['tupe', 'contract-period', 'buildings', 'assigning-services-to-buildings']

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate(): boolean {
    const incompleteSteps: string[] = this.STEPS_THAT_CAN_BE_INCOMPLETE.reduce((currentIncompleteSteps: string[], step) => {
      if (this.model.status(step) !== 'completed') currentIncompleteSteps.push(step)

      return currentIncompleteSteps
    }, [])

    if (incompleteSteps.length > 0) {
      const firstIncompleteStep = incompleteSteps.pop()

      this.error = `${firstIncompleteStep}_incomplete`
      this.attribute = firstIncompleteStep as string

      incompleteSteps.forEach(step => {
        const error: string  = `${step}_incomplete`

        this.model.addError(step, error, this.errorMessages[error])
      })

      return false
    }

    return true
  }
}

export default EnteringRequirementsValidation