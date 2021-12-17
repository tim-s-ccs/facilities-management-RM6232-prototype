import Service from '../models/static/facilitiesManagement/service/model'
import Supplier from '../models/static/facilitiesManagement/supplier/model'
import { SuppliersSelectorInterface } from '../types/services/suppliersSelector'

class SuppliersSelector implements SuppliersSelectorInterface {
  lotNumber: string
  selectedSuppliers: Supplier[]

  constructor(serviceCodes: string[], regionCodes: string[], annualContractValue: number) {
    this.lotNumber = Service.findLotNumber(serviceCodes, annualContractValue)
    this.selectedSuppliers = Supplier.selectSuppliers(this.lotNumber, serviceCodes, regionCodes)
  }
}

export default SuppliersSelector