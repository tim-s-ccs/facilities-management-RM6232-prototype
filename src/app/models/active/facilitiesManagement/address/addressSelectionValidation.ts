import Address from './model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class AddressSelectionValidation extends CustomValidator {
  model: Address = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = () => {
    if (this.model.errors.postcode === undefined) {
      const addressModel = this.model as Address

      if (addressModel.data.addressLine1 === '' || addressModel.data.city === '') {
        this.error = 'notSelected'

        return false
      }
    }

    return true
  }
}

export default AddressSelectionValidation