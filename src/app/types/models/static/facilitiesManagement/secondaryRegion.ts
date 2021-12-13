export interface SecondaryRegionInterface {
  data: SecondaryRegionData
}

export type SecondaryRegionData = {
  code: string
  name: string
  primary_region_code: string
}
