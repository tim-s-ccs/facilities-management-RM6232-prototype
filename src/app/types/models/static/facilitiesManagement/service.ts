export interface ServiceInterface {
  data: ServiceData
  hyphenateCode: () => string
}

export type ServiceData = {
  code: string
  name: string
  description: string
  work_package_code: string
  total: boolean
  hard: boolean
  soft: boolean
  sort_order: number
}
