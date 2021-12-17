import buildingTypes from './static/buildingTypes'
import primaryRegions from './static/primaryRegions'
import secondaryRegions from './static/secondaryRegions'
import securityClearances from './static/securityClearances'
import services from './static/services'
import supplierLotData from './static/supplierLotData'
import suppliers from './static/supplier'
import ukAddresses from './static/ukAddresses'
import ukRegions from './static/ukRegions'
import workPackages from './static/workPackages'
import { StaticTables } from '../types/data/staticTables'

const staticData: StaticTables = {
  buildingTypes: buildingTypes,
  securityClearances: securityClearances,
  ukAddresses: ukAddresses,
  ukRegions: ukRegions,
  workPackages: workPackages,
  services: services,
  primaryRegions: primaryRegions,
  secondaryRegions: secondaryRegions,
  suppliers: suppliers,
  supplierLotData: supplierLotData
}

export default staticData