import { Schema } from './schema'

export interface ModelInterface {
  data: {[key: string]: any}
  schema: Schema,
  errors: {[key: string]: ModelError}
  attributes(): object
  validate(call: string): boolean
  errorList(): Array<ListError>
}

export type ModelError = {
  error: string
  errorMessage: string
}

export type ListError = {
  text: string
  href: string
}