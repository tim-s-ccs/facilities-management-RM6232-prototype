import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { SupplierLotDataData, SupplierLotDataInterface } from '../../../../types/models/static/facilitiesManagement/supplierLotData'

class SupplierLotData extends StaticModel implements SupplierLotDataInterface {
  static tableName: string = 'supplierLotData'
  static primaryKey: string = 'id'

  data: SupplierLotDataData = this.data as SupplierLotDataData

  static find = (id: string): SupplierLotData => {
    return new this(this._find(this.tableName, this.primaryKey, id))
  }

  static all = (): Array<SupplierLotData> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<SupplierLotData> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }
}

export default SupplierLotData