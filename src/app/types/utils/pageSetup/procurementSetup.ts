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
  additionalDetails?: {[key: string]: any}
}

export type ProcurementEditPageDescription = ProcurementShowPageDescription

export type ContractDetailsTable = {
  text: string
  link: string
  status: string
  hasError: boolean
}

export type OptionalCallOffPeriodData = {
  rowVisible: boolean
  removeButtonVisible: boolean
  extensionAttribute: string
  extensionRequiredAttribute: string
  extensionYearsAttribute: string
  extensionMonthsAttribute: string
}
