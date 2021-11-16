import Address from './model'
import { CustomValidator, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class AddressSelectionValidation extends CustomValidator {
  constructor(model: Address, options: ValidatorOptions) {
    super(model, options)
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