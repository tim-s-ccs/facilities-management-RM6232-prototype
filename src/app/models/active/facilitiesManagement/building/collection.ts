import ActiveCollection from '../../../../../framework/models/active/activeCollection'
import Building from './model'
import { Condition } from '../../../../../framework/types/models/collection'
import { Tables } from '../../../../types/models/tables'

class Buildings extends ActiveCollection {
  collection: Array<Building>

  constructor(tables: Tables, conditions?: Array<Condition>) {
    super(tables.buildings, tables, Building, conditions)

    this.collection = this._collection as Array<Building>
  }
}

export default Buildings