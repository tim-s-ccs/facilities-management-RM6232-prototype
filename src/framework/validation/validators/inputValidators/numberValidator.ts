import InputValidator from '../inputValidator'
import { NumberValidatorOptions } from '../../../types/validation/validator'

class NumberValidator extends InputValidator {
  options: NumberValidatorOptions = this.options as NumberValidatorOptions

  constructor(input: number, options: NumberValidatorOptions) {
    super(input, options)
  }

  _validate = () => {
    if (isNaN(this.input)) {
      this.error = 'notANumber'

      return false
    }

    if (this.options.onlyInteger && !Number.isInteger(this.input)) {
      this.error = 'notAnInteger'

      return false
    }

    if (this.options.greaterThan !== undefined && this.input < this.options.greaterThan) {
      this.error = 'greaterThan'

      return false
    }

    if (this.options.lessThan !== undefined && this.input > this.options.lessThan) {
      this.error = 'lessThan'

      return false
    }

    return true
  }
}

export default NumberValidator


// const Validator = require('./validator')

// class NumberValidator extends Validator {
//   constructor(input, call, options) {
//     super(input, call, options)
//   }

//   _validate() {
//     if (this.input === undefined || this.input.length === 0 || this.input.replace(/\s/g, '').length === 0) {
//       this.error = 'required'

//       return false
//     }

//     this.input = Number(this.input)

//     if (isNaN(this.input)) {
//       this.error = 'notANumber'

//       return false
//     }

//     if (this.options.onlyInteger !== undefined && !Number.isInteger(this.input)){
//       this.error = 'notAnInteger'

//       return false
//     }

//     if (this.options.greaterThan !== undefined && this.input < this.options.greaterThan) {
//       this.error = 'greaterThan'

//       return false
//     }

//     if (this.options.lessThan !== undefined && this.input > this.options.lessThan) {
//       this.error = 'lessThan'

//       return false
//     }

//     return true
//   }
// }

// module.exports = NumberValidator
