import Procurement from '../model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

const MANDATORY_SERVICES: string[] = ['P.1', 'P.2', 'Q.1', 'R.1']

class ServiceSelectionValidation extends CustomValidator {
  model: Procurement = this.model

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = () => {
    if (this.model.errors.serviceCodes === undefined) {
      const serviceCodes = this.model.data.serviceCodes

      if (serviceCodes.includes('I.1') && serviceCodes.includes('I.4')) {
        this.error = 'invalidCleaning'

        return false
      }

      let serviceCodesNoMandatory = serviceCodes

      MANDATORY_SERVICES.forEach(serviceCode => serviceCodesNoMandatory = serviceCodesNoMandatory.filter(item => item !== serviceCode))

      if (serviceCodesNoMandatory.length === 0) {
        this.error = 'invalidCafmHelpdeskBillable'

        return false
      }

      if (serviceCodes.includes('P.1')) {
        // TODO: Add validations after somthing else
      }
    }

    return true
  }
}

export default ServiceSelectionValidation
