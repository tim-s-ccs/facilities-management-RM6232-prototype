import Building from '../../../models/active/facilitiesManagement/building/model'
import { BuildingPageDescription, BuildingRowItems } from '../../utils/pageSetup/buildingsSetup'
import { ErrorParams } from '../formParams'

export type BuildingsIndexParams = {
  buldingRows: Array<BuildingRowItems>
}

export type BuildingsShowParams = {
  building: Building
}

export type BuildingsNewParams = {
  building: Building
}

export type BuildingsEditParams = {
  building: Building
  step: string,
  pageDescription?: BuildingPageDescription
}

export type BuildingsUpdateParams = ErrorParams & BuildingsEditParams