import ActiveCollection from '../../../../../framework/models/active/activeCollection'
import Building from './model'
import { BuildingData } from '../../../../types/models/facilitiesManagement/building'

class Buildings extends ActiveCollection {
  constructor(data: Array<BuildingData>) {
    super(data, Building)
  }
}

export default Buildings