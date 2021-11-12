import buildingTypes from '../../../../data/buildingTypes'
import StaticModel from '../../../../../framework/models/static/staticModel'
import { BuildingTypeData, BuildingTypeInterface } from '../../../../types/models/static/facilitiesManagement/buildingType'

class BuildingType extends StaticModel implements BuildingTypeInterface {
  data: BuildingTypeData = this.data as BuildingTypeData

  constructor(id: number) {
    super(id, buildingTypes)
  }
}

export default BuildingType