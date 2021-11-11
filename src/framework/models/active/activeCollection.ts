import ActiveModel from './activeModel'
import Collection from '../collection'
import { Condition } from '../../types/models/collection'
import { ModelData } from '../../types/models/model'
import { Tables } from '../../types/models/tables'

abstract class ActiveCollection extends Collection {
  abstract collection: Array<ActiveModel>
  protected _collection: Array<ActiveModel>

  constructor(rows: Array<ModelData>, tables: Tables, model: any, conditions?: Array<Condition>) {
    super()

    let collection: Array<ActiveModel> = rows.map(record => new model(record, tables))

    if (conditions !== undefined) {
      conditions.forEach(condition => {
        collection = collection.filter(record => record.data[condition.attribute] === condition.value)
      })
    }

    this._collection = collection
  }
}

export default ActiveCollection