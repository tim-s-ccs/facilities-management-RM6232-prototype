import { ModelSchema } from 'ccs-prototype-kit-model-interface'

const regionModelSchema: ModelSchema = {
  id: {constructor: Number},
  name: {constructor: String},
  code: {constructor: String}
}

export default regionModelSchema