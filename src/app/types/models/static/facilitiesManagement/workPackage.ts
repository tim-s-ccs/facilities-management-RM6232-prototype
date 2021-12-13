import Service from '../../../../models/static/facilitiesManagement/service/model'

export interface WorkPackageInterface {
  data: WorkPackageData
  services: () => Array<Service>
}

export type WorkPackageData = {
  code: string
  name: string
  selectable: boolean
}
