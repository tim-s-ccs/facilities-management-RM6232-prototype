export interface SupplierLotDataInterface {
  data: SupplierLotDataData
}

export type SupplierLotDataData = {
  id: number
  supplier_id: number
  lot_number: string,
  service_codes: string[]
  region_codes: string[]
}
