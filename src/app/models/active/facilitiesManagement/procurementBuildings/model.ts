import Building from '../building/model'
import Procurement from '../procurement/model'
import procurementBuildingModelSchema from './modelSchema'
import procurementBuildingValidationSchema from './validationSchema'
import Service from '../../../static/facilitiesManagement/service/model'
import { ActiveModel, Condition, ModelSchema, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { ProcurementBuildingAttributes, ProcurementBuildingData, ProcurementBuildingInterface } from '../../../../types/models/active/facilitiesManagement/procurementBuilding'
import { ProcurementBuildingRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class ProcurementBuilding extends ActiveModel implements ProcurementBuildingInterface {
  static tableName: string = 'procurementBuildings'

  tableName: string = 'procurementBuildings'
  modelSchema: ModelSchema = procurementBuildingModelSchema
  validationSchema: ValidationSchema = procurementBuildingValidationSchema

  data: ProcurementBuildingData = this.data as ProcurementBuildingData

  constructor(req: Request, data: ProcurementBuildingRow) {
    super(req, ProcurementBuilding.initProcurementBuildingData(req, data))
  }

  static initProcurementBuildingData = (req: Request, data: ProcurementBuildingRow): ProcurementBuildingData => {
    return {
      id: data.id,
      procurementID: data.procurementID,
      buildingID: data.buildingID,
      active: data.active,
      serviceCodes: data.serviceCodes === undefined ? [] : data.serviceCodes,
    }
  }

  static build = (req: Request, data: ProcurementBuildingAttributes): ProcurementBuilding => {
    return new this(req, {
      id: this.generateID(),
      procurementID: data.procurementID,
      buildingID: data.buildingID,
      active: true
    } as ProcurementBuildingRow)
  }

  static find = (req: Request, id: string): ProcurementBuilding => {
    return new this(req, this._find(req, this.tableName, id) as ProcurementBuildingRow)
  }

  static all = (req: Request): Array<ProcurementBuilding> => {
    return this._all(req, this.tableName).map(data => new this(req, data as ProcurementBuildingRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<ProcurementBuilding> => {
    return this._where(req, this.tableName, conditions).map(data => new this(req, data as ProcurementBuildingRow))
  }

  services = (): Service[] => {
    return Service.where([{attribute: 'code', values: this.data.serviceCodes}])
  }

  procurement = (): Procurement => {
    return Procurement.find(this.req, this.data.procurementID)
  }

  building = (): Building => {
    return Building.find(this.req, this.data.buildingID)
  }

  buildingName = (): string => {
    return this.building().data.name as string
  }

  isCompleted = (): boolean => {
    return this.services().length > 0
  }
}

export default ProcurementBuilding