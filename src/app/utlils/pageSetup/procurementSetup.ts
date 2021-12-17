import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import SuppliersSelector from '../../services/suppliersSelector'
import { ProcurementNewParams } from '../../types/routes/facilitiesManagement/procurements'
import { urlFormatter } from './quickViewSetup'
import { utils } from 'ccs-prototype-kit-model-interface'

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

export { getProcurementNewParams }