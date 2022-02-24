import Address from '../address/model'
import buildingModelSchema from './modelSchema'
import buildingValidationSchema from './validationSchema'
import Region from '../region/model'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { BuildingAttributes, BuildingData, BuildingInterface } from '../../../../types/models/active/facilitiesManagement/building'
import { BuildingRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

const TABLE_NAME: string = 'buildings'
const MODEL_SCHEMA: ModelSchema = buildingModelSchema

class Building extends ActiveModel implements BuildingInterface {
  tableName: string = TABLE_NAME
  modelSchema: ModelSchema = MODEL_SCHEMA
  validationSchema: ValidationSchema = buildingValidationSchema

  data: BuildingData = this.data as BuildingData

  constructor(req: Request, data: BuildingRow) {
    super(req, data, MODEL_SCHEMA)
  }

  static build = (req: Request, data?: BuildingAttributes): Building => {
    if (data === undefined) { return new this(req, {} as BuildingRow) }

    const building = new this(req, {
      id: this.generateID(),
      userID: req.session.data.user.id,
      name: data.name,
      description: data.description,
    } as BuildingRow)

    if (data.address !== undefined) {
      building.data.address = Address.build(req, data.address)
    }

    if (data.region !== undefined) {
      building.data.region = Region.build(req, data.region)
    }

    return building
  }

  static find = (req: Request, id: string): Building => {
    return new this(req, this._find(req, TABLE_NAME, id) as BuildingRow)
  }

  static all = (req: Request): Array<Building> => {
    return this._all(req, TABLE_NAME).map(data => new this(req, data as BuildingRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Building> => {
    return this._where(req, TABLE_NAME, conditions).map(data => new this(req, data as BuildingRow))
  }

  beforeSave = () => {
    this.data.buildingComplete = this.isBuildingComplete()
  }

  isBuildingComplete = (): boolean => {
    return [this.data.name, this.data.address, this.data.region, this.data.gia, this.data.buildingType, this.data.securityClearance].every(attribute => attribute !== undefined)
  }
}

export default Building
