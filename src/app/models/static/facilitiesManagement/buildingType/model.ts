import buildingTypes from '../../../../data/buildingTypes'
import StaticModel from '../../../../../framework/models/static/staticModel'
import { BuildingTypeData, BuildingTypeInterface } from '../../../../types/models/static/facilitiesManagement/buildingType'

class BuildingType extends StaticModel implements BuildingTypeInterface {
  data: BuildingTypeData

  constructor(id: number) {
    super(id, buildingTypes, 'BuildingType')

    this.data = this._record as BuildingTypeData
  }
}

export default BuildingType