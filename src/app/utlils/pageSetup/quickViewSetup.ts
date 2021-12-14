import PrimaryRegion from '../../models/static/facilitiesManagement/primaryRegion/model'
import SecondaryRegion from '../../models/static/facilitiesManagement/secondaryRegion/model'
import Service from '../../models/static/facilitiesManagement/service/model'
import WorkPackage from '../../models/static/facilitiesManagement/workPackage/model'
import { AccordionItem } from '../../types/utils/pageSetup/quickViewSetup'
import { ServiceData } from '../../types/models/static/facilitiesManagement/service'

const serviceTypes: string[] = ['Total', 'Hard', 'Soft']

const getAvailableLots = (service: Service): string => {
  const availableLots: string[] = []
  serviceTypes.forEach(serviceType => {
    const key: string = serviceType.toLowerCase()

    if (service.data[key as keyof ServiceData]) {
      availableLots.push(`
        <div class="govuk-grid-column-one-third">
          <p class="govuk-body"><strong class="govuk-tag govuk-tag--grey">${serviceType} FM</strong></p>
        </div>
      `)
    }
  })

  return `<div class="govuk-grid-row">${availableLots.join('')}</div>`
}

const getServiceAccordionItem = (workPackage: WorkPackage, service: Service): string => {
  return `
    <div class="govuk-form-group chooser-input" sectionname="${workPackage.data.name}" section="${workPackage.data.code}">
      <div aria-describedby="service_${service.hyphenateCode()}">
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input type="checkbox" name="service_codes[]" id="service_${service.hyphenateCode()}" value="${service.data.code}" title="${service.data.name}" class="govuk-checkboxes__input" sectionid="${workPackage.data.code}">
            <label style="padding-top:0" class="govuk-label govuk-checkboxes__label" for="service_${service.hyphenateCode()}">
              ${service.data.name}
              <br>
              <span class="govuk-hint">
                ${service.data.description}
              </span>
              <div>
                Availiable lots:
                ${getAvailableLots(service)}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  `
}

const getServiceAccordionItems = (workPackage: WorkPackage): string => {
  const services: Service[] = workPackage.services()
  const serviceCheckboxes: string = services.map(service => getServiceAccordionItem(workPackage, service)).join('')

  let selectAll: string = ''

  if (services.length > 1 && workPackage.data.code !== 'P') {
    selectAll = `
    <p>or</p>
    <div class="govuk-checkboxes">
      <div class="govuk-checkboxes__item">
        <input title="Select all code-${workPackage.data.code} services" style="margin-top:4px" class="govuk-checkboxes__input" id="${workPackage.data.code}_all" name="section-checkbox_select_all" forserviceid="${workPackage.data.code}" type="checkbox" value="${workPackage.data.code}">
        <label class="govuk-label govuk-checkboxes__label" for="${workPackage.data.code}_all">
          Select all
        </label>
      </div>
    </div>
    `
  }

  return serviceCheckboxes + selectAll
}

const getRegionAccordionItem = (primaryRegion: PrimaryRegion, secondaryRegion: SecondaryRegion): string => {
  return `
    <div class="govuk-form-group chooser-input" sectionname="${primaryRegion.data.name}" section="${primaryRegion.data.code}">
      <div aria-describedby="region_${secondaryRegion.data.code}">
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input type="checkbox" name="region_codes[]" id="region_${secondaryRegion.data.code}" value="${secondaryRegion.data.code}" title="${secondaryRegion.data.name}" class="govuk-checkboxes__input" sectionid="${primaryRegion.data.code}">
            <label style="padding-top:0" class="govuk-label govuk-checkboxes__label" for="region_${secondaryRegion.data.code}">
              ${secondaryRegion.data.name}
            </label>
          </div>
        </div>
      </div>
    </div>
  `
}


const getRegionsAccordionItems = (primaryRegion: PrimaryRegion): string => {
  const secondaryRegions: SecondaryRegion[] = primaryRegion.secondaryRegions()
  const secondaryRegionsCheckboxes: string = secondaryRegions.map(secondaryRegion => getRegionAccordionItem(primaryRegion, secondaryRegion)).join('')

  const selectAll: string = `
    <p>or</p>
    <div class="govuk-checkboxes">
      <div class="govuk-checkboxes__item">
        <input title="Select all code-${primaryRegion.data.code} regions" style="margin-top:4px" class="govuk-checkboxes__input" id="${primaryRegion.data.code}_all" name="section-checkbox_select_all" forregionid="${primaryRegion.data.code}" type="checkbox" value="${primaryRegion.data.code}">
        <label class="govuk-label govuk-checkboxes__label" for="${primaryRegion.data.code}_all">
          Select all
        </label>
      </div>
    </div>
  `
  return secondaryRegionsCheckboxes + selectAll
}

const chooseServicesAccordionItems = (): Array<AccordionItem> => {
  const workPackages = WorkPackage.selectable()

  return workPackages.map(workPackage => {
    return {
      heading: {
        text: workPackage.data.name
      },
      content: {
        html: getServiceAccordionItems(workPackage)
      }
    }
  })
}

const chooseRegionsAccordionItems = (): Array<AccordionItem> => {
  const primaryRegions = PrimaryRegion.all()

  return primaryRegions.map(primaryRegion => {
    return {
      heading: {
        text: primaryRegion.data.name
      },
      content: {
        html: getRegionsAccordionItems(primaryRegion)
      }
    }
  })
}

export { chooseServicesAccordionItems, chooseRegionsAccordionItems }
