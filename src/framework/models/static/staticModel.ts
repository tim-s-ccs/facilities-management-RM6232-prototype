import Model from '../model'
import { ModelData, StaticModelInterface } from '../../types/models/model'

abstract class StaticModel extends Model implements StaticModelInterface {
  data: ModelData

  constructor(id: number, table: Array<ModelData>) {
    super()

    this.data = StaticModel._find(id, table) as ModelData
  }
}

export default StaticModel