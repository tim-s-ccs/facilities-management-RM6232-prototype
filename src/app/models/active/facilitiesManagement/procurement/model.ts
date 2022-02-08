import procurementModelSchema from './modelSchema'
import procurementValidationSchema from './validationSchema'
import SecondaryRegion from '../../../static/facilitiesManagement/secondaryRegion/model'
import Service from '../../../static/facilitiesManagement/service/model'
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
      estimatedAnnualCost: data.estimatedAnnualCost,
      contractName: data.contractName,
      referenceNumber: data.referenceNumber,
      state: data.state,
      updatedAt: data.updatedAt
    }
  }

  static build = (req: Request, data?: ProcurementAttributes): Procurement => {
    if (data === undefined) { return new this({} as ProcurementRow) }

    const newProcurement = new this({
      id: this.nextID(req, this.tableName),
      userID: req.session.data.user.id,
    } as ProcurementRow)

    newProcurement.assignAttributes(data as ProcurementData)

    return newProcurement
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

  services = (): Service[] => {
    return Service.where([{attribute: 'code', values: this.data.serviceCodes}])
  }

  regions = (): SecondaryRegion[] => {
    return SecondaryRegion.where([{attribute: 'code', values: this.data.regionCodes}])
  }

  static states = ['completed_search', 'entering_requirements', 'final_results']

  goToNextState = (): void => {
    const currentStateIndex: number = Procurement.states.indexOf(this.data.state as string)
    const nextSateIndex: number = currentStateIndex + 1

    if (nextSateIndex < Procurement.states.length) {
      this.data.state = Procurement.states[nextSateIndex]
    }
  }

  beforeCreate = (): void => {
    this.data.state = Procurement.states[0]
    this.data.referenceNumber = `RM6232-${utils.addLeadingZeros(Math.floor(Math.random() * 1000000), 6)}-2022`
  }
}

export default Procurement
