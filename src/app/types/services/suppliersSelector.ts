import Supplier from '../../models/static/facilitiesManagement/supplier/model'

export interface SuppliersSelectorInterface {
  lotNumber: string
  selectedSuppliers: Supplier[]
}