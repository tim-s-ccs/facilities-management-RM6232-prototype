import Model from '../../models/model'

export interface CollectionInterface {
  collection: Array<Model>
  find(id: string): Model
}
