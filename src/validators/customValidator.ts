import Validator from '../validator'
import { CustomValidatorInterface } from '../types/validator'
import Model from '../model'

abstract class CustomValidator extends Validator implements CustomValidatorInterface {
  model: Model

  constructor(model: Model, options: {[key: string]: any}={}) {
    super(options)

    this.model = model
  }
}

export default CustomValidator