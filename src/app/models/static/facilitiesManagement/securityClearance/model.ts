import securityClearances from '../../../../data/securityClearances'
import StaticModel from '../../../../../framework/models/static/staticModel'
import { SecurityClearanceData, SecurityClearanceInterface } from '../../../../types/models/static/facilitiesManagement/securityClearance'

class SecurityClearance extends StaticModel implements SecurityClearanceInterface {
  data: SecurityClearanceData = this.data as SecurityClearanceData

  constructor(id: number) {
    super(id, securityClearances)
  }
}

export default SecurityClearance