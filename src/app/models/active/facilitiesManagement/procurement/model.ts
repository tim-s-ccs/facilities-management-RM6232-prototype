import procurementModelSchema from './modelSchema'
import procurementValidationSchema from './validationSchema'
import { ActiveModel, Condition, ModelSchema, utils, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { ProcurementAttributes, ProcurementData, ProcurementInterface } from '../../../../types/models/active/facilitiesManagement/procurement'
import { ProcurementRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

class Procurement extends ActiveModel implements ProcurementInterface {
  static tableName: string = 'procurements'

  tableName: string = 'procurements'
  modelSchema: ModelSchema = procurementModelSchema
  validationSchema: ValidationSchema = procurementValidationSchema

  data: ProcurementData = this.data as ProcurementData

  constructor(data: ProcurementRow) {
    super(Procurement.initProcurementData(data))
  }

  static initProcurementData(data: ProcurementRow): ProcurementData {
    return {
      id: data.id,
      userID: data.userID,
      serviceCodes: data.serviceCodes === undefined ? [] : data.serviceCodes,
      regionCodes: data.regionCodes === undefined ? [] : data.regionCodes,
      estimatedAnnualCost: data.estimatedAnnualCost
    }
  }

  static build = (req: Request, data?: ProcurementAttributes): Procurement => {
    if (data === undefined) { return new this({} as ProcurementRow) }

    return new this({
      id: this.nextID(req, this.tableName),
      userID: req.session.data.user.id,
      serviceCodes: data.serviceCodes,
      regionCodes: data.regionCodes,
      estimatedAnnualCost: data.estimatedAnnualCost === undefined ? undefined : utils.cast(String(data.estimatedAnnualCost), Number)
    } as ProcurementRow)
  }

  static find = (req: Request, id: number): Procurement => {
    return new this(this._find(req, this.tableName, id) as ProcurementRow)
  }

  static all = (req: Request): Array<Procurement> => {
    return this._all(req, this.tableName).map(data => new this(data as ProcurementRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Procurement> => {
    return this._where(req, this.tableName, conditions).map(data => new this(data as ProcurementRow))
  }
}

export default Procurement
