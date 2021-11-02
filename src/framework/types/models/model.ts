import { Schema } from '../validation/schema'

export interface ModelInterface {
  data: ModelData
}

export interface ActiveModelInterface {
  schema: Schema,
  errors: {[key: string]: ModelError}
  attributes(): object
  validate(call: string): boolean
  errorList(): Array<ListError>
}

export interface StaticModelInterface {
}

export type ModelData = {
  [key: string]: any
}

export type ModelError = {
  error: string
  errorMessage: string
}

export type ListError = {
  text: string
  href: string
}
