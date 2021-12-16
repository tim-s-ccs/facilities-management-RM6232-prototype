import Procurement from '../model'
import Service from '../../../../static/facilitiesManagement/service/model'
import { ActiveModel, CustomValidator, ErrorMessages, ValidatorOptions } from 'ccs-prototype-kit-model-interface'

const MANDATORY_SERVICES: string[] = ['P.1', 'P.2', 'Q.1', 'R.1']
const LANDSCAPING_SERVICES: string[] = ['G.1', 'G.2', 'G.3', 'G.4', 'G.5', 'G.6', 'G.7', 'G.8']
const COMBINED_ALL_LOT_SERVICES: string[] = [...MANDATORY_SERVICES, ...LANDSCAPING_SERVICES]


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

      if (serviceCodes.includes('P.1')) {
        if(serviceCodes.includes('P.2')) {
          this.error = 'invalidMultipleCafm'

          return false
        }

        if (Service.determineLotNumber(serviceCodes.filter(code => code !== 'P.1')) !== '3') {
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
