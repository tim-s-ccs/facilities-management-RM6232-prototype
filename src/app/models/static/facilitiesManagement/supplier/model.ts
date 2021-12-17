import SupplierLotData from '../supplierLotData/model'
import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { SupplierData, SupplierInterface } from '../../../../types/models/static/facilitiesManagement/supplier'

class Supplier extends StaticModel implements SupplierInterface {
  static tableName: string = 'suppliers'
  data: SupplierData = this.data as SupplierData

  lotData = (): SupplierLotData[] => {
    return SupplierLotData.where([{attribute: 'supplier_id', value: this.data.id}])
  }

  static find = (id: number): Supplier => {
    return new this(this._find(this.tableName, id))
  }

  static all = (): Array<Supplier> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<Supplier> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }

  static selectSuppliers = (lotNumber: string, serviceCodes: string[], regionCodes: string[]): Array<Supplier> => {
    const selectedSupplierIDs: number[] = SupplierLotData.where([
      {attribute: 'lot_number', value: lotNumber},
      {attribute: 'service_codes', contents: serviceCodes},
      {attribute: 'region_codes', contents: regionCodes}
    ]).map(supplierLotData => supplierLotData.data.supplier_id)

    return this.where([{attribute: 'id', values: selectedSupplierIDs}])
  }
}

export default Supplier