import SecondaryRegion from '../secondaryRegion/model'
import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { PrimaryRegionData, PrimaryRegionInterface } from '../../../../types/models/static/facilitiesManagement/primaryRegion'

class PrimaryRegion extends StaticModel implements PrimaryRegionInterface {
  static tableName: string = 'primaryRegions'
  data: PrimaryRegionData = this.data as PrimaryRegionData

  secondaryRegions = (): Array<SecondaryRegion> => {
    return SecondaryRegion.where([{attribute: 'primary_region_code', value: this.data.code}])
  }

  static find = (id: number): PrimaryRegion => {
    return new this(this._find(this.tableName, id))
  }

  static all = (): Array<PrimaryRegion> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<PrimaryRegion> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }
}

export default PrimaryRegion