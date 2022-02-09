import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import SuppliersSelector from '../../services/suppliersSelector'
import { ContractDetailsTable, ProcurementAdvancedRowItems, ProcurementSearchRowItems, ProcurementShowPageDescription } from '../../types/utils/pageSetup/procurementSetup'
import { ProcurementIndexParams, ProcurementNewParams } from '../../types/routes/facilitiesManagement/procurements'
import { Request } from 'express'
import { urlFormatter } from './quickViewSetup'
import { utils } from 'ccs-prototype-kit-model-interface'

const SEARCH_STATES = ['completed_search', 'entering_requirements']
const ADVANCED_PROCUREMENT_STATES = ['final_results']

const getProcurement = (req: Request): Procurement => {
  return Procurement.find(req, Number(req.params['id']))
}

const stateToDisplayName = (state: string): string => {
  switch(state) {
  case 'completed_search':
    return 'Completed search'
  case 'entering_requirements':
    return 'Entering requirements'
  default:
    return 'Completed search'
  }
}

const procurementSearchRows = (procurements: Array<Procurement>): Array<ProcurementSearchRowItems> => {
  return procurements.map((procurement): ProcurementSearchRowItems => {
    return [
      {
        html: `<a class="govuk-link" href="/facilities-management/RM6232/procurements/${procurement.data.id}">${procurement.data.contractName}</a>`
      },
      {
        text: utils.formatDate(new Date(procurement.data.updatedAt as string), true)
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
        text: utils.formatDate(new Date(procurement.data.updatedAt as string), true)
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

const summaryContent = (items: string[]): string => {
  return `
    <ul class="govuk-list govuk-list--bullet">
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
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
        numberSelected: serviceCodes.length,
        summaryContent: summaryContent(procurement.services().map(service => service.data.name)),
        changeLink: urlFormatter('/facilities-management/RM6232/quick-view/choose-services', procurement)
      },
      regions: {
        numberSelected: regionCodes.length,
        summaryContent: summaryContent(procurement.regions().map(region => region.data.name)),
        changeLink: urlFormatter('/facilities-management/RM6232/quick-view/choose-regions', procurement)
      },
      estimatedAnnualCost: {
        value: utils.numberToCurrency('£', procurement.data.estimatedAnnualCost as number),
        changeLink: urlFormatter('/facilities-management/RM6232/quick-view/annual-contract-value', procurement)
      }
    }
  }
}

const getContractDetailsSection = (procurement: Procurement): Array<ContractDetailsTable> => {
  return [
    {
      text: 'Contract name',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/contract-name`,
      status: 'completed',
      hasError: false
    },
    {
      text: 'Annual contract value',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/annual-contract-value`,
      status: 'completed',
      hasError: false
    },
    {
      text: 'TUPE',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/tupe`,
      status: 'not started',
      // status: procurement.data.tupe === undefined ? 'not started' : 'completed',
      hasError: false
    },
    {
      text: 'Contract period',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/contract-period`,
      status: 'not started',
      // status: procurement.data.tupe === undefined ? 'not started' : 'completed',
      hasError: false
    }
  ]
}

const getBuildingDetailsSection = (procurement: Procurement): Array<ContractDetailsTable> => {
  return [
    {
      text: 'Services',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/services`,
      status: 'completed',
      hasError: false
    },
    {
      text: 'Buildings',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/buildings`,
      status: 'not started',
      hasError: false
    },
    {
      text: 'Assigning services to buildings',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/assigning-services-to-buildings`,
      status: 'cannot start',
      // status: procurement.data.tupe === undefined ? 'not started' : 'completed',
      hasError: false
    }
  ]
}

const showPageDescription = (procurement: Procurement, state: string): ProcurementShowPageDescription | undefined=> {
  switch (state) {
  case 'completed_search':
    return {
      pageTitle: 'What happens next?'
    }
  case 'entering_requirements':
    return {
      pageTitle: 'Further service and contract requirements',
      additionalDetails:{
        contractDetailsSection: getContractDetailsSection(procurement),
        buildingDetailsSection: getBuildingDetailsSection(procurement)
      }
    }
  }
}

export { getProcurementNewParams, getProcurementIndexParams, getProcurement, showPageDescription }