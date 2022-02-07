import Address from '../address/model'
import buildingModelSchema from './modelSchema'
import BuildingType from '../../../static/facilitiesManagement/buildingType/model'
import buildingValidationSchema from './validationSchema'
import Region from '../region/model'
import SecurityClearance from '../../../static/facilitiesManagement/securityClearance/model'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { BuildingAttributes, BuildingData, BuildingInterface } from '../../../../types/models/active/facilitiesManagement/building'
import { BuildingRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Building extends ActiveModel implements BuildingInterface {
  static tableName: string = 'buildings'

  tableName: string = 'buildings'
  modelSchema: ModelSchema = buildingModelSchema
  validationSchema: ValidationSchema = buildingValidationSchema

  data: BuildingData = this.data as BuildingData

  constructor(data: BuildingRow, req: Request) {
    super(Building.initBuildingData(data, req))
  }

  static initBuildingData(data: BuildingRow, req: Request): BuildingData {
    return {
      id: data.id,
      userID: data.userID,
      name: data.name,
      description: data.description,
      address: data.addressID ? Address.find(req, data.addressID) : undefined,
      region: data.regionID ? Region.find(req, data.regionID) : undefined,
      gia: data.gia,
      externalArea: data.externalArea,
      buildingType: data.buildingTypeID ? BuildingType.find(data.buildingTypeID) : undefined,
      securityClearance: data.securityClearanceID ? SecurityClearance.find(data.securityClearanceID) : undefined,
      updatedAt: data.updatedAt,
      buildingComplete: data.buildingComplete
    }
  }

  static build = (req: Request, data?: BuildingAttributes): Building => {
    if (data === undefined) { return new this({} as BuildingRow, req) }

    const building = new this({
      id: this.nextID(req, this.tableName),
      userID: req.session.data.user.id,
      name: data.name,
      description: data.description,
    } as BuildingRow, req)

    if (data.address !== undefined) {
      building.data.address = Address.build(req, data.address)
    }

    if (data.region !== undefined) {
      building.data.region = Region.build(req, data.region)
    }

    return building
  }

  static find = (req: Request, id: number): Building => {
    return new this(this._find(req, this.tableName, id) as BuildingRow, req)
  }

  static all = (req: Request): Array<Building> => {
    return this._all(req, this.tableName).map(data => new this(data as BuildingRow, req))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Building> => {
    return this._where(req, this.tableName, conditions).map(data => new this(data as BuildingRow, req))
  }

  beforeSave = () => {
    this.data.buildingComplete = this.isBuildingComplete()
  }

  isBuildingComplete = (): boolean => {
    return [this.data.name, this.data.address, this.data.region, this.data.gia, this.data.buildingType, this.data.securityClearance].every(attribute => attribute !== undefined)
  }
}

export default Building
