import Collection from '../collection'
import StaticModel from './staticModel'
import { ModelData } from '../../types/models/model'

abstract class StaticCollection extends Collection {
  protected _records: Array<StaticModel>

  constructor(source: Array<ModelData>, staticModel: any) {
    super()

    this._records = source.map((staticRecord: ModelData) => new staticModel(staticRecord.id, source))
  }
}

export default StaticCollection