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
