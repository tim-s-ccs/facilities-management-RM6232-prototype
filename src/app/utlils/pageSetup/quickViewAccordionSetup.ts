import PrimaryRegion from '../../models/static/facilitiesManagement/primaryRegion/model'
import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import SecondaryRegion from '../../models/static/facilitiesManagement/secondaryRegion/model'
import Service from '../../models/static/facilitiesManagement/service/model'
import WorkPackage from '../../models/static/facilitiesManagement/workPackage/model'
import { AccordionChild, AccordionItem, AccordionParent } from '../../types/utils/pageSetup/quickViewAccordionSetup'

const getAccordionItem = (attribute: string, parent: AccordionParent, child: AccordionChild, checked: boolean): string => {
  let description: string = ''

  if (child.description !== undefined) {
    description = `
      <br>
      <span class="govuk-hint">
        ${child.description}
      </span>
    `
  }

  return `
    <div class="govuk-form-group chooser-input" sectionname="${parent.name}" section="${parent.code}">
      <div aria-describedby="${attribute}_${child.idCode}">
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input type="checkbox" name="procurement[${attribute}Codes][]" id="${attribute}_${child.idCode}" value="${child.code}" title="${child.name}" class="govuk-checkboxes__input" sectionid="${parent.code}" ${checked ? 'checked' : ''}>
            <label style="padding-top:0" class="govuk-label govuk-checkboxes__label" for="${attribute}_${child.idCode}">
              ${child.name}
              ${description}
            </label>
          </div>
        </div>
      </div>
    </div>
  `
}

const getSelectAll = (attribute: string, code: string): string => {
  return `
    <p>or</p>
    <div class="govuk-checkboxes">
      <div class="govuk-checkboxes__item">
        <input title="Select all code-${code} ${attribute}s" style="margin-top:4px" class="govuk-checkboxes__input" id="${code}_all" name="section-checkbox_select_all" for${attribute}id="${code}" type="checkbox" value="${code}">
        <label class="govuk-label govuk-checkboxes__label" for="${code}_all">
          Select all
        </label>
      </div>
    </div>
  `
}

const getServiceAccordionItems = (workPackage: WorkPackage, selectedServices: string[]): string => {
  const services: Service[] = workPackage.services()
  const parent: AccordionParent = {code: workPackage.data.code, name: workPackage.data.name}

  const serviceCheckboxes: string = services.map(service => getAccordionItem(
    'service',
    parent,
    {
      idCode: service.hyphenateCode(),
      code: service.data.code,
      name: service.data.name,
      description: service.data.description
    },
    selectedServices.includes(service.data.code)
  )).join('')

  let selectAll: string = ''

  if (services.length > 1 && workPackage.data.code !== 'Q') {
    selectAll = getSelectAll('service', workPackage.data.code)
  }

  return serviceCheckboxes + selectAll
}


const getRegionsAccordionItems = (primaryRegion: PrimaryRegion, selectedRegions: string[]): string => {
  const secondaryRegions: SecondaryRegion[] = primaryRegion.secondaryRegions()
  const parent: AccordionParent = {code: primaryRegion.data.code, name: primaryRegion.data.name}

  const secondaryRegionsCheckboxes: string = secondaryRegions.map(secondaryRegion => getAccordionItem(
    'region',
    parent,
    {
      idCode: secondaryRegion.data.code,
      code: secondaryRegion.data.code,
      name: secondaryRegion.data.name
    },
    selectedRegions.includes(secondaryRegion.data.code))
  ).join('')

  const selectAll: string = getSelectAll('region', primaryRegion.data.code)

  return secondaryRegionsCheckboxes + selectAll
}

const chooseServicesAccordionItems = (procurement: Procurement): Array<AccordionItem> => {
  const workPackages = WorkPackage.selectable()
  const selectedServices = procurement.data.serviceCodes

  return workPackages.map(workPackage => {
    return {
      heading: {
        text: workPackage.data.name
      },
      content: {
        html: getServiceAccordionItems(workPackage, selectedServices)
      }
    }
  })
}

const chooseRegionsAccordionItems = (procurement: Procurement): Array<AccordionItem> => {
  const primaryRegions = PrimaryRegion.all()
  const selectedRegions = procurement.data.regionCodes

  return primaryRegions.map(primaryRegion => {
    return {
      heading: {
        text: primaryRegion.data.name
      },
      content: {
        html: getRegionsAccordionItems(primaryRegion, selectedRegions)
      }
    }
  })
}

export { chooseServicesAccordionItems, chooseRegionsAccordionItems }
