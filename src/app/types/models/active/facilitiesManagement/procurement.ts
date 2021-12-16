export interface ProcurementInterface {
  data: ProcurementData
}

export type ProcurementData = {
  id: number
  userID: number
  serviceCodes: Array<string>
  regionCodes: Array<string>
  estimatedAnnualCost?: number
}

export type ProcurementAttributes = {
  serviceCodes?: Array<string>
  regionCodes?: Array<string>
  estimatedAnnualCost?: number
}