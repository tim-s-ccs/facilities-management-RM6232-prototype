import { ListError, ModelError } from '../../../framework/types/models/model'

export type ErrorParams = {
  errors: {[key: string]: ModelError}
  errorList: Array<ListError>
}