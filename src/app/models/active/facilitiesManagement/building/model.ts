import Address from '../address/model'
import buildingSchema from './schema'
import BuildingType from '../../../static/facilitiesManagement/buildingType/model'
import Region from '../region/model'
import SecurityClearance from '../../../static/facilitiesManagement/securityClearance/model'
import { ActiveModel, Condition } from 'ccs-prototype-kit-model-interface'
import { BuildingData, BuildingInterface } from '../../../../types/models/active/facilitiesManagement/building'
import { BuildingRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Building extends ActiveModel implements BuildingInterface {
  static tableName: string = 'buildings'
  tableName: string = 'buildings'
  data: BuildingData = this.data as BuildingData

  constructor(data: BuildingRow, req: Request) {
    super({
      id: data.id,
      userID: data.userID,
      name: data.name,
      description: data.description,
      address: Address.find(req, data.addressID),
      region: data.regionID ? Region.find(req, data.regionID) : undefined,
      gia: data.gia,
      externalArea: data.externalArea,
      buildingType: data.buildingTypeID ? BuildingType.find(data.buildingTypeID) : undefined,
      securityClearance: data.securityClearanceID ? SecurityClearance.find(data.securityClearanceID) : undefined,
      updatedAt: data.updatedAt,
      status: data.status
    } as BuildingData, buildingSchema)
  }

  static find = (req: Request, id: number): Building => {
    return new this(this._find(req, this.tableName, id) as BuildingRow, req)
  }

  static all = (req: Request): Array<Building> => {
    return this._all(req, this.tableName).map(data => new this(data as BuildingRow, req))
  }

  static where = (req: Request, condtitions: Array<Condition>): Array<Building> => {
    return this._where(req, this.tableName, condtitions).map(data => new this(data as BuildingRow, req))
  }
}

export default Building
