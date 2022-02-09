import Procurement from '../../../models/active/facilitiesManagement/procurement/model'
import { ErrorParams } from '../formParams'
import { ProcurementAdvancedRowItems, ProcurementEditPageDescription, ProcurementSearchRowItems, ProcurementShowPageDescription } from '../../utils/pageSetup/procurementSetup'

export type ProcurementNewParams = {
  procurement: Procurement
  backLink: string
  lotNumber: string
  selectedSuppliersNames: string[]
  summaries: {
    services: {
      numberSelected: number,
      summaryContent: string,
      changeLink: string
    }
    regions: {
      numberSelected: number,
      summaryContent: string,
      changeLink: string
    }
    estimatedAnnualCost: {
      value: string
      changeLink: string
    }
  }
}

export type ProcurementIndexParams = {
  searches: Array<ProcurementSearchRowItems>
  advancedProcurements: Array<ProcurementAdvancedRowItems>
}

export type ProcurementShowParams = {
  procurement: Procurement,
  state: string,
  pageDescription?: ProcurementShowPageDescription
}

export type ProcurementEditParams = {
  procurement: Procurement,
  step: string,
  pageDescription?: ProcurementEditPageDescription
}

export type ProcurementCreateParams = ErrorParams & ProcurementNewParams
export type ProcurementShowPostParams = ErrorParams & ProcurementShowParams
export type ProcurementUpdateParams = ErrorParams & ProcurementEditParams