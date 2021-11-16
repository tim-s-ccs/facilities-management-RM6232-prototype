import { ListError, ModelError } from 'ccs-prototype-kit-model-interface'

export type ErrorParams = {
  errors: {[key: string]: ModelError}
  errorList: Array<ListError>
}