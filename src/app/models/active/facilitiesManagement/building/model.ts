import ActiveModel from '../../../../../framework/models/active/activeModel'
import Address from '../address/model'
import buildingSchema from './schema'
import BuildingType from '../../../static/facilitiesManagement/buildingType/model'
import Region from '../region/model'
import SecurityClearance from '../../../static/facilitiesManagement/securityClearance/model'
import { BuildingData, BuildingInterface } from '../../../../types/models/active/facilitiesManagement/building'
import { BuildingRow, Tables } from '../../../../types/models/tables'

class Building extends ActiveModel implements BuildingInterface {
  tableName: string = 'buildings'
  data: BuildingData

  constructor(data: BuildingRow, tables: Tables) {
    super(buildingSchema)

    this.data = {
      id: data.id,
      userID: data.userID,
      name: data.name,
      description: data.description,
      address: Address.find(data.addressID, tables),
      region: data.regionID ? Region.find(data.regionID, tables) : undefined,
      gia: data.gia,
      externalArea: data.externalArea,
      buildingType: data.buildingTypeID ? new BuildingType(data.buildingTypeID) : undefined,
      securityClearance: data.securityClearanceID ? new SecurityClearance(data.securityClearanceID) : undefined,
      updatedAt: new Date(data.updatedAt),
      status: data.status 
    }
  }

  static find = (id: number, tables: Tables): Building => {
    return new this(this._find(id, tables.buildings, this.name) as BuildingRow, tables)
  }
}

export default Building
