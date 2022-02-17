export interface AddressInterface {
  data: AddressData
  fullAddress(): string
}

export type AddressData = {
  id: string
  addressLine1: string
  addressLine2?: string
  city: string
  county?: string
  postcode: string
}

export type AddressAttributes = {
  addressLine1: string
  addressLine2?: string
  city: string
  county?: string
  postcode: string
}