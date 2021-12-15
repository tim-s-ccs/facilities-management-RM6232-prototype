import { AccordionItem } from './quickViewAccordionSetup'

export type QuickViewPageDescription = {
  pageTitle: string
  backText: string
  backLink: string
  accordionItems?: Array<AccordionItem>
}
