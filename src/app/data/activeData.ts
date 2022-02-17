import addresses from './active/addresses'
import buildings from './active/buildings'
import buyerDetails from './active/buyerDetails'
import procurementBuildings from './active/procurementBuildings'
import procurements from './active/procurements'
import regions from './active/regions'
import { ActiveTables } from '../types/data/activeTables'

const activeData: ActiveTables = {
  addresses: addresses,
  buildings: buildings,
  buyerDetails: buyerDetails,
  regions: regions,
  procurements: procurements,
  procurementBuildings: procurementBuildings
}

export default activeData