import ProcurementBuilding from '../procurementBuildings/model'
import procurementModelSchema from './modelSchema'
import procurementValidationSchema from './validationSchema'
import SecondaryRegion from '../../../static/facilitiesManagement/secondaryRegion/model'
import Service from '../../../static/facilitiesManagement/service/model'
import SuppliersSelector from '../../../../services/suppliersSelector'
import { ActiveModel, Condition, ModelSchema, Period, utils, ValidationSchema } from 'ccs-prototype-kit-model-interface'
import { ProcurementAttributes, ProcurementData, ProcurementInterface } from '../../../../types/models/active/facilitiesManagement/procurement'
import { ProcurementRow } from '../../../../types/data/activeTables'
import { Request } from 'express'

const TABLE_NAME: string = 'procurements'
const MODEL_SCHEMA: ModelSchema = procurementModelSchema

class Procurement extends ActiveModel implements ProcurementInterface {
  tableName: string = TABLE_NAME
  modelSchema: ModelSchema = MODEL_SCHEMA
  validationSchema: ValidationSchema = procurementValidationSchema

  data: ProcurementData = this.data as ProcurementData

  constructor(req: Request, data: ProcurementRow) {
    super(req, data, MODEL_SCHEMA)
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
    return new this(req, this._find(req, TABLE_NAME, id) as ProcurementRow)
  }

  static all = (req: Request): Array<Procurement> => {
    return this._all(req, TABLE_NAME).map(data => new this(req, data as ProcurementRow))
  }

  static where = (req: Request, conditions: Array<Condition>): Array<Procurement> => {
    return this._where(req, TABLE_NAME, conditions).map(data => new this(req, data as ProcurementRow))
  }

  services = (): Service[] => {
    return Service.where([{attribute: 'code', values: this.data.serviceCodes}])
  }

  regions = (): SecondaryRegion[] => {
    return SecondaryRegion.where([{attribute: 'code', values: this.data.regionCodes}])
  }

  static states = ['completed_search', 'entering_requirements', 'results', 'final_results']

  goToNextState = (): void => {
    const currentStateIndex: number = Procurement.states.indexOf(this.data.state as string)
    const nextSateIndex: number = currentStateIndex + 1

    if (nextSateIndex < Procurement.states.length) {
      this.data.state = Procurement.states[nextSateIndex]
    }
  }

  goToPreviousState = (): void => {
    const currentStateIndex: number = Procurement.states.indexOf(this.data.state as string)
    const previousSateIndex: number = currentStateIndex - 1

    if (previousSateIndex >= 0) {
      this.data.state = Procurement.states[previousSateIndex]
    }
  }

  beforeCreate = (): void => {
    this.data.state = Procurement.states[0]
    this.data.referenceNumber = `RM6232-${utils.addLeadingZeros(Math.floor(Math.random() * 1000000), 6)}-2022`
  }

  static periodEndDate = (startDate: Date, period: Period): Date => {
    let endDate: Date = utils.dateHelpers.addPeriodToDate(startDate, period)

    if (startDate.getDate() === endDate.getDate()) endDate = utils.dateHelpers.addPeriodToDate(endDate, {days: -1})

    return endDate
  }

  initialCallOffPeriod = (): number => {
    return (this.data.initialCallOffPeriodYears || 0) * 12 + (this.data.initialCallOffPeriodMonths || 0)
  }

  initialCallOffPeriodStartDate = (): Date => new Date(this.data.initialCallOffPeriodStartDate as string)

  initialCallOffPeriodEndDate = (): Date => {
    const initialCallOffPeriodStartDate: Date = this.initialCallOffPeriodStartDate()
    const period: Period = {
      years: this.data.initialCallOffPeriodYears,
      months: this.data.initialCallOffPeriodMonths
    }

    return Procurement.periodEndDate(initialCallOffPeriodStartDate, period)
  }

  mobilisationStartDate = (): Date => {
    const mobilisationEndDateValue: Date = this.mobilisationEndDate()
    mobilisationEndDateValue.setHours(0,0,0,0)

    const mobilisationPeriodDays: number = 7 * (this.data.mobilisationPeriod as number)

    return utils.dateHelpers.addPeriodToDate(mobilisationEndDateValue, {days: - mobilisationPeriodDays})
  }

  mobilisationEndDate = (): Date => {
    const initialCallOffPeriodStartDate: Date = this.initialCallOffPeriodStartDate()
    initialCallOffPeriodStartDate.setHours(0,0,0,0)

    return utils.dateHelpers.addPeriodToDate(initialCallOffPeriodStartDate, {days: - 1})
  }

  extensionPeriodStartDate = (extensionPeriod: number): Date => {
    const extensionPeriods: number[] = [...Array(extensionPeriod).keys()]

    const period: Period = {
      years: extensionPeriods.reduce((years: number, currentPeriod: number) => years + (this.callOffExtensionYears(currentPeriod) as number), 0),
      months: extensionPeriods.reduce((months: number, currentPeriod: number) => months + (this.callOffExtensionMonths(currentPeriod) as number), 0),
      days: 1
    }

    return utils.dateHelpers.addPeriodToDate(this.initialCallOffPeriodEndDate(), period)
  }

  extensionPeriodEndDate = (extensionPeriod: number): Date => {
    const extensionPeriods: number[] = [...Array(extensionPeriod+1).keys()]

    const period: Period = {
      years: extensionPeriods.reduce((years: number, currentPeriod: number) => years + (this.callOffExtensionYears(currentPeriod) as number), 0),
      months: extensionPeriods.reduce((months: number, currentPeriod: number) => months + (this.callOffExtensionMonths(currentPeriod) as number), 0),
    }

    return utils.dateHelpers.addPeriodToDate(this.initialCallOffPeriodEndDate(), period)
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

  status = (step: string): string => {
    switch(step) {
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
    case 'services':
      return 'completed'
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

  suppliersSelector = (): SuppliersSelector => {
    const serviceCodes = [...new Set(this.activeProcurementBuildings().reduce((serviceCodes: string[], procurementBuildings) => serviceCodes.concat(procurementBuildings.data.serviceCodes as string[]), []))]
    const buildingRegions = [...new Set(this.activeProcurementBuildings().map(procurementBuildings => procurementBuildings.building().data.region?.data.code as string))]

    return new SuppliersSelector(serviceCodes, buildingRegions, this.data.estimatedAnnualCost as number)
  }

  uniqueServiceNames = (): string[] => {
    const services: Service[] = this.activeProcurementBuildings().reduce((services: Service[], procurementBuildings) => services.concat(procurementBuildings.services()), []).sort((a, b) => a.data.code.localeCompare(b.data.code))

    return [...new Set(services.map(service => service.data.name))]
  }
}

export default Procurement
