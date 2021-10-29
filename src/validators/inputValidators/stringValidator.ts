import InputValidator from '../inputValidator'
import { StringValidatorOptions } from '../../types/validatorOptions'


class StringValidator extends InputValidator {
  constructor(input: string, options: StringValidatorOptions) {
    super(input, options)
  }

  _validate = () => {
    const stringValidatorOptions = this.options as StringValidatorOptions

    if (stringValidatorOptions.required) {
      if (this.input === undefined || this.input.length === 0 || this.input.replace(/\s/g, '').length === 0) {
        this.error = 'required'

        return false
      }
    }
  
    if (this.input !== undefined) {
      if (this.input.length > stringValidatorOptions.maxLength) {
        this.error = 'tooLong'

        return false
      }

      if (stringValidatorOptions.pattern) {
        const regex = new RegExp(stringValidatorOptions.pattern)
    
        if (!regex.test(this.input)) {
          this.error = 'invalid'

          return false
        }
      }
    }
  
    return true
  }
}

export default StringValidator