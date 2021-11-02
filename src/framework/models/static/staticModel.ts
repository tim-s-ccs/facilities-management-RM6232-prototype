import Model from '../model'
import { ModelData, StaticModelInterface } from '../../types/models/model'

abstract class StaticModel extends Model implements StaticModelInterface {
  protected _record: ModelData

  constructor(id: string, source: Array<ModelData>) {
    super()

    this._record = source.find((record: ModelData) => record.id === id) as ModelData
  }
}

export default StaticModel