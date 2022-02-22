import ProcurementBuilding from '../../../../models/active/facilitiesManagement/procurementBuildings/model'
import SecondaryRegion from '../../../../models/static/facilitiesManagement/secondaryRegion/model'
import Service from '../../../../models/static/facilitiesManagement/service/model'
import { ValidatorOptions } from 'ccs-prototype-kit-model-interface'

export interface ProcurementInterface {
  data: ProcurementData
  services: () => Service[]
  regions: () => SecondaryRegion[]
  goToNextState: () => void
  initialCallOffPeriod: () => number
  mobilisationStartDate: () => Date
  mobilisationEndDate: () => Date
  callOffExtension: (extension: number) => number | undefined
  callOffExtensionRequired: (extension: number) => boolean
  callOffExtensionYears: (extension: number) => number | undefined
  callOffExtensionMonths: (extension: number) => number | undefined
  callOffExtensionError: (extension: number) => boolean
  activeProcurementBuildings: () => Array<ProcurementBuilding>
  findOrBuildProcurementBuildings: (data: {[key: string]: any}) => void
  status: (section: string) => string
}

export type ProcurementData = {
  id: string
  userID: string
  serviceCodes: Array<string>
  regionCodes: Array<string>
  estimatedAnnualCost?: number
  contractName?: string
  referenceNumber?: string
  tupe?: boolean
  initialCallOffPeriodYears?: number
  initialCallOffPeriodMonths?: number
  initialCallOffPeriodStartDate?: string
  mobilisationPeriodRequired?: boolean
  mobilisationPeriod?: number
  optionalCallOffRequired?: boolean
  extensionPeriodRequired0?: boolean
  extensionPeriodYears0?: number
  extensionPeriodMonths0?: number
  extensionPeriodRequired1?: boolean
  extensionPeriodYears1?: number
  extensionPeriodMonths1?: number
  extensionPeriodRequired2?: boolean
  extensionPeriodYears2?: number
  extensionPeriodMonths2?: number
  extensionPeriodRequired3?: boolean
  extensionPeriodYears3?: number
  extensionPeriodMonths3?: number
  procurementBuildings?: Array<ProcurementBuilding>
  state?: string
  updatedAt?: string
}

export type ProcurementAttributes = {
  serviceCodes?: Array<string>
  regionCodes?: Array<string>
  estimatedAnnualCost?: number
}

export type ExtensionValidationOptions = ValidatorOptions & {
  extension: number
}
