import Building from '../../../models/active/facilitiesManagement/building/model'
import { BuildingPageDescription, BuildingRowItems } from '../../utils/pageSetup/buildingsSetup'
import { ErrorParams } from '../formParams'

export type BuildingsIndexParams = {
  buldingRows: Array<BuildingRowItems>
}

export type BuildingsShowParams = {
  building: Building
  return_url: string
  edit_url: string
}

export type BuildingsNewParams = {
  building: Building,
  form_url: string,
  pageDescription?: BuildingPageDescription
}

export type BuildingsEditParams = {
  building: Building
  step: string,
  form_url: string,
  pageDescription?: BuildingPageDescription
}

export type BuildingsCreateParams = ErrorParams & BuildingsNewParams
export type BuildingsUpdateParams = ErrorParams & BuildingsEditParams