import Collection from '../collection'
import Model from '../model'
import { ModelData } from '../../types/models/model'

class ActiveCollection extends Collection {
  collection: Array<Model>

  constructor(data: Array<ModelData>, model: any) {
    super()

    this.collection = data.map((record: {[key: string]: any}) => new model(record))
  }
}

export default ActiveCollection