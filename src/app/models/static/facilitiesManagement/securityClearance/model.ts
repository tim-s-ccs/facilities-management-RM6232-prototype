import securityClearances from '../../../../data/securityClearances'
import StaticModel from '../../../../../framework/models/static/staticModel'
import { SecurityClearanceData, SecurityClearanceInterface } from '../../../../types/models/static/facilitiesManagement/securityClearance'

class SecurityClearance extends StaticModel implements SecurityClearanceInterface {
  data: SecurityClearanceData

  constructor(id: number) {
    super(id, securityClearances, 'SecurityClearance')

    this.data = this._record as SecurityClearanceData
  }
}

export default SecurityClearance