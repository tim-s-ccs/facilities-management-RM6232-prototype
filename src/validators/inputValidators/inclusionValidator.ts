import { InclusionValidatorOptions } from '../../types/validatorOptions'
import InputValidator from '../inputValidator'

class InclusionValidator extends InputValidator {
  constructor(input: string, options: InclusionValidatorOptions) {
    super(input, options)
  }

  _validate = (): boolean => {
    const inclusionValidatorOptions = this.options as InclusionValidatorOptions

    if (!inclusionValidatorOptions.in.includes(this.input)) {
      this.error = 'invalid'

      return false
    }

    return true
  }
}

export default InclusionValidator