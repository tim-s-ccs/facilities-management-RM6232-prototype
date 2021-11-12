import SecurityClearance from './model'
import securityClearances from '../../../../data/securityClearances'
import StaticCollection from '../../../../../framework/models/static/staticCollection'
import { SecurityClearancesInterface } from '../../../../types/models/static/facilitiesManagement/securityClearance'

class SecurityClearances extends StaticCollection implements SecurityClearancesInterface {
  collection: Array<SecurityClearance> = this.collection as Array<SecurityClearance>

  constructor() {
    super(securityClearances, SecurityClearance)
  }
}

export default new SecurityClearances()