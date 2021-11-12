import Collection from '../collection'
import StaticModel from './staticModel'
import { ModelData } from '../../types/models/model'

abstract class StaticCollection extends Collection {
  collection: Array<StaticModel>

  constructor(source: Array<ModelData>, staticModel: any) {
    super()

    this.collection = source.map((staticRecord: ModelData) => new staticModel(staticRecord.id, source))
  }
}

export default StaticCollection