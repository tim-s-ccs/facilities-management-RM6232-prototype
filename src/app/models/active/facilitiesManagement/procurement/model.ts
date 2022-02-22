import ProcurementBuilding from '../procurementBuildings/model'
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

  constructor(req: Request, data: ProcurementRow) {
    super(req, Procurement.initProcurementData(req, data))
  }

  static initProcurementData = (req: Request, data: ProcurementRow): ProcurementData => {
    return {
      id: data.id,
      userID: data.userID,
      serviceCodes: data.serviceCodes === undefined ? [] : data.serviceCodes,
      regionCodes: data.regionCodes === undefined ? [] : data.regionCodes,
      estimatedAnnualCost: data.estimatedAnnualCost,
      contractName: data.contractName,
      referenceNumber: data.referenceNumber,
      tupe: data.tupe,
      initialCallOffPeriodYears: data.initialCallOffPeriodYears,
      initialCallOffPeriodMonths: data.initialCallOffPeriodMonths,
      initialCallOffPeriodStartDate: data.initialCallOffPeriodStartDate,
      mobilisationPeriodRequired: data.mobilisationPeriodRequired,
      mobilisationPeriod: data.mobilisationPeriod,
      optionalCallOffRequired: data.optionalCallOffRequired,
      extensionPeriodRequired0: data.extensionPeriodRequired0,
      extensionPeriodYears0: data.extensionPeriodYears0,
      extensionPeriodMonths0: data.extensionPeriodMonths0,
      extensionPeriodRequired1: data.extensionPeriodRequired1,
      extensionPeriodYears1: data.extensionPeriodYears1,
      extensionPeriodMonths1: data.extensionPeriodMonths1,
      extensionPeriodRequired2: data.extensionPeriodRequired2,
      extensionPeriodYears2: data.extensionPeriodYears2,
      extensionPeriodMonths2: data.extensionPeriodMonths2,
      extensionPeriodRequired3: data.extensionPeriodRequired3,
      extensionPeriodYears3: data.extensionPeriodYears3,
      extensionPeriodMonths3: data.extensionPeriodMonths3,
      procurementBuildings: data.procurementBuildingIDs === undefined ? [] :  ProcurementBuilding.where(req, [{attribute: 'id', values: data.procurementBuildingIDs}]),
      state: data.state,
      updatedAt: data.updatedAt
    }
  }

  static build = (req: Request, data?: ProcurementAttributes): Procurement => {
    if (data === undefined) { return new this(req, {} as ProcurementRow) }

    const newProcurement = new this(req, {
      id: this.generateID(),
      userID: req.session.data.user.id,
    } as ProcurementRow)

    newProcurement.assignAttributes(data as ProcurementData)

    return newProcurement
  }

  static find = (req: Request, id: string): Procurement => {
    return new this(req, this._find(req, this.tableName, id) as ProcurementRow)
  }

  static all = (req: Request): Array<Procurement> => {
    return this._all(req, this.tableName).map(data => new this(req, data as ProcurementRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Procurement> => {
    return this._where(req, this.tableName, conditions).map(data => new this(req, data as ProcurementRow))
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

  initialCallOffPeriod = (): number => {
    return (this.data.initialCallOffPeriodYears || 0) * 12 + (this.data.initialCallOffPeriodMonths || 0)
  }

  mobilisationStartDate = (): Date => {
    const mobilisationEndDateValue: Date = this.mobilisationEndDate()
    mobilisationEndDateValue.setHours(0,0,0,0)

    const mobilisationPeriodDays: number = 7 * (this.data.mobilisationPeriod as number)

    mobilisationEndDateValue.setDate(mobilisationEndDateValue.getDate() - mobilisationPeriodDays)

    return mobilisationEndDateValue
  }

  mobilisationEndDate = (): Date => {
    const initialCallOffPeriodStartDate: Date = new Date(this.data.initialCallOffPeriodStartDate as string)
    initialCallOffPeriodStartDate.setHours(0,0,0,0)

    initialCallOffPeriodStartDate.setDate(initialCallOffPeriodStartDate.getDate() - 1)

    return initialCallOffPeriodStartDate
  }

  callOffExtension = (extension: number): number | undefined => {
    const extensionYears: number | undefined = this.callOffExtensionYears(extension)
    const extensionMonths: number | undefined = this.callOffExtensionMonths(extension)

    if (extensionYears == undefined || extensionMonths == undefined) {
      return undefined
    } else {
      return (extensionYears * 12) + extensionMonths
    }
  }

  callOffExtensionRequired = (extension: number): boolean => {
    return this.data[`extensionPeriodRequired${extension}` as keyof typeof this.data] === true
  }

  callOffExtensionYears = (extension: number): number | undefined => {
    return this.data[`extensionPeriodYears${extension}` as keyof typeof this.data] as number
  }

  callOffExtensionMonths = (extension: number): number | undefined => {
    return this.data[`extensionPeriodMonths${extension}` as keyof typeof this.data] as number
  }

  callOffExtensionError = (extension: number): boolean => {
    return this.errors[`extensionPeriodYears${extension}`] !== undefined ||
           this.errors[`extensionPeriodMonths${extension}`] !== undefined ||
           this.errors[`extensionPeriod${extension}`] !== undefined
  }

  activeProcurementBuildings = (): Array<ProcurementBuilding> => {
    return (this.data.procurementBuildings as Array<ProcurementBuilding>).filter(procurementBuilding => procurementBuilding.data.active)
  }

  findOrBuildProcurementBuildings = (data: {[key: string]: any}) => {
    const buildingIDs: Array<string> = data['procurementBuildings'].map((buildingID: string) => buildingID) as Array<string>

    buildingIDs.forEach(buildingID => {
      if (ProcurementBuilding.where(this.req, [
        {attribute: 'procurementID', value: this.data.id},
        {attribute: 'buildingID', value: buildingID}
      ]).length === 0) {
        this.data.procurementBuildings?.push(
          ProcurementBuilding.build(this.req, {
            procurementID: this.data.id,
            buildingID: buildingID
          })
        )
      }
    })

    this.data.procurementBuildings?.forEach(procurementBuilding => procurementBuilding.data.active = buildingIDs.includes(procurementBuilding.data.buildingID))
  }

  status = (stage: string): string => {
    switch(stage) {
    case 'tupe':
      return this.data.tupe === undefined ? 'not started' : 'completed'
    case 'contract-period': {
      const relevantAttributes: any[] = [
        this.data.initialCallOffPeriodYears,
        this.data.initialCallOffPeriodMonths,
        this.data.initialCallOffPeriodStartDate,
        this.data.mobilisationPeriodRequired,
        this.data.optionalCallOffRequired
      ]

      if (relevantAttributes.every(element => element === undefined)) return 'not started'

      if (relevantAttributes.some(element => element === undefined)) return 'incomplete'

      return 'completed'
    }
    case 'buildings':
      return this.activeProcurementBuildings().length > 0 ? 'completed' : 'not started'
    case 'assigning-services-to-buildings':
      if (this.status('buildings') === 'not started') return 'cannot start'

      if (this.activeProcurementBuildings().some(procurementBuilding => {
        return procurementBuilding.data.serviceCodes === undefined ||
               procurementBuilding.data.serviceCodes.length === 0
      })) return 'incomplete'

      return 'completed'
    default:
      return 'cannot start'
    }
  }
}

export default Procurement
