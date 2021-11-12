import buildingTypes from './static/buildingTypes'
import securityClearances from './static/securityClearances'
import ukAddresses from './static/ukAddresses'
import ukRegions from './static/ukRegions'
import { StaticTables } from '../types/data/staticTables'


const staticData: StaticTables = {
  buildingTypes: buildingTypes,
  securityClearances: securityClearances,
  ukAddresses: ukAddresses,
  ukRegions: ukRegions
}

export default staticData