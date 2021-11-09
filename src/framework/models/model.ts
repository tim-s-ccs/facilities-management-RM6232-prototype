import { ModelInterface, ModelData } from '../types/models/model'

abstract class Model implements ModelInterface {
  abstract data: ModelData
}

export default Model