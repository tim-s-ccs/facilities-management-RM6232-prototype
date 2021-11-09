import SecurityClearance from './model'
import securityClearances from '../../../../data/securityClearances'
import StaticCollection from '../../../../../framework/models/static/staticCollection'
import { SecurityClearancesInterface } from '../../../../types/models/facilitiesManagement/securityClearance'

class SecurityClearances extends StaticCollection implements SecurityClearancesInterface {
  collection: Array<SecurityClearance>

  constructor() {
    super(securityClearances, SecurityClearance)

    this.collection = this._records as Array<SecurityClearance>
  }
}

export default new SecurityClearances()