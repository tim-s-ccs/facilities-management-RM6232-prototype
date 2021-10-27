import CustomValidator from '../validators/customValidator'
import InputValidator from '../validators/inputValidator'

export type Scheme = {
  attribute: string
  options: {[key: string]: any}
  errorMessages: {[key: string]: string}
}

export type InputScheme = Scheme & {
  validator: typeof InputValidator
}

export type CustomeScheme = Scheme & {
  validator: typeof CustomValidator
}

export type Schema = {
  inputValidations?: Array<InputScheme>
  customValidations?: Array<CustomeScheme>
}
