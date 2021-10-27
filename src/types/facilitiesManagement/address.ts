export interface AddressInterface {
  fullAddress(): string
}

export type AddressData = {
  addressLine1: string
  addressLine2?: string
  city: string
  county?: string
  postcode: string
}
