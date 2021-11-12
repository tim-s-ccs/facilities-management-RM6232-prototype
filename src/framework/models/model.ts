import { ModelData, ModelInterface } from '../types/models/model'

abstract class Model implements ModelInterface {
  abstract data: ModelData

  protected static _find = (id: number, table: Array<ModelData>): ModelData | undefined => {
    const modelData = table.find((row: ModelData) => row.id === id)

    return modelData
  }
}

export default Model