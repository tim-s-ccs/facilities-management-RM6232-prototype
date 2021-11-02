import Model from '../../models/model'

export type ValidatorOptions = {
  on?: string[]
  condition?: boolean
}

export type StringValidatorOptions = ValidatorOptions & {
  required: boolean
  maxLength: number
  pattern?: string
}

export type InclusionValidatorOptions = ValidatorOptions & {
  in: string[]
}


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
