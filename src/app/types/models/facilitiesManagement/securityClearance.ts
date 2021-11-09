import SecurityClearance from '../../../models/static/facilitiesManagement/securityClearance/model'

export interface SecurityClearanceInterface {
  data: SecurityClearanceData
}

export type SecurityClearanceData = {
  id: string
  name: string
  description: string
}

export interface SecurityClearancesInterface {
  collection: Array<SecurityClearance>
}
