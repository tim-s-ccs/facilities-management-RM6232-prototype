import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import SuppliersSelector from '../../services/suppliersSelector'
import { chooseServicesAccordionItems } from './quickViewAccordionSetup'
import { ContractDetailsTable, OptionalCallOffPeriodData, ProcurementAdvancedRowItems, ProcurementEditPageDescription, ProcurementSearchRowItems, ProcurementShowPageDescription } from '../../types/utils/pageSetup/procurementSetup'
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
      pageTitle: 'What happens next?',
      saveAndContinue: true
    }
  case 'entering_requirements':
    return {
      pageTitle: 'Further service and contract requirements',
      saveAndContinue: true,
      additionalDetails:{
        contractDetailsSection: getContractDetailsSection(procurement),
        buildingDetailsSection: getBuildingDetailsSection(procurement)
      }
    }
  case 'final_results':
    return {
      pageTitle: 'Further Competition',
      saveAndContinue: false
    }
  }
}

const getContractName = (req: Request): string => {
  return getProcurement(req).data.contractName as string
}

const isThereInitialCallOffPeriodError = (procurement: Procurement): boolean => {
  return procurement.errors.initialCallOffPeriodYears !== undefined || procurement.errors.initialCallOffPeriodMonths !== undefined || procurement.errors.initialCallOffPeriod !== undefined
}

const isThereTotalContractPeriodError = (procurement: Procurement): boolean => {
  return procurement.errors.base !== undefined && procurement.errors.base.error === 'totalContractPeriod'
}

const initialCallOffStartDateValues = (procurement: Procurement): string[] => {
  if (procurement.data.initialCallOffPeriodStartDate === undefined || (procurement.errors.initialCallOffPeriodStartDate !== undefined && procurement.errors.initialCallOffPeriodStartDate.error === 'invalidDate')) {
    return ['', '', '']
  } else {
    return procurement.data.initialCallOffPeriodStartDate.split('-')
  }
}

const optionalCallOffPeriodData = (procurement: Procurement): {[key: number]: OptionalCallOffPeriodData} => {
  const data: {[key: number]: any} = {}

  const indices: number[] = [0, 1, 2, 3]

  indices.forEach(index => {
    data[index] = {
      extensionAttribute: `extensionPeriod${index}`,
      extensionRequiredAttribute: `extensionPeriodRequired${index}`,
      extensionYearsAttribute: `extensionPeriodYears${index}`,
      extensionMonthsAttribute: `extensionPeriodMonths${index}`
    }

    data[index]['rowVisible'] = isCallOffExtensionVisible(procurement, index)
    data[index]['removeButtonVisible'] =  data[index]['rowVisible'] && !isCallOffExtensionVisible(procurement, index + 1)
  })

  return data
}

const isCallOffExtensionVisible = (procurement: Procurement, extension: number): boolean => {
  if (!procurement.callOffExtensionRequired(extension)) return false

  return procurement.callOffExtensionYears(extension) !== undefined ||
         procurement.callOffExtensionMonths(extension) !== undefined ||
         procurement.callOffExtensionError(extension)

}

const isExtensionPeriodError = (procurement: Procurement): boolean => {
  const extensions: number[] = [0, 1, 2, 3]

  return extensions.some(extension => procurement.callOffExtensionError(extension))
}

const editPageDescription = (procurement: Procurement, step: string): ProcurementEditPageDescription | undefined=> {
  switch (step) {
  case 'contract-name':
    return {
      pageTitle: 'Contract name'
    }
  case 'annual-contract-value':
    return {
      pageTitle: 'Annual contract value'
    }
  case 'services':
    return {
      pageTitle: 'Services',
      additionalDetails: {
        accordionItems: chooseServicesAccordionItems(procurement)
      }
    }
  case 'tupe':
    return {
      pageTitle: 'TUPE'
    }
  case 'contract-period':
    return {
      pageTitle: 'Contract period',
      additionalDetails: {
        initialCallOffPeriodError: isThereInitialCallOffPeriodError(procurement),
        totalContractLengthError: isThereTotalContractPeriodError(procurement),
        initialCallOffStartDateValues: initialCallOffStartDateValues(procurement),
        optionalCallOffPeriodData: optionalCallOffPeriodData(procurement),
        extensionPeriodsError: isExtensionPeriodError(procurement)
      }
    }
  }
}


export { getProcurementNewParams, getProcurementIndexParams, getProcurement, showPageDescription, getContractName, editPageDescription }