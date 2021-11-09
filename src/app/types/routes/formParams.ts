import { ListError, ModelError } from '../../../framework/types/models/model'

export type FormParams = {
  errors?: {[key: string]: ModelError}
  errorList?: Array<ListError>
}