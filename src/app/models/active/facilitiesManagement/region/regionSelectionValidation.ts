import Address from '../address/model'
import Region from './model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidationCondition, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

class RegionSelectionValidation extends CustomValidator {
  model: Region = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = () => {
    if (this.model.errors.postcode === undefined) {
      if (this.model.data.name === '' || this.model.data.code === '') {
        this.error = 'notSelected'

        return false
      }
    }

    return true
  }
}

const regionSelectionValidationCondition: ValidationCondition = (addressModel: Address): boolean =>  addressModel.data.addressLine1 !== '' && addressModel.data.city !== ''

export { regionSelectionValidationCondition }
export default RegionSelectionValidation