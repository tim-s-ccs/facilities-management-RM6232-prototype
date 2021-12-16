export type AccordionItem = {
  heading: {
    text: string
  },
  content: {
    html: string
  }
}

export type AccordionParent = {
  code: string
  name: string
}

export type AccordionChild = AccordionParent & {
  idCode: string
  description?: string
}