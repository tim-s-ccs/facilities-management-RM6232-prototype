import ActiveCollection from '../../../../../framework/models/active/activeCollection'
import Building from './model'
import { Condition } from '../../../../../framework/types/models/collection'
import { Tables } from '../../../../types/models/tables'

class Buildings extends ActiveCollection {
  collection: Array<Building> = this.collection as Array<Building>

  constructor(tables: Tables, conditions?: Array<Condition>) {
    super(tables.buildings, tables, Building, conditions)
  }
}

export default Buildings