import { BuildingTypeData, BuildingTypeInterface } from '../../../../types/models/static/facilitiesManagement/buildingType'
import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'

class BuildingType extends StaticModel implements BuildingTypeInterface {
  static tableName: string = 'buildingTypes'
  static primaryKey: string = 'id'

  data: BuildingTypeData = this.data as BuildingTypeData

  static find = (id: string): BuildingType => {
    return new this(this._find(this.tableName, this.primaryKey, id))
  }

  static all = (): Array<BuildingType> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<BuildingType> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }
}

export default BuildingType