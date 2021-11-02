import ActiveModel from '../../../../../framework/models/active/activeModel'
import Address from '../address/model'
import buildingSchema from './schema'
import BuildingType from '../../../static/facilitiesManagement/buildingType/model'
import Region from '../region/model'
import SecurityClearance from '../../../static/facilitiesManagement/securityClearance/model'
import { BuildingData, BuildingInterface } from '../../../../types/models/facilitiesManagement/building'

class Building extends ActiveModel implements BuildingInterface {
  data: BuildingData

  constructor(data: {[key: string]: any}) {
    super(buildingSchema)
    this.data = {
      id: data.id,
      name: data.name,
      description: data.description,
      address: new Address(data.address),
      region: new Region(data.region),
      gia: data.gia,
      externalArea: data.externalArea,
      buildingType: new BuildingType(data.buildingType),
      securityClearance: new SecurityClearance(data.securityClearance),
      updatedAt: new Date(data.updatedAt),
      status: data.status 
    }
  }
}

export default Building
