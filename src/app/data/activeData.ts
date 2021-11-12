import addresses from './active/addresses'
import buildings from './active/buildings'
import buyerDetails from './active/buyerDetails'
import regions from './active/regions'
import { ActiveTables } from '../types/data/activeTables'

const activeData: ActiveTables = {
  addresses: addresses,
  buildings: buildings,
  buyerDetails: buyerDetails,
  regions: regions
}

export default activeData