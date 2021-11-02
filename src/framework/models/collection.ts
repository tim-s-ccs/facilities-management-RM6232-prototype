import { CollectionInterface } from '../types/models/collection'
import Model from './model'

abstract class Collection implements CollectionInterface {
  abstract collection: Array<Model>

  find = (id: string): Model => {
    return this.collection.find((record: Model) => record.data.id === id) as Model
  }}

export default Collection