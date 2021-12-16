import Procurement from '../../../models/active/facilitiesManagement/procurement/model'
import { ErrorParams } from '../formParams'

export type ProcurementNewParams = {
  procurement: Procurement
  backLink: string
  lotNumber: string
  selectedSuppliersNames: string[]
  summaries: {
    services: {
      title: string
      summaryContent: string
    }
    regions: {
      title: string
      summaryContent: string
    }
    estimatedAnnualCost: {
      value: string
      changeLink: string
    }
  }
}

export type ProcurementCreateParams = ErrorParams & ProcurementNewParams