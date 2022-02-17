import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { SecondaryRegionData, SecondaryRegionInterface } from '../../../../types/models/static/facilitiesManagement/secondaryRegion'

class SecondaryRegion extends StaticModel implements SecondaryRegionInterface {
  static tableName: string = 'secondaryRegions'
  static primaryKey: string = 'code'

  data: SecondaryRegionData = this.data as SecondaryRegionData

  static find = (code: string): SecondaryRegion => {
    return new this(this._find(this.tableName, this.primaryKey, code))
  }

  static all = (): Array<SecondaryRegion> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<SecondaryRegion> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }
}

export default SecondaryRegion