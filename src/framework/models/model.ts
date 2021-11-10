import ModelNotFoundError from '../errors/modelNotFoundError'
import { ModelData, ModelInterface } from '../types/models/model'

abstract class Model implements ModelInterface {
  abstract data: ModelData

  protected static _find = (id: number, table: Array<ModelData>, tableName: string): ModelData => {
    const modelData = table.find((row: ModelData) => row.id === id)

    if (modelData === undefined) {
      throw new ModelNotFoundError(id, tableName)
    } else {
      return modelData
    }
  }
}

export default Model