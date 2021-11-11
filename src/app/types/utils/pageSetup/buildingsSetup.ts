export type BuildingRowItems = [
  {html: string},
  {text: string},
  {text: string},
  {html: string}
]

export type RadioItem = {
  value: number
  text: string
  hint: {
    text: string
  }
  checked: boolean
}

export type BuildingPageDescription = {
  pageTitle: string
  stepNumber: number
  save_and_continue: boolean
  save_and_return: boolean
  previousStep: {
    text: string
    href: string
  }
  nextStep?: {
    text: string
    href: string
  }
  additionalDetails?: {[key: string]: any}
}