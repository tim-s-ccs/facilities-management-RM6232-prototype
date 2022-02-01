import formatDateTime from '../formatDateTime'
import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import SuppliersSelector from '../../services/suppliersSelector'
import { ProcurementAdvancedRowItems, ProcurementSearchRowItems } from '../../types/utils/pageSetup/procurementSetup'
import { ProcurementIndexParams, ProcurementNewParams } from '../../types/routes/facilitiesManagement/procurements'
import { Request } from 'express'
import { urlFormatter } from './quickViewSetup'
import { utils } from 'ccs-prototype-kit-model-interface'

const SEARCH_STATES = ['search', 'entering_requirements']
const ADVANCED_PROCUREMENT_STATES = ['final_results']

const stateToDisplayName = (state: string): string => {
  switch(state) {
  case 'search':
    return 'Search'
  case 'entering_requirements':
    return 'Entering requirements'
  default:
    return 'Search'
  }
}

const procurementSearchRows = (procurements: Array<Procurement>): Array<ProcurementSearchRowItems> => {
  return procurements.map((procurement): ProcurementSearchRowItems => {
    return [
      {
        html: `<a class="govuk-link" href="/facilities-management/RM6232/procurements/${procurement.data.id}">${procurement.data.contractName}</a>`
      },
      {
        text: formatDateTime(new Date(procurement.data.updatedAt as string))
      },
      {
        text: stateToDisplayName(procurement.data.state as string)
      },
      {
        html: `<a class="govuk-link govuk-link--no-visited-state" href="/facilities-management/RM3830/procurements/${procurement.data.id}/delete">`
      }
    ]
  })
}

const procurementAdvancedRows = (procurements: Array<Procurement>): Array<ProcurementAdvancedRowItems> => {
  return procurements.map((procurement): ProcurementAdvancedRowItems => {
    return [
      {
        html: `<a class="govuk-link" href="/facilities-management/RM6232/procurements/${procurement.data.id}">${procurement.data.contractName}</a>`
      },
      {
        text: procurement.data.referenceNumber as string
      },
      {
        text: formatDateTime(new Date(procurement.data.updatedAt as string))
      }
    ]
  })
}

const getProcurementIndexParams = (req: Request): ProcurementIndexParams => {
  const searches: Procurement[] = Procurement.where(req, [{attribute: 'state', values: SEARCH_STATES}])
  const advancedProcurements: Procurement[] = Procurement.where(req, [{attribute: 'state', values: ADVANCED_PROCUREMENT_STATES}])

  return {
    searches: procurementSearchRows(searches),
    advancedProcurements: procurementAdvancedRows(advancedProcurements)
  }
}

const summaryContent = (items: string[], changeLink: string): string => {
  return `
    <ul class="govuk-list govuk-list--bullet">
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <a href="${changeLink}" class="govuk-link--no-visited-state">
      Change
    </a>
  `
}

const getProcurementNewParams = (procurement: Procurement): ProcurementNewParams => {
  const serviceCodes: string[] = procurement.data.serviceCodes
  const regionCodes: string[] = procurement.data.regionCodes
  const estimatedAnnualCost: number = procurement.data.estimatedAnnualCost as number

  const suppliersSelector = new SuppliersSelector(serviceCodes, regionCodes, estimatedAnnualCost)

  return {
    procurement: procurement,
    backLink: urlFormatter('/facilities-management/RM6232/quick-view/annual-contract-value', procurement),
    lotNumber: suppliersSelector.lotNumber,
    selectedSuppliersNames: suppliersSelector.selectedSuppliers.map(supplier => supplier.data.supplier_name).sort(),
    summaries: {
      services: {
        title: `${utils.pluralise('Service', serviceCodes.length)} (${serviceCodes.length})`,
        summaryContent: summaryContent(
          procurement.services().map(service => service.data.name),
          urlFormatter('/facilities-management/RM6232/quick-view/choose-services', procurement)
        )
      },
      regions: {
        title: `${utils.pluralise('Region', regionCodes.length)} (${regionCodes.length})`,
        summaryContent: summaryContent(
          procurement.regions().map(region => region.data.name),
          urlFormatter('/facilities-management/RM6232/quick-view/choose-regions', procurement)
        )
      },
      estimatedAnnualCost: {
        value: utils.numberToCurrency('£', procurement.data.estimatedAnnualCost as number),
        changeLink: urlFormatter('/facilities-management/RM6232/quick-view/annual-contract-value', procurement)
      }
    }
  }
}

export { getProcurementNewParams, getProcurementIndexParams }