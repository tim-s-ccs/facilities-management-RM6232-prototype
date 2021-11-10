import Model from './model'
import { CollectionInterface } from '../types/models/collection'

abstract class Collection implements CollectionInterface {
  abstract collection: Array<Model>

  find = (id: number): Model => {
    return this.collection.find((record: Model) => record.data.id === id) as Model
  }
}

export default Collection