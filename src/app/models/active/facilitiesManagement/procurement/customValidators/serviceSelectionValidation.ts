import Procurement from '../model'
import Service from '../../../../static/facilitiesManagement/service/model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

const MANDATORY_SERVICES: string[] = ['Q.1', 'Q.2', 'R.1', 'S.1']
const ALL_SERVICE_TYPES: string[] = ['N.10']
const COMBINED_ALL_LOT_SERVICES: string[] = [...MANDATORY_SERVICES, ...ALL_SERVICE_TYPES]

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

      let mutableServiceCodes = serviceCodes

      MANDATORY_SERVICES.forEach(serviceCode => mutableServiceCodes = mutableServiceCodes.filter(item => item !== serviceCode))

      if (mutableServiceCodes.length === 0) {
        this.error = 'invalidCafmHelpdeskBillable'

        return false
      }

      if (serviceCodes.includes('Q.1')) {
        if(serviceCodes.includes('Q.2')) {
          this.error = 'invalidMultipleCafm'

          return false
        }

        if (Service.determineLotNumber(serviceCodes.filter(code => code !== 'Q.1')) !== '3') {
          mutableServiceCodes = serviceCodes

          mutableServiceCodes = mutableServiceCodes.filter(code => !COMBINED_ALL_LOT_SERVICES.includes(code))

          if (mutableServiceCodes.length > 0) {
            this.error = 'invalidCafm'

            return false
          }
        }
      }
    }

    return true
  }
}

export default ServiceSelectionValidation
