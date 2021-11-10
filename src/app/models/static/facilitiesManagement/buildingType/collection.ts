import BuildingType from './model'
import buildingTypes from '../../../../data/buildingTypes'
import StaticCollection from '../../../../../framework/models/static/staticCollection'
import { BuildingTypesInterface } from '../../../../types/models/static/facilitiesManagement/buildingType'

class BuildingTypes extends StaticCollection implements BuildingTypesInterface {
  collection: Array<BuildingType>

  constructor() {
    super(buildingTypes, BuildingType)

    this.collection = this._collection as Array<BuildingType>
  }
}

export default new BuildingTypes()