import SupplierLotData from '../../../../models/static/facilitiesManagement/supplierLotData/model'

export interface SupplierInterface {
  data: SupplierData
  lotData: () => SupplierLotData[]
}

export type SupplierData = {
  id: string
  supplier_name: string
  contact_name: string
  contact_email: string
  contact_phone: string
  sme: boolean,
  duns: string,
  registration_number: string,
  address_line_1: string,
  address_line_2: string,
  address_town: string,
  address_county: string,
  address_postcode: string,
  active: boolean
}
