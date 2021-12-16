import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { chooseRegionsAccordionItems, chooseServicesAccordionItems } from './quickViewAccordionSetup'
import { QuickViewPageDescription } from '../../types/utils/pageSetup/quickViewSetup'


const arrayToParams = (attribute: string, codes: string[]): string => {
  return codes.map(code => `${attribute}[]=${code}`).join('&')
}

const urlFormatter = (baseURL: string, procurement: Procurement): string => {
  const query: string[] = []

  if (procurement.data.serviceCodes.length !== 0) {
    query.push(arrayToParams('serviceCodes',procurement.data.serviceCodes))
  }

  if (procurement.data.regionCodes.length !== 0) {
    query.push(arrayToParams('regionCodes',procurement.data.regionCodes))
  }

  if (procurement.data.estimatedAnnualCost !== undefined) {
    query.push(`estimatedAnnualCost=${procurement.data.estimatedAnnualCost}`)
  }

  if (query.length > 0) {
    return `${baseURL}?${query.join('&')}`

  } else {
    return baseURL
  }
}

const nextStep = (currentStep: string): string => {
  switch(currentStep) {
  case 'choose-services':
    return '/facilities-management/RM6232/quick-view/choose-regions'
  case 'choose-regions':
    return '/facilities-management/RM6232/quick-view/annual-contract-value'
  default:
    return '/facilities-management/RM6232/procurements/new'
  }
}

const pageDescription = (procurement: Procurement, step: string): QuickViewPageDescription | undefined => {
  switch (step) {
  case 'choose-services':
    return {
      pageTitle: 'Services',
      backText: 'Return to your account',
      backLink: '/facilities-management/RM6232',
      accordionItems: chooseServicesAccordionItems(procurement)
    }
  case 'choose-regions':
    return {
      pageTitle: 'Regions',
      backText: 'Return to services',
      backLink: urlFormatter('/facilities-management/RM6232/quick-view/choose-services', procurement),
      accordionItems: chooseRegionsAccordionItems(procurement)
    }
  case 'annual-contract-value':
    return {
      pageTitle: 'What is your estimate for the annual contract value?',
      backText: 'Return to regions',
      backLink: urlFormatter('/facilities-management/RM6232/quick-view/choose-regions', procurement)
    }
  }
}

export { urlFormatter, nextStep, pageDescription }