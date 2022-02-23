import Address from '../../models/active/facilitiesManagement/address/model'
import Building from '../../models/active/facilitiesManagement/building/model'
import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import SuppliersSelector from '../../services/suppliersSelector'
import { BuildingsSummaryTableRow, BuildingsTableRow, BuildingsTableRowItem, BuildingsWithServicesTableRow, ContractDetailsTable, ContractPeriodTableRow, LinkAndStatus, OptionalCallOffPeriodData, ProcurementAdvancedRowItems, ProcurementEditPageDescription, ProcurementSearchRowItems, ProcurementShowPageDescription, ProcurementSummaryPageDescription } from '../../types/utils/pageSetup/procurementSetup'
import { chooseServicesAccordionItems } from './quickViewAccordionSetup'
import { Period, utils } from 'ccs-prototype-kit-model-interface'
import { ProcurementIndexParams, ProcurementNewParams } from '../../types/routes/facilitiesManagement/procurements'
import { Request } from 'express'
import { urlFormatter } from './quickViewSetup'

const SEARCH_STATES = ['completed_search', 'entering_requirements']
const ADVANCED_PROCUREMENT_STATES = ['final_results']

const getProcurement = (req: Request): Procurement => {
  return Procurement.find(req, req.params['id'])
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

const getContractRequirementsLinkAndStatus = (procurement: Procurement, step: string): LinkAndStatus  => {
  const status: string = procurement.status(step)

  return {
    link: status === 'completed' ? `/facilities-management/RM6232/procurements/${procurement.data.id}/summary/${step}` : `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/${step}`,
    status: status
  }
}

const getContractDetailsSection = (procurement: Procurement): Array<ContractDetailsTable> => {
  return [
    {
      step: 'contract-name',
      text: 'Contract name',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/contract-name`,
      status: 'completed',
      hasError: false
    },
    {
      step: 'annual-contract-value',
      text: 'Annual contract value',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/annual-contract-value`,
      status: 'completed',
      hasError: false
    },
    {
      step: 'tupe',
      text: 'TUPE',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/tupe`,
      status: procurement.status('tupe'),
      hasError: procurement.errors.tupe !== undefined
    },
    {
      step: 'contract-period',
      text: 'Contract period',
      hasError: procurement.errors['contract-period'] !== undefined,
      ...getContractRequirementsLinkAndStatus(procurement, 'contract-period')
    }
  ]
}

const getBuildingDetailsSection = (procurement: Procurement): Array<ContractDetailsTable> => {
  return [
    {
      step: 'services',
      text: 'Services',
      hasError: false,
      ...getContractRequirementsLinkAndStatus(procurement, 'services')
    },
    {
      step: 'buildings',
      text: 'Buildings',
      hasError: procurement.errors['buildings'] !== undefined,
      ...getContractRequirementsLinkAndStatus(procurement, 'buildings')
    },
    {
      step: 'assigning-services-to-buildings',
      text: 'Assigning services to buildings',
      link: `/facilities-management/RM6232/procurements/${procurement.data.id}/summary/assigning-services-to-buildings`,
      status: procurement.status('assigning-services-to-buildings'),
      hasError: procurement.errors['assigning-services-to-buildings'] !== undefined,
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

const getBuilingSelection = (procurement: Procurement, req: Request): BuildingsTableRow[] => {
  const buildings: Building[] = Building.all(req)
  const buildingIDs = procurement.activeProcurementBuildings().map(procurementBuilding => procurementBuilding.data.buildingID)

  const rows = buildings.map(building => {
    const row: BuildingsTableRowItem[] = []

    if (building.data.buildingComplete) {
      row.push({
        html: `
          <div class="govuk-checkboxes govuk-checkboxes--small">
            <div class="govuk-checkboxes__item">
              <input
                class="govuk-checkboxes__input"
                title="${building.data.name}"
                type="checkbox"
                value="${building.data.id}"
                name="procurement[procurementBuildings][]"
                id="procurementBuildings${building.data.id}Active"
                ${buildingIDs?.includes(building.data.id) ? 'checked' : '' }
              >
              <label class="govuk-label govuk-checkboxes__label govuk-!-padding-top-0" for="procurementBuildings${building.data.id}Active">
                ${procurementBuildingCheckboxText(building)}
              </label>
            </div>
          </div>
        `,
        classes: 'govuk-!-padding-right-2'
      })
    } else {
      row.push({
        html: `
          <div class="govuk-!-padding-left-7">
          ${procurementBuildingCheckboxText(building)}
          </div>
        `,
        classes: 'govuk-!-padding-right-2'
      })
    }

    row.push({
      html:  building.data.buildingComplete ? '<strong class="govuk-tag">completed</strong>' : '<strong class="govuk-tag govuk-tag--red">incomplete</strong>',
      classes: 'govuk-!-padding-right-2'
    })

    row.push({
      html: `
        <a class="govuk-link govuk-link--no-visited-state" href="http://localhost:3000/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/${building.data.id}">
          Details
        </a>
      `,
      classes: 'govuk-!-padding-right-2'
    })

    return row as BuildingsTableRow
  })

  return rows
}

const procurementBuildingCheckboxText = (building: Building): string => {
  return `
    <span class="govuk-fieldset__legend">
      ${building.data.name}
    </span>
    <span class="govuk-hint govuk-!-margin-bottom-0">
      ${(building.data.address as Address).fullAddress()}
    </span>
  `
}

const PAGES_WITH_SUMMARY = [
  'contract-period',
  'services',
  'buildings'
]

const pageHasSummary = (step: string): boolean => {
  return PAGES_WITH_SUMMARY.includes(step)
}

const editPageDescription = (req: Request, procurement: Procurement, step: string): ProcurementEditPageDescription | undefined => {
  switch (step) {
  case 'contract-name':
    return {
      pageTitle: 'Contract name'
    }
  case 'annual-contract-value':
    return {
      pageTitle: 'Annual contract value'
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
  case 'services':
    return {
      pageTitle: 'Services',
      additionalDetails: {
        accordionItems: chooseServicesAccordionItems(procurement)
      }
    }
  case 'buildings':
    return {
      pageTitle: 'Buildings',
      additionalDetails: {
        buildingRows: getBuilingSelection(procurement, req)
      }
    }
  }
}

const formatDatePeriod = (startDate: Date, endDate: Date): string => {
  return `${utils.formatDate(startDate)} to ${utils.formatDate(endDate)}`
}

const createContractPeriodRow = (rowHeading: string, period: Period & {weeks?: number}, startDate: Date, endDate: Date): ContractPeriodTableRow[] => {
  return [
    [
      {
        text: rowHeading,
        classes: 'ccs-border-bottom_none'
      },
      {
        text: period.weeks !== undefined ? `${period.weeks} ${utils.pluralise('week', period.weeks)}` : utils.periodToString(period.years as number, period.months as number),
        classes: 'ccs-border-bottom_none'
      }
    ],
    [
      {
        text: ''
      },
      {
        text: formatDatePeriod(startDate, endDate)
      }
    ]
  ]
}

const getContractPeriodRows = (procurement: Procurement): ContractPeriodTableRow[] => {
  const rows: ContractPeriodTableRow[] = []

  rows.push(...createContractPeriodRow(
    'Initial call-off period',
    {
      years: procurement.data.initialCallOffPeriodYears,
      months: procurement.data.initialCallOffPeriodMonths
    },
    procurement.initialCallOffPeriodStartDate(),
    procurement.initialCallOffPeriodEndDate()
  ))

  if (procurement.data.mobilisationPeriodRequired) {
    rows.push(...createContractPeriodRow(
      'Mobilisation period',
      {
        weeks: procurement.data.mobilisationPeriod
      },
      procurement.mobilisationStartDate(),
      procurement.mobilisationEndDate()
    ))
  } else {
    rows.push([
      {
        text: 'Mobilisation period'
      },
      {
        text: 'None'
      }
    ])
  }

  if (procurement.data.optionalCallOffRequired) {
    const extensionPeriods = [...Array(4).keys()]

    extensionPeriods.forEach(extensionPeriod => {
      if (procurement.callOffExtensionRequired(extensionPeriod)) {
        rows.push(...createContractPeriodRow(
          `Optional call-off extension period ${extensionPeriod + 1}`,
          {
            years: procurement.callOffExtensionYears(extensionPeriod),
            months: procurement.callOffExtensionMonths(extensionPeriod)
          },
          procurement.extensionPeriodStartDate(extensionPeriod),
          procurement.extensionPeriodEndDate(extensionPeriod)
        ))
      }
    })
  } else {
    rows.push([
      {
        text: 'Optional call-off extensions'
      },
      {
        text: 'None'
      }
    ])
  }

  return rows
}

const getActiveProcurementBuildingRows = (procurement: Procurement): BuildingsSummaryTableRow[] => {
  return procurement.activeProcurementBuildings().reduce((rows: BuildingsSummaryTableRow[], procurementBuilding) => {
    const building: Building = procurementBuilding.building()

    rows.push(
      [
        {
          text: building.data.name as string,
          classes: 'govuk-table__header ccs-border-bottom_none govuk-!-padding-bottom-0'
        }
      ],
      [
        {
          text: building.data.address?.fullAddress() as string,
          classes: 'govuk-!-padding-top-0'
        },
      ]
    )

    return rows
  }, [])
}

const getbuildingsWithServices = (procurement: Procurement): BuildingsWithServicesTableRow[] => {
  return procurement.activeProcurementBuildings().reduce((rows: BuildingsWithServicesTableRow[], procurementBuilding) => {
    const building: Building = procurementBuilding.building()

    const buildingDetail: {html: string, classes: string} =  {
      html: `
      <a
        class="govuk-link--no-visited-state govuk-!-font-weight-bold"
        href="/facilities-management/RM6232/procurement-buildings/${procurementBuilding.data.id}/edit">
        ${building.data.name}
      </a>
      <br>
      ${building.data.address?.fullAddress()}
      `,
      classes: 'govuk-!-padding-right-2'
    }

    if (procurementBuilding.isCompleted()) {
      const services = procurementBuilding.services().map(service => `<li>${service.data.name}</li>`)

      rows.push(
        [
          buildingDetail,
          {
            html: `
            <details class="govuk-details" data-module="govuk-details">
              <summary class="govuk-details__summary">
                <span class="govuk-details__summary-text">
                  ${services.length} ${utils.pluralise('service', services.length)} selected
                </span>
              </summary>
              <div class="govuk-details__text">
                <ul class="govuk-list govuk-list--bullet">
                  ${services.join('')}
                </ul>
              </div>
            </details>
          `,
            classes: 'govuk-!-padding-right-2'
          }
        ]
      )
    } else {
      rows.push(
        [
          buildingDetail,
          {
            html: '<span class="govuk-hint"> No service selected </span>',
            classes: 'govuk-!-padding-right-2'
          }
        ]
      )
    }

    return rows
  }, [])
}

const summaryPageDescription = (procurement: Procurement, step: string): ProcurementSummaryPageDescription | undefined => {
  switch (step) {
  case 'contract-period':
    return {
      pageTitle: 'Contract period summary',
      additionalDetails: {
        contractPeriodRows: getContractPeriodRows(procurement)
      }
    }
  case 'services':
    return {
      pageTitle: 'Services summary',
      additionalDetails: {
        services: procurement.services().map(service => [{ text: service.data.name }])
      }
    }
  case 'buildings':
    return {
      pageTitle: 'Buildings summary',
      additionalDetails: {
        buildings: getActiveProcurementBuildingRows(procurement)
      }
    }
  case 'assigning-services-to-buildings':
    return {
      pageTitle: 'Assigning services to buildings summary',
      additionalDetails: {
        completed: procurement.activeProcurementBuildings().every(procurementBuilding => procurementBuilding.isCompleted()),
        buildingsWithServices: getbuildingsWithServices(procurement)
      }
    }
  }
}

export { getProcurementNewParams, getProcurementIndexParams, getProcurement, showPageDescription, getContractName, editPageDescription, pageHasSummary, summaryPageDescription }
