import Model from '../model'
import { ValidatorOptions } from './validatorOptions'
export interface ValidatorInterface {
  options: ValidatorOptions
  condition: boolean
  error?: string
  valid(call: string): boolean
}

export interface InputValidatorInterface extends ValidatorInterface {
  input: any
}

export interface CustomValidatorInterface extends ValidatorInterface {
  model: Model
}
