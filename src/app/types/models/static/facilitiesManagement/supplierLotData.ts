export interface SupplierLotDataInterface {
  data: SupplierLotDataData
}

export type SupplierLotDataData = {
  id: number
  supplier_id: number
  lot_code: string,
  service_codes: string[]
  region_codes: string[]
}
