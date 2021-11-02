import securityClearances from '../../../../data/securityClearances'
import StaticModel from '../../../../../framework/models/static/staticModel'
import { SecurityClearanceData, SecurityClearanceInterface } from '../../../../types/models/facilitiesManagement/securityClearance'

class SecurityClearance extends StaticModel implements SecurityClearanceInterface {
  data: SecurityClearanceData

  constructor(id: string) {
    super(id, securityClearances)

    this.data = this._record as SecurityClearanceData
  }
}

export default SecurityClearance