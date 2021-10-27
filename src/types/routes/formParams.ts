import { ListError, ModelError } from '../model'

export type FormParams = {
  errors?: {[key: string]: ModelError}
  errorList?: Array<ListError>
}