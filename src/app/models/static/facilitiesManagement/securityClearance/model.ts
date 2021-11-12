import StaticModel from '../../../../../framework/models/static/staticModel'
import { Condition } from '../../../../../framework/types/models/model'
import { SecurityClearanceData, SecurityClearanceInterface } from '../../../../types/models/static/facilitiesManagement/securityClearance'

class SecurityClearance extends StaticModel implements SecurityClearanceInterface {
  static tableName: string = 'securityClearances'
  data: SecurityClearanceData = this.data as SecurityClearanceData

  static find = (id: number): SecurityClearance => {
    return new this(this._find(this.tableName, id))
  }

  static all = (): Array<SecurityClearance> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (condtitions: Array<Condition>): Array<SecurityClearance> => {
    return this._where(this.tableName, condtitions).map(data => new this(data))
  }
}

export default SecurityClearance