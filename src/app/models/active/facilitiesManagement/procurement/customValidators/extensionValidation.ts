import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidationCondition, ValidatorOptions } from 'ccs-prototype-kit-model-interface'
import { ExtensionValidationOptions } from '../../../../../types/models/active/facilitiesManagement/procurement'

class ExtensionValidation extends CustomValidator {
  model: Procurement = this.model
  options: ExtensionValidationOptions = this.options

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate(): boolean {
    const extension: number = this.options.extension

    if (this.model.callOffExtensionError(extension)) return true

    if (this.model.callOffExtension(extension) == 0) {
      this.error = 'extensionLength'

      return false
    }

    return true
  }
}

const extensionRequired = (procurement: Procurement, extension: number): boolean => {
  return procurement.callOffExtensionRequired(extension)
}

const extension0Required: ValidationCondition = (procuement: Procurement): boolean => extensionRequired(procuement, 0)
const extension1Required: ValidationCondition = (procuement: Procurement): boolean => extensionRequired(procuement, 1)
const extension2Required: ValidationCondition = (procuement: Procurement): boolean => extensionRequired(procuement, 2)
const extension3Required: ValidationCondition = (procuement: Procurement): boolean => extensionRequired(procuement, 3)

export { extension0Required, extension1Required, extension2Required, extension3Required }
export default ExtensionValidation