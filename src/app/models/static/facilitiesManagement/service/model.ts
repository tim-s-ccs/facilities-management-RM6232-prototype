import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { ServiceData, ServiceInterface } from '../../../../types/models/static/facilitiesManagement/service'

class Service extends StaticModel implements ServiceInterface {
  static tableName: string = 'services'
  data: ServiceData = this.data as ServiceData

  hyphenateCode = () => this.data.code.replace('.', '-')

  static find = (id: number): Service => {
    return new this(this._find(this.tableName, id))
  }

  static all = (): Array<Service> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<Service> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }
}

export default Service