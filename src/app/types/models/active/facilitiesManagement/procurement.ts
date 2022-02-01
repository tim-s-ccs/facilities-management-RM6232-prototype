import SecondaryRegion from '../../../../models/static/facilitiesManagement/secondaryRegion/model'
import Service from '../../../../models/static/facilitiesManagement/service/model'

export interface ProcurementInterface {
  data: ProcurementData
  services: () => Service[]
  regions: () => SecondaryRegion[]
}

export type ProcurementData = {
  id: number
  userID: number
  serviceCodes: Array<string>
  regionCodes: Array<string>
  estimatedAnnualCost?: number
  contractName?: string
  referenceNumber?: string
  state?: string
  updatedAt?: string
}

export type ProcurementAttributes = {
  serviceCodes?: Array<string>
  regionCodes?: Array<string>
  estimatedAnnualCost?: number
}