import BuildingType from './model'
import buildingTypes from '../../../../data/buildingTypes'
import StaticCollection from '../../../../../framework/models/static/staticCollection'
import { BuildingTypesInterface } from '../../../../types/models/static/facilitiesManagement/buildingType'

class BuildingTypes extends StaticCollection implements BuildingTypesInterface {
  collection: Array<BuildingType> = this.collection as Array<BuildingType>

  constructor() {
    super(buildingTypes, BuildingType)
  }
}

export default new BuildingTypes()