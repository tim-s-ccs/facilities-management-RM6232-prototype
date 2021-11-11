import Model from '../../models/model'

export interface CollectionInterface {
  collection: Array<Model>
  find(id: number): Model
}

export type Condition = {
  attribute: string
  value: any
}
