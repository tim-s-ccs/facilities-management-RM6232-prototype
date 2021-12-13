import SecondaryRegion from '../../../../models/static/facilitiesManagement/secondaryRegion/model'

export interface PrimaryRegionInterface {
  data: PrimaryRegionData
  secondaryRegions: () => Array<SecondaryRegion>
}

export type PrimaryRegionData = {
  code: string
  name: string
}
