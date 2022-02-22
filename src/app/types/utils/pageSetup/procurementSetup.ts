export type ProcurementSearchRowItems = [
  {html: string},
  {text: string},
  {text: string},
  {html: string}
]

export type ProcurementAdvancedRowItems = [
  {html: string},
  {text: string},
  {text: string}
]

export type ProcurementShowPageDescription = {
  pageTitle: string
  saveAndContinue: boolean
  additionalDetails?: {[key: string]: any}
}

export type ProcurementEditPageDescription = {
  pageTitle: string
  additionalDetails?: {[key: string]: any}
}

export type ProcurementSummaryPageDescription = {
  pageTitle: string
  additionalDetails?: {[key: string]: any}
}

export type ContractDetailsTable = {
  text: string
  link: string
  status: string
  hasError: boolean
}

export type LinkAndStatus = {
  link: string
  status: string
}

export type OptionalCallOffPeriodData = {
  rowVisible: boolean
  removeButtonVisible: boolean
  extensionAttribute: string
  extensionRequiredAttribute: string
  extensionYearsAttribute: string
  extensionMonthsAttribute: string
}

export type BuildingsTableRowItem = {
  html: string,
  classes: string
}

export type BuildingsTableRow = [
  BuildingsTableRowItem,
  BuildingsTableRowItem,
  BuildingsTableRowItem
]

export type ContractPeriodTableRow = Array<{
  text: string
  classes?: string
}>

export type BuildingsSummaryTableRow = Array<{
  text: string,
  classes: string
}>

export type BuildingsWithServicesTableRow = [
  {
    html: string,
    classes: string
  },
  {
    html: string,
    classes: string
  }
]
