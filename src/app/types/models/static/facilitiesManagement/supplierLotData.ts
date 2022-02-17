export interface SupplierLotDataInterface {
  data: SupplierLotDataData
}

export type SupplierLotDataData = {
  id: string
  supplier_id: string
  lot_code: string,
  service_codes: string[]
  region_codes: string[]
}
