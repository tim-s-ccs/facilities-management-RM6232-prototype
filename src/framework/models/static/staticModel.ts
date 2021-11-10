import Model from '../model'
import { ModelData, StaticModelInterface } from '../../types/models/model'

abstract class StaticModel extends Model implements StaticModelInterface {
  protected _record: ModelData

  constructor(id: number, table: Array<ModelData>, tableName: string) {
    super()

    this._record = StaticModel._find(id, table, tableName) as ModelData
  }
}

export default StaticModel